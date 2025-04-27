import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/Views/HomeView.vue'
import JobsView from '@/Views/JobsView.vue'

const router =  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[{
        path:'/',
        name:'home',
        component: HomeView
    },{
        path: '/jobs',
        name: 'jobs',
        component: JobsView
    }]
})

export default router