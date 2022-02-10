<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const { userName, nickName } = storeToRefs(store)

store.login('cxz', 'tcwd106.bb')

</script>

<template>
  <div>
    <p>userName：{{ userName }}</p>
    <p>isAdmin：{{ nickName }}</p>
  </div>
</template>