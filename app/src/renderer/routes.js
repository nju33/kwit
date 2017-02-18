export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/Main')
  },
  {
    path: '/login',
    name: 'login',
    component: require('components/Login')
  },
  {
    path: '*',
    redirect: '/'
  }
]
