import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Camels from './views/Camels.vue'
import Activities from './views/Activities.vue'
import Reservation from './views/Reservations.vue'
import TicketPrice from './views/TicketPrices.vue'
import Tickets from './views/Tickets.vue'
import Entrance from './views/Entrance.vue'
import SingleTicket from './views/SingleTicket.vue'
import BundleTicket from './views/BundleTicket.vue'
import FullPackage from './views/FullPackage.vue'
import Book from './views/Book.vue'
import Activity from './views/ActivityViews/Activity.vue'
/* import Attraction from './views/ActivityViews/Attraction.vue' */
import Restaurant from './views/ActivityViews/Restaurant.vue'
import Game from './views/ActivityViews/Game.vue'
import Reserve from './views/Reserve.vue'
import Login from './components/Login.vue'
import GetReservation from './components/GetReservation.vue'
import Confirmation from './views/Confirmation.vue'
import Policies from './views/Policies.vue'
import { Api } from './Api'
Vue.use(Router)

function verifyUser(to, from, next) {
  if (!localStorage.accessToken) next()
  let authorization = {
    'Authorization': `Bearer ${localStorage.accessToken}` 
  }

  Api.get('auth/me', {headers: authorization})
    .then(res => {
      next({name: 'home'})
    })
    .catch(err => {
      localStorage.removeItem('accessToken');
      next()
    })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: verifyUser
    },
    {
      path: '/camels',
      name: 'camels',
      component: Camels
    },
    {
      path: '/ticketprices/book',
      name: 'book',
      component: Book,
      props: true
    },
    {
      path: '/ticketprices/entrance',
      name: 'entrance',
      component: Entrance
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities
    },
    {
      path: '/activities/:id',
      name: 'activity',
      component: Activity,
      props: true
    },
    {
      path: '/activities/attractions/:id',
      name: 'attractions',
      component: Activity,
      props: true
    },
    {
      path: '/activities/restaurants/:id',
      name: 'restaurants',
      component: Restaurant,
      props: true
    },
    {
      path: '/activities/games/:id',
      name: 'games',
      component: Game,
      props: true
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: Reservation
    },
    {
      path: '/reservations/reserve',
      name: 'reserve',
      component: Reserve
    },
    {
      path: '/reservations/reserve/getreservation',
      name: 'getreservation',
      component: GetReservation
    },
    {
      path: '/ticketprices/singleticket',
      name: 'singleticket',
      component: SingleTicket
    },
    {
      path: '/ticketprices/bundleticket',
      name: 'bundleticket',
      component: BundleTicket
    },
    {
      path: '/ticketprices/fullpackage',
      name: 'fullpackage',
      component: FullPackage
    },
    {
      path: '/ticketprices',
      name: 'ticketprices',
      component: TicketPrice
    },
    {
      path: '/confirmation/:id',
      name: 'confirmation',
      component: Confirmation,
      props: true
    },
    {
      path: '/ticketprices/tickets',
      name: 'tickets',
      component: Tickets
    },
    {
      path: '/home/policies',
      name: 'policies',
      component: Policies
    }
  ]
})
