<script setup lang="ts">
    
    // import TabsView from './views/tabs/TabsView.vue';
    import { RouterView } from 'vue-router'

    import { fetchTest } from '@/api/test';
    fetchTest()

</script>

<template>
  <RouterView />
  
  
  <!-- <TabsView> </TabsView> -->
</template>

<style>
@import 'normalize.css';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing:grayscale;
  color: #2c3e50;
  font-size: 14px;
  


}



</style>
