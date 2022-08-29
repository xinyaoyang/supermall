import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/home/Home";
import Category from "@/views/category/Category";
import Cart from "@/views/cart/Cart";
import Profile from "@/views/profile/Profile";

//1.安装插件
//2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new createRouter({
  routes,
  history: createWebHistory(),
})

export default router
