<script setup lang="ts">
import TheTop from './components/TheTop.vue';


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
</script>


<template>
    <div class="home-page">
        <TheTop :recomments="recomments"/>

    </div>
    
</template>
<style>
.test{
    font-size: 39px;
}</style>