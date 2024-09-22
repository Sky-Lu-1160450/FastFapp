<script setup lang="ts">
import { ref } from 'vue'
import TheTop from './components/TheTop.vue';
import SearchView from '@/views/search/SearchView.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue';
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync';
import { fetchHomePageData } from '@/api/home';
import type { IHomeInfo } from '@/types';
import OpLoadingView from '@/components/OpLoadingView.vue';
import { PRIMARY_COLOR, TRANSPARENT } from '@/config'
import { HOME_TABS } from './config'

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

const tabBackgruondColor = ref(TRANSPARENT)
const onTabScroll = ({ isFixed }: { isFixed: boolean }) => {
  tabBackgruondColor.value = isFixed ? 'white' : TRANSPARENT
}

</script>


<template>
    <div class="home-page">
        <!-- This will show the value in the UI -->
        <Transition name="fade">
            <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
        </Transition>
        <div v-show="!isSearchViewShown">

            <TheTop :recomments="recomments" @searchClick="toggleSearchView"/>
            <OpLoadingView :loading="pending" type="skeleton">
                
                <div class="home-page__banner">
                    <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
                </div>
                <TheTransformer :data="data.transformer" />
                <ScrollBar :data="data.scrollBarInfoList" />
                <VanTabs
                    sticky
                    offset-top="54px"
                    :color="PRIMARY_COLOR"
                    :background="tabBackgruondColor"
                    @scroll="onTabScroll"
                >
                    <VanTab v-for="v in HOME_TABS" :key="v.value" :title="v.title">
                        <component :is="v.component"></component>
                    </VanTab>
                </VanTabs>
            </OpLoadingView>
        </div>
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