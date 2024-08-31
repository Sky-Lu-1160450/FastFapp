<script setup lang="ts">
import OpSearch from '@/components/OpSearch.vue';
import { fetchSearchData } from '@/api/search'
import { ref } from 'vue'
interface IEmits {
    (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()

const searchValue = ref('')
const onSearch = async (v?: string | number) => {
  console.log('====onSearch', v)
  const { list } = await fetchSearchData (v as string)
}

</script>



<template>
    <div class="search-view" >
        <OpSearch
        show-action
        v-model="searchValue"
        shape="round"
        placeholder="Please Enter Keyword Here"
        @search="onSearch"
        @cancel="emits('cancel')"
        ></OpSearch>

    </div>




</template>

<style lang ="scss" >
.search-view{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 999;

}


</style>