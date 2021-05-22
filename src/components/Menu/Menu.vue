<template>
  <div class="menu">
      <ul :class="active_item">
        <img class="menu-logo" src="/dist/img/logo2.svg"/>
            <template v-if="user_role == 'student'">  
                <li class="profile" @click="make_active('profile')">Личный профиль</li>
                <li class="applications" @click="make_active('applications')">Заявки</li>
                <li class="search" @click="make_active('search')">Поиск</li>
                <li class="notifications" @click="make_active('notifications')">Уведомления</li>
            </template>
        
            <template v-if="user_role == 'admin'"> 
                <li class="students" @click="make_active('students')">Студенты</li>
                <li class="vacancies" @click="make_active('vacancies')">Вакансии</li>
                <li class="statistics" @click="make_active('statistics')">Статистика</li>
            </template>

            <template v-if="user_role == 'employer'">
                <li class="employer_vacancies" @click="make_active('employer_vacancies')">Мои вакансии</li>
                <li class="employer_applications" @click="make_active('employer_applications')">Заявки</li>      
            </template>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            active_item: 'profile'
        }
    },
    computed:{
        user_role(){
            return this.$store.state.role;
        }
    },
    methods: {
       make_active(item_name) {
           this.active_item = item_name;
           this.$router.push(`/${item_name}`);
       }
   }
}
</script>

<style lang="scss" scoped>
    .menu {
        width: 20%;
        height: 100%;
        background-color: #224C84;
        
        ul {
            .menu-logo { 
                width: 80%;
                margin: 15% 0 25% 8%;
            }
            li {
                font-family: 'Montserrat', sans-serif;
                padding: 3% 0 3% 8%;
                margin-bottom: 4%;
                font-weight: 500;
                color:#ffffff;
                /*-ms-touch-action: ;&:hover {
                    background-color: #0C3B7A;
                }*/ 
            }
            &.profile li.profile, &.applications li.applications,
            &.search li.search, &.notifications li.notifications, &.students li.students,
            &.statistics li.statistics, &.vacancies li.vacancies, &.employer_vacancies li.employer_vacancies,
            &.employer_applications li.employer_applications {
                background-color: #0C3B7A;
            }
        }  
    }
</style>