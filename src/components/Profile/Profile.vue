<template>
  <div class="profile">
    <h1>Личный профиль</h1>
    <div class="information">
        <div class="left-column">
          <img src="/dist/img/avatar.jpg" />
          <button @click="open_edit_page">Редактировать</button>
          <h4>Контакты</h4>
          <p>Email адрес:</p>
          <p>Телефон:</p>
          <h4>Портфолио</h4>
          <h4>Достижения</h4>
        </div>
        <div class="right-column">
          <h4>Личная информация</h4>
          <p>Фамилия:</p>
          <p>Имя:</p>
          <p>Отчество:</p>
          <p>Дата рождения:</p>
          <h4>Основное образование</h4>
          <h4>Дополнительное образование</h4>
          <h4>Опыт работы</h4>
          <h4>Профессиональные навыки</h4>
          <h4>Личные качества</h4>
          <h4>Дополнительно</h4>
          <p>Желаемая зарплата:</p>
          <p>Занятость:</p>
          <p>График работы:</p>
          <p>Готовность к командировкам:</p>
          <p>Готовность к переезду:</p>
        </div>  
    </div>   
  </div>
</template>

<script>
export default {
  mounted() {
      this.$store.commit("setVisibility", true);
  },
  methods: {
    open_edit_page() {
      this.$router.push("/edit");
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    overflow-y: scroll;
    width: 100%;
    background-color: #F6FCFF; 
    h1 {
        font-family: 'Montserrat', sans-serif;
        margin: 2% 0 3% 5%;
        font-weight: 700;    
    }
    .information {
      display: flex;
      flex-direction: row;
      padding-left: 5%;
      img { width: 80%; }
      h4 {
        font-family: 'Montserrat', sans-serif;
        color: #224C84;
        margin: 0 0 10px 0;
        font-weight: 700;
        font-size: 16px;
      }
      p {
        font-family: 'Raleway', sans-serif;
        margin-bottom: 4px;
      }
      button {
        width: 160px;
        height: 35px;
        border-radius: 7px;
        background: #74A5EE;
        margin: 10px 0 10px 0;
        color: white;
        border: none;
        padding: 4px 0;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
      }
    } 
  }
  
</style>