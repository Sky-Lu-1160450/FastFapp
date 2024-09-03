<script setup lang="ts">

import TheTop from './components/TheTop.vue';
import SearchView from '@/views/search/SearchView.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue';
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync';
import { fetchHomePageData } from '@/api/home';
import type { IHomeInfo } from '@/types';
import OpLoadingView from '@/components/OpLoadingView.vue';

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

const {data, pending} = useAsync(fetchHomePageData,{} as IHomeInfo)

</script>


<template>
    <div class="home-page">
        <!-- This will show the value in the UI -->
        <Transition name="fade">
            <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
        </Transition>

        <TheTop :recomments="recomments" @searchClick="toggleSearchView"/>
        <OpLoadingView :loading="pending" type="skeleton">
            
            <div class="home-page__banner">
                <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
            </div>
            <TheTransformer :data="data.transformer" />
            <ScrollBar :data="data.scrollBarInfoList" />
        </OpLoadingView>

    
    
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