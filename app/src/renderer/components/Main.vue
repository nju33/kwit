<template lang="html">
  <div class="box">
    <section class="tw-box" v-for="tweet in tweets">
      <aside class="tw-user">
        <img class="tw-user-img" :src="tweet.user.profile_image_url"/>
        <div class="tw-user-name">
          <div><span class="tw-user-oname" v-text="tweet.user.name"></span></div>
          <div><span class="tw-user-sname">
            @<span v-text="tweet.user.screen_name"></span>
          </span></div>
        </div>
        </aside>
      <div class="tw-txt" v-html="formatMessage(tweet.text)"></div>
    </section>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import Twitter from 'twitter'
// import debounce from 'lodash.debounce';
//
// function registerClickHandler() {
//   function handle(e) {
//     e.preventDefault();
//     console.log(e);
//     console.log(33);
//   }
//   return debounce(() => {
//       document.removeEventListener('click', handle, false);
//     }
//   }, 100);
// }
// let removeClickHandler = null;

export default {
  data() {
    return {
      tweets: []
    };
  },
  methods: {
    ...mapActions([
      'toggleTweetModal'
    ]),
    formatMessage(text) {
      // const formatted = text
      return text
        .replace(/\n/g, '<br/>')
        .replace(/(#[^\s><（  ）]+)/g, (name) => {
          return `<a class="hash-tag tweet-hash-tag" data-name="${name.slice(1)}">${name}</a>`;
        })
        .replace(/(@[^><（  ）]+)/g, (name) => {
          return `<a class="mention tweet-mention" data-name="${name.slice(1)}">${name}</a>`;
        })
        .replace(/(https?:\/\/[^><（  ）]+)/g, (url) => {
          return `<a class="uri tweet-uri">${url}</a>`;
        });

      // if (removeClickHandler !== null) {
      //   removeCLickHandler();
      //   console.log(9);
      // }
      // setTimeout(() => {
      //   console.log(23123);
      //   removeClickHandler = registerClickHandler();
      // }, 300);
      // console.log(33);
      //
      // return formatted;
    },
    tweet(status) {
      if (this.client) {
        this.client.post('statuses/update', {status}, (errs, tweet, res) => {
          if (errs) {
            errs.forEach(err => {
            });
            return;
          }
          this.toggleTweetModal();
        });
      }
    }
  },
  mounted() {
    const params = {count: 20};

    const {ipcRenderer} = this.$electron;
    ipcRenderer.send('db:get', 'setting');
    ipcRenderer.on('db:get:res', (e, data) => {
      if (!data) {
        this.$router.replace('/login');
      }

      this.client = new Twitter({
        consumer_key: data.consumerKey,
        consumer_secret: data.consumerSecret,
        access_token_key: data.accessTokenKey,
        access_token_secret: data.accessTokenSecret,
      });
      // this.client.get('account/settings', params, (errs, data) => {
      //   console.log(data);
      // });
      //
      //
      // var stream = this.client.stream('statuses/filter', {track: 'javascript'});
      // stream.on('data', function(event) {
      //   console.log(event && event.text);
      // });
      //
      // stream.on('error', function(error) {
      //   throw error;
      // });
      if (this.$data.tweets.length !== 0) {
        this.client
        return;
      }

      this.client.get('statuses/home_timeline', params, (errs, tweets, res) => {
        if (errs) {
          errs.forEach(err => {
            this.$parent.alert(err.message);

            if (err.code === 89) {
              this.$router.replace('/login');
            }
          })
          return;
        }

        this.$data.tweets = tweets;
      });
    });

  }
}
</script>

<style scoped lang="css">
  .box {
    padding-top: 3.5em;
  }

  .tw-box {
    display: flex;
    align-items: flex-start;
    margin: 1em .5em;
  }

  .tw-user {
    flex: 1 1 100%;
    max-width: 10em;
    display: flex;
    align-items: center;
  }

  .tw-user-img {
    height: 2em;
    margin-right: .5em;
  }

  .tw-user-name {
    line-height: 1;
  }

  .tw-user-oname {
    display: inline-block;
    vertical-align: center;
    width: 10em;
    font-size: .8em;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  }

  .tw-user-sname {
    opacity: .5;
    font-size: .8em;
    width: 10em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .tw-txt {
    flex: 1 1 100%;
    padding-left: 1em;
  }
</style>
