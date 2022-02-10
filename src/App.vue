<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { apiGetUserInfo } from '@/api/user'
import { ref } from 'vue'
const getUserInfo = async () => {
  const res = await apiGetUserInfo(1);
  console.log(res);
}
const src = ref('/images/logo.png');
</script>

<template>
  <img alt="Vue logo" :src="src" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="getUserInfo">获取</button>
  <van-button type="success" size="normal">成功按钮</van-button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
