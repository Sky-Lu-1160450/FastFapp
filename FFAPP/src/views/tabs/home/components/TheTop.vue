<script setup lang="ts">
import type { ISearchRecomment } from '@/types'
import OpSearch from '@/components/OpSearch.vue'
import type { ISuperCard } from '@/types'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { useAsync } from '@/use/useAsync'
import { useAuth } from '@/use/useAuth'
import { fetchMePageData, updateUserAddress } from '@/api/me' // Import the address update API
import OpLoadingView from '@/components/OpLoadingView.vue'

interface IProps {
    recomments: ISearchRecomment[]
}

defineProps<IProps>()

interface IEmits {
  (e: 'searchClick'): void
}

const emits = defineEmits<IEmits>()

const router = useRouter()
const { user, logout } = useAuth()
const { data, pending } = useAsync(fetchMePageData, {
  cards: [],
  superCard: {} as ISuperCard,
})

const gotoLogin = () => {
  router.push({ name: 'login' })
}
</script>

<template>
    <div class="user-login">
      <div v-if="user?.id" class="user-info">
        <div class="top-left">
            <img class="avatar" :src="user.avatar" alt="User Avatar" />
            <div class="name">{{ user.nickname }}</div>
        </div>
        <div class="account op-thin-border" @click="logout">Log out</div>
      </div>

      <!-- If not logged in, show login prompt -->
       <div v-else class="login-prompt">
        <div class="top-left">
            <img class="avatar" src="https://b.yzcdn.cn/vant/icon-demo-1126.png" alt="Default Avatar" />
            <div class="name" @click="gotoLogin">Visitor</div>
        </div>
        <div class="account op-thin-border" @click="gotoLogin">Log in</div>
      </div>
    </div> 
    <div class ="home-top">
        <div class ='top'>
            <img class = "location-icon" src = "@/assets/imgs/index_page/location.png">
            <div class = "location"> Wellington</div>
            <img class = "shopcart-icon" src = "@/assets/imgs/index_page/shopcart.png">
            <img class = "comments-icon" src = "@/assets/imgs/index_page/comments.png">
        </div>
        <!-- <VanSearch 
        shape="round" 
        background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
        placeholder="Enter your Favourite Food"
        >
            <template #right-icon>
                <div>Search</div>

            </template> 
        </VanSearch> -->
        <VanSticky>
            <OpSearch 
                
                
                shape="round" 
                background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
                placeholder="Enter your Favourite Food"
                @inputClick="emits('searchClick')"
            >
                <template #right-icon>
                    <div @click="emits('searchClick')">Search</div>

                </template>
            </OpSearch>
        </VanSticky>
        <div class="search-recommend">
            <div v-for="v in recomments " :key="v.value" class="tag">{{ v.label }}</div>
        </div>
    </div>
</template>

<style lang="scss">
.home-top {
    background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
    color: white;
    margin-top: 50px;

    .top {
        display: flex;
        align-items: center;
        padding: 10px 10px 0 10px;
        line-height: 15px;
        font-size: 15px;
        font-weight: bold;
        .location-icon {
            width: 20px;
            height: 20px;
        }
        .location {
            flex: 1;
        }
        .shopcart-icon {
            width: 24px;
            height: 24px;
        }
        .comments-icon {
            width: 28px;
            height: 24px;
            margin-left: 10px;
        }
    }
    .search-recommend{
        display: flex;
        padding: 0 10px 8px;
        .tag{
            font-size: 12px;
            border-radius: 10px;
            background: rgb(242, 242, 242, 0.3);
            padding:2px 8px;
            margin-right: 10px;
        } 
    }
    .van-field__right-icon {
    margin-right: 0;
  }
}

.user-login {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(244, 244, 244);
    padding: 0 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.user-info {
    display: flex;
    align-items: center;
}
.login-prompt {
    display: flex;
    justify-content: space-between;
}
.top-left {
    display: flex;
    padding-right: 195px;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
}
.name {
    flex: 1;
    font-size: 15px;
    text-align: left;
    align-items: center;
    margin-top: 5px;
}
.account {
    color: rgb(33, 179, 244);
    font-size: 12px;
    padding: 5px 10px;
    border: 1px solid rgb(33, 179, 244);
    border-radius: 20px;
    cursor: pointer;
    &:before {
    border-color: rgb(33, 179, 244);
    border-radius: 50px;
    }
}
</style>