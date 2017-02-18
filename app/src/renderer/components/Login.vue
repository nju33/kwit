<template lang="html">
  <div class="position-center">
    <p class="message">The following information is mandatory and please input</p>
    <form class="form" @submit.prevent="handleSubmit($electron)">
    <!-- <form class="form" @submit.prevent> -->
      <div class="form-group">
        <label for="consumer_key" class="label">Consumer Key</label>
        <input id="consumer_key" ref="consumer_key" type="text" v-model="consumerKey" class="input consumer-key"/>
      </div>
      <div class="form-group">
        <label for="consumer_secret" class="label">Consumer Secret</label>
        <input id="consumer_secret" ref="consumer_secret" type="text" v-model="consumerSecret" class="input consumer-secret"/>
      </div>
      <div class="form-group">
        <label for="access_token_key" class="label">Access Token Key</label>
        <input id="access_token_key" ref="access_token_key" type="text" v-model="accessTokenKey" class="input access-token-key"/>
      </div>
      <div class="form-group">
        <label for="access_token_secret" class="label">Access Token Secret</label>
        <input id="access_token_secret" ref="access_token_secret" type="text" v-model="accessTokenSecret" class="input access-token-secret"/>
      </div>
      <div class="form-group">
        <button class="button" type="submit">Done</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      consumerKey: '',
      consumerSecret: '',
      accessTokenKey: '',
      accessTokenSecret: '' ,
    }
  },
  watch: {
    consumerKey(val) {
      val ?
      this.$refs.consumer_key.classList.add('valid') :
      this.$refs.consumer_key.classList.remove('valid') ;
    },
    consumerSecret(val) {
      val ?
      this.$refs.consumer_secret.classList.add('valid') :
      this.$refs.consumer_secret.classList.remove('valid') ;
    },
    accessTokenKey(val) {
      val ?
      this.$refs.access_token_key.classList.add('valid') :
      this.$refs.access_token_key.classList.remove('valid') ;
    },
    accessTokenSecret(val) {
      val ?
      this.$refs.access_token_secret.classList.add('valid') :
      this.$refs.access_token_secret.classList.remove('valid') ;
    }
  },
  computed: {
    loginValidate() {
      return this.$refs.consumer_key.value &&
             this.$refs.consumer_secret.value &&
             this.$refs.access_token_key.value &&
             this.$refs.access_token_secret.value;
    }
  },
  methods: {
    handleSubmit({ipcRenderer}) {
      if (this.loginValidate) {
        const items = [
          {
            field: 'setting.consumerKey',
            value: this.$refs.consumer_key.value
          },
          {
            field: 'setting.consumerSecret',
            value: this.$refs.consumer_secret.value
          },
          {
            field: 'setting.accessTokenKey',
            value: this.$refs.access_token_key.value
          },
          {
            field: 'setting.accessTokenSecret',
            value: this.$refs.access_token_secret.value
          }
        ]
        items.forEach(item => {
          ipcRenderer.send('db:set', item.field, item.value);
        });
        this.$router.replace('/');
      }
    }
  }
}
</script>

<style scoped lang="css">
  .message {
    text-align: center;
    color: #1da1f2;
    margin-bottom: 2em;
  }

  .form {}

  .form-group {
    margin-bottom: 1em;
  }

  .label {
    display: block;
    font-size: .8em;
    margin-bottom: .2em;
  }

  .input {
    transition: .2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    border: 1px solid transparent;
    padding: .3em .5em;
    box-sizing: border-box;
    outline: none;
    font-size: 1.1em;
    background: #222;
    border: 1px solid #000;
    color: inherit;
  }

  .input.valid {
    border: 1px solid #1da1f2;
  }

  .input:focus {
    border: 1px solid #1da1f2;
  }

  .input.consumer-key {
    width: 25em;
  }

  .input.consumer-secret {
    width: 30em;
  }

  .input.access-token-key {
    width: 40em;
  }

  .input.access-token-secret {
    width: 30em;
  }

</style>
