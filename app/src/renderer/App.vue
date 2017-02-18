<template>
  <div id="#app" :style="{'font-family': font.family}">
    <TitleBar></TitleBar>
    <Alert ref="alert"></Alert>
    <TweetModal></TweetModal>
    <router-view ref="router"></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  import TitleBar from './components/TitleBar';
  import Alert from './components/Alert';
  import TweetModal from './components/TweetModal';

  export default {
    components: {
      TitleBar,
      Alert,
      TweetModal
    },
    store,
    methods: {
      alert(message) {
        this.$refs.alert.show(message)
      },
      tweet(value) {
        this.$refs.router.tweet(value);
      }
    },
    data() {
      return {
        font: {
          family: [
            '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic",',
            'YuGothic, Verdana, Meiryo, sans-serif'
          ].join(' ')
        }
      }
    },
    mounted() {
      document.addEventListener('click', e => {
        const el = e.target;
        if (el.classList.contains('tweet-uri')) {
          this.$electron.remote.shell.openExternal(el.innerText);
        }
      }, false);
      // this.$router.replace('/login');
    }
  }
</script>

<style>
  @font-face {
    font-family: "Yu Gothic";
    src: local("Yu Gothic Medium");
    font-weight: normal;
  }
  @font-face {
    font-family: "Yu Gothic";
    src: local("Yu Gothic Bold");
    font-weight: bold;
  }

  body {
    margin: 0;
    height: 100vh;
    width: 100vw;
    background: #131313;
    position: relative;
    color: #ccc;
    font-size: 14px;
    line-height: 1.4;
  }

  a {
    transition: .2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    cursor: pointer;
    text-decoration: none;
    font-size: .9em;
  }

  a.mention {
    color: #0b76b8;
  }

  a.mention:hover {
    color: #1da1f2;
  }

  a.hash-tag {
    color: #0bb84c;
  }

  a.hash-tag:hover {
    color: #1df26e;
  }

  a.uri {
    color: #b8a40b;
  }

  a.uri:hover {
    color: #f2d91d;
  }

  .position-center {
    position: absolute;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
  }

  .button {
    background: #1da1f2;
    border: none;
    border-radius: 2px;
    padding: .5em .75em;
    font-size: 1em;
    color: #fff;
    cursor: pointer;
    outline: none;
  }
</style>
