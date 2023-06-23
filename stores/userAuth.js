
import { createPinia } from 'pinia'
// import { defineStore } from 'pinia'
export const pinia = createPinia();
export const userAuthStore = defineStore('auth', {
    state: () => ({
      userData: null,
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
        console.log('user', user)
        this.userData = user;
        this.isLoggedIn = Boolean(user);
      },
      login (user) {
        console.log('user', user)
        this.userData = user;
        this.isLoggedIn = true;
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