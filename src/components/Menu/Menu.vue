<template>
  <div class="menu">
      <ul :class="active_item">
          <img class="menu-logo" src="/dist/img/logo2.svg"/>
          <li class="profile" @click="make_active('profile')">Личный профиль</li>
          <li class="applications" @click="make_active('applications')">Заявки</li>
          <li class="search" @click="make_active('search')">Поиск</li>
          <li class="notifications" @click="make_active('notifications')">Уведомления</li>
          <li class="news" @click="make_active('news')">Новости</li>
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
            &.search li.search, &.notifications li.notifications, &.news li.news {
                background-color: #0C3B7A;
            }
        }  
    }
</style>