<script setup lang="ts">
import TheTop from './components/TheTop.vue';
import SearchView from '@/views/search/SearchView.vue'

import { useToggle } from '@/use/useToggle'


const recomments =[
    { 
        value:1,
        label:'Brisket',

    },
    {
        value:2,
        label:'Lamb',

    },
]
const [isSearchViewShown, toggleSearchView] = useToggle(false)
</script>


<template>
    <div class="home-page">
    <!-- This will show the value in the UI -->
    <Transition name="fade">
        <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>

    <TheTop :recomments="recomments" @searchClick="toggleSearchView"/>
    </div>

    
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>