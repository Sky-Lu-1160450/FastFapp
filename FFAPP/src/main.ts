import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Tabbar, TabbarItem , Search } from 'vant'

import App from './App.vue'
import router from './router'

import { Dialog } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)




app.use(createPinia())
app.use(router)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)



const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px'



app.use(Dialog)  // Register the Dialog component globally

app.mount('#app')