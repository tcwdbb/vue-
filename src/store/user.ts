import { defineStore } from 'pinia'

import { apiLogin, apiGetUserInfo } from '@/api/user'

// useUserStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: '',
      nickName: ''
    }
  },
  getters: {
    isAdmin(state) {
      // return state.type === 0
    },
  },
  actions: {
    login(username: string, password: string) {
      apiLogin(username, password).then((res) => {
        console.log(res);
        sessionStorage.setItem('token', res.token );
        this.userInfo(1)
      })
    },
    userInfo(id: number | string) {
      apiGetUserInfo(id).then(res => {
        this.userName = res.data.user_name;
        this.nickName = res.data.user_nickname;
        console.log(res);
        
      })
    }
  },
})