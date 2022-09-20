import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthView from "@/views/AuthView";
import RegisterUserView from "@/views/RegisterUserView";

import {useAuthStore} from "@/store/authStore";
import DefectView from "@/views/DefectView";
import DefectEditView from "@/views/DefectEditView";
import UsersView from "@/views/UsersView";
import RegisterDefectView from "@/views/RegisterDefectView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/users/new',
    name: 'Register',
    meta: {
      requiresAuth: true
    },
    component: RegisterUserView
  },
  {
    path: '/',
    name: 'Defect list',
    component: DefectView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/errors/new',
    name: 'Defect create',
    component: RegisterDefectView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/errors/:id',
    name: 'Defect edit',
    component: DefectEditView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users/',
    name: 'Users list',
    component: UsersView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users/new',
    name: 'Create user',
    component: UsersView,
    props: true,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

// Deny access to unauthorized users and redirect them to auth
// From official docs https://v3.router.vuejs.org/guide/advanced/meta.html
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const userStore = useAuthStore();
    if (!userStore.isAuthorized) {
      next({
        path: '/auth',
        query: { redirect: to.fullPath }
      });
    } else {
      next()
    }
  } else {
    next()
  }
});

// Subscribe to state changes to handle empty token
useAuthStore().$subscribe((
    mutation,
    state
) => {
    if (state.user.token.value == null)
        if (router.currentRoute.name !== 'Auth')
            router.push('/auth');
});

export default router
