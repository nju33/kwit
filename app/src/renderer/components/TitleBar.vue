<template>
  <div class="title-bar">
    <div class="title-bar-inner">
      <div class="icon-box">
        <span class="btn sync-button" :class="{active: show}" @click="toggleTweetModal">
          <Octicon name="sync" scale="1.5"></Octicon>
        </span>
        <span class="btn pencil-button" :class="{active: show}" @click="toggleTweetModal">
          <Octicon name="pencil" scale="1.5"></Octicon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import Octicon from 'vue-octicon/components/Octicon';
  import 'vue-octicon/icons/sync';
  import 'vue-octicon/icons/pencil';

  export default {
    components: {
      Octicon
    },
    computed: {
      ...mapState({
        show: s => s.tweetModal.show
      })
    },
    name: 'title-bar',
    methods: {
      ...mapActions([
        'toggleTweetModal'
      ])
    },
  }
</script>

<style scoped>
  .title-bar {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100vw;
    height: 4em;
    -webkit-user-select: none;
    -webkit-app-region: drag;
    background: #131313;
    padding-left: 80px;
    box-sizing: border-box;
  }

  .title-bar-inner {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 4em;
    background: #131313;
    display: flex;
    align-items: center;
  }

  .icon-box {
    margin: .5em auto 0;
  }

  .btn {
    display: inline-block;
    cursor: pointer;
    margin: 0 .5em;
  }

  .sync-button svg,
  .pencil-button svg {
    transition: .2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    transform: rotate(15deg);
  }

  .sync-button:hover svg,
  .sync-button.active svg,
  .pencil-button:hover svg,
  .pencil-button.active svg {
    fill: #1da1f2;
    transform: rotate(0deg);
  }
</style>
