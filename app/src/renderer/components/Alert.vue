<template lang="html">
  <transition name="alert" @after-enter="handleAfterEnter" @after-leave="handleAfterLeave">
    <div class="box hidden" :class="type" v-if="message" @click="close">
      <div class="message">
        <span class="alert"><Octicon name="alert" class="icon"></Octicon></span>
        <span v-text="message"></span>
      </div>
    </div>
  </transition>
</template>

<script>
import Octicon from 'vue-octicon/components/Octicon.vue';
import 'vue-octicon/icons/alert';

export default {
  components: {
    Octicon
  },
  data() {
    return {
      type: null,
      message: null,
      errCode: null,
      _tid: null,
    }
  },
  methods: {
    handleAfterEnter(el) {
      el.classList.add('visible');
      this.$data.tid = setTimeout(() => {
        this.hide();
        this.$data.tid = null;
      }, 15000);
    },
    handleAfterLeave(el) {
      el.classList.remove('visible');
    },
    show(message, type, errCode) {
      this.$data.message = message;
      // this.$data.type = type;
      // this.$data.errCode = errCode;
    },
    hide() {
      this.$data.message = null;
      // this.$data.type = null;
      // this.$data.errCode = null;
    },
    close() {
      if (this.$data.tid) {
        clearTimeout(this.$data.tid);
        this.$data.tid = null;
      }
      this.hide();
    }
  }
}
</script>

<style scoped lang="css">
  .box {
    display: flex;
    align-items: center;
    position: absolute;
    right: 50%;
    top: 6em;
    transform: translateX(50%);
    transition: .4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    opacity: 0;
  }

  .box.alert-enter-to {
    opacity: 1;
  }

  .box.visible {
    opacity: 1;
  }

  .box.visible.alert-leave-to {
    opacity: 0;
  }

  .alert {
    position: relative;
    top: 2.5px;
    margin-right: .3em;
  }

  .alert svg {
    fill: #d00c24;
  }

  .message {
    margin: 0 auto;
  }
</style>
