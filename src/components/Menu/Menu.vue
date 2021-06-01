<template>
  <div class="menu">
      <ul :class="active_item">
        <img class="menu-logo" src="/dist/img/logo2.svg"/>
            <template v-if="user_role == 'student'">  
                <li class="profile" @click="make_active('profile')">Личный профиль</li>
                <li class="applications" @click="make_active('applications')">Заявки</li>
                <li class="search" @click="make_active('search')">Поиск</li>
            </template>
        
            <template v-if="user_role == 'admin'"> 
                <li class="students" @click="make_active('students')">Студенты</li>
                <li class="vacancies" @click="make_active('vacancies')">Вакансии</li>
                <li class="employers" @click="make_active('employers')">Работодатели</li>
                <li class="statistics" @click="make_active('statistics')">Статистика</li>
            </template>

            <template v-if="user_role == 'employer'">
                <li class="companyvacancies" @click="make_active('companyvacancies')">Мои вакансии</li>
                <li class="companyapplications" @click="make_active('companyapplications')">Заявки</li>      
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
            &.search li.search, &.students li.students,
            &.statistics li.statistics, &.vacancies li.vacancies, &.companyvacancies li.companyvacancies,
            &.companyapplications li.companyapplications, &.employers li.employers {
                background-color: #0C3B7A;
            }
        }  
    }
</style>