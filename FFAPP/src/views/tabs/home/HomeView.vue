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
        <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
        <TheTop :recomments="recomments" @searchClick="toggleSearchView"/>

    </div>
    
</template>
<style>
.test{
    font-size: 39px;
}</style>