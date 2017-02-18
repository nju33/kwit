<template lang="html">
  <transition name="tm" @after-enter="handleAfterEnter" @afterLeave="handleAfterLeave">
    <div class="box" v-if="show">
      <form class="form" @submit.prevent="handleTweet">
        <textarea class="message" ref="message" v-bind="message"></textarea>
        <button class="button" @click="handleTweet">
          Tweet
          <span class="comment"><Octicon name="comment"></Octicon></span>
        </button>
      </form>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Octicon from 'vue-octicon/components/Octicon';
import 'vue-octicon/icons/comment';

export default {
  components: {
    Octicon
  },
  computed: {
    ...mapState({
      message: s => s.tweetModal.message,
      show: s => s.tweetModal.show
    })
  },
  methods: {
    handleAfterEnter(el) {
      el.classList.add('visible');
    },
    handleAfterLeave(el) {
      el.classList.remove('visible');
    },
    ...mapActions([
      'toggleTweetModal'
    ]),
    handleTweet() {
      const value = this.$refs.message.value;
      if (value) {
        this.$parent.tweet(value);
      }
    }
  },
  mounted() {
    console.log(this);
    console.log(this.$store);
  }
}
</script>

<style scoped lang="css">
.box {
  position: fixed;
  right: 50%;
  width: 50vw;
  min-width: 200px;
  max-width: 400px;
  top: 6em;
  transform: translateX(50%);
  transition: .4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  opacity: 0;
  padding: 1em;
  box-sizing: border-box;
  border-radius: 4px;
}

.box:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
  height: 100%;
  background: #1da1f2;
  -webkit-filter: blur(10px);
}

.box.tm-enter-to {
  opacity: 1;
}

.box.visible {
  opacity: 1;
}

.box.visible.tm-leave-to {
  opacity: 0;
}

.form {
  width: 100%;
  text-align: center;
}

.message {
  width: 100%;
  box-sizing: border-box;
  outline: none;
  height: 20vh;
  border: none;
  border-radius: 2px;
  font-size: .95em;
  line-height: 1.5;
  padding: .5em;
}

.button {
  background: transparent;
}

.comment {
  display: inline-block;
  transform: scale(.9);
  transform-origin: left bottom;
  transition: .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.button:hover .comment {
  transform: scale(1.1);
}
</style>
