
import { createPinia, defineStore } from 'pinia';
import Cookies from 'js-cookie';
// import { defineStore } from 'pinia'
export const pinia = createPinia();
export const userAuthStore = defineStore('auth', {
    state: () => ({
      userData: null,
      userId: null,
      isLoggedIn: false,
      authBy: null,
      currentComponent: null
    }),
    getters: {
      getLoginState: (state) => state.isLoggedIn,
      getCurrentComponent: (state) => state.currentComponent
    },
    actions: {
      setUser (user) {
        const { uid } = user;
        this.userData = user;
        this.isLoggedIn = Boolean(user);
        this.userId = uid;
        const halfHourInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + halfHourInMilliseconds);
        Cookies.remove('userId');
        Cookies.set('userId', uid, { expires: expirationDate });
      },
      setIsLogdedin () {
        if(Cookies.get('userId')) this.isLoggedIn = true;
      },
      login (user) {
        this.userData = user;
        this.isLoggedIn = true;
        this.setUser(user);
      },
      logout () {
        this.userData = null;
        this.isLoggedIn = false;
      },
      setCurrentComponent (component) {
        this.currentComponent = component;
      }
    },
  })

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userAuthStore, import.meta.hot))
  }