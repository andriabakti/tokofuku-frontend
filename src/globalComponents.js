import Vue from 'vue'

// Contoh membuat komponen jadi global tanpa import lagi
// atoms
Vue.component('g-button',
  () => import('./components/atoms/button.vue')
)
Vue.component('g-brand',
  () => import('./components/atoms/brand.vue')
)
Vue.component('g-notfound',
  () => import('./components/atoms/NotFoundMessage.vue')
)
Vue.component('g-dashboard',
  () => import('./components/molecules/CardDashboard.vue')
)
