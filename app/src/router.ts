import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./pages/Home.vue'),
    },
    {
      path: '/Discover',
      name: 'discover',
      component: () => import('./pages/Discover.vue'),
    },
    {
      path: '/settings',
      name: 'setttings',
      component: () => import('./pages/Settings.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // This app is configured with redirects defined here '@app/staticwebapp.config.json'
  // If the query string parameter 'path' is found, then vue router will redirect us to that page

  const redirectPath = to.query.path

  if (redirectPath === 'home') {
    console.log('redirected to:  ' + redirectPath)
    return next({ name: 'home' })
  }

  if (redirectPath === 'discover') {
    console.log('redirected to:  ' + redirectPath)
    return next({ name: 'discover' })
  }

  if (redirectPath === 'settings') {
    console.log('redirected to:  ' + redirectPath)
    return next({ name: 'settings' })
  }

  return next()
})

export default router
