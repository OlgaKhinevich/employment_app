<template>
    <div class="app">
        <template>
            <Menu v-if="isMenuVisible"/>
            <router-view></router-view>
        </template>
        
    </div>
</template>

<script>
import Auth from './Auth/Auth.vue';
import Profile from './Profile/Profile.vue';
import EditProfile from './EditProfile/EditProfile.vue';
import Menu from "./Menu/Menu.vue";
import Search from "./Search/Search.vue";
import Applications from "./Applications/Applications.vue";
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "../store.js";
import AddVacancy from './AddVacancy/AddVacancy.vue';
import Students from './Students/Students.vue';
import Vacancy from './Vacancy/Vacancy.vue';
import MyVacancies from './MyVacancies/MyVacancies.vue';
import MyApplications from './MyApplications/MyApplications.vue';
import Vacancies from './Vacancies/Vacancies.vue';
import Statistics from './Statistics/Statistics.vue';
import Employers from './Employers/Employers.vue';

Vue.use(VueRouter);
const routes = [
    {path:"/", component: Auth},
    {path: '/profile', component: Profile},
    {path: '/edit', component: EditProfile},
    {path: '/search', component: Search},
    {path: '/applications', component: Applications},
    {path: '/addvacancy', component: AddVacancy},
    {path: '/students', component: Students},
    {path: '/vacancy', component: Vacancy},
    {path: '/students', component: Students},
    {path: '/companyvacancies', component: MyVacancies},
    {path: '/companyapplications', component: MyApplications},
    {path: '/vacancies', component: Vacancies},
    {path: '/employers', component: Employers},
    {path: '/statistics', component: Statistics}
]
const router = new VueRouter({routes});

export default {
    data() {
      return {
      }  
    },
    components: { 
        Menu  
    },
    computed: {
        isMenuVisible(){
            return this.$store.state.isMenuVisible;
        }
    },
    router: router,
    store: store
}

</script>

<style lang="scss" scoped>
    .app {
        display: flex;
        width: 100vw;
        height: 100vh;
        flex-direction: row;
    }   
</style>
