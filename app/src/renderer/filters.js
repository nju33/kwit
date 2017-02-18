import Vue from 'vue';

Vue.filter('transformMessage', text => {
  console.log(text);
  return text;
});
