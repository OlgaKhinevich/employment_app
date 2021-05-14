<template>
  <div class="profile">
    <h1>Личный профиль</h1>
    <div class="information">
        <div class="left-column">
          <img src="/dist/img/avatar.jpg" />
          <button @click="open_edit_page">Редактировать</button>
          <h4>Контакты</h4>
          <label>Email адрес:</label><p>ntrcn</p><br>
          <label>Телефон:</label><p>ntrcn</p><br>
          <h4>Портфолио</h4>
          <h4>Достижения</h4>
        </div>
        <div class="right-column">
          <h4>Личная информация</h4>
          <label>Фамилия:</label><p>ntrcn</p><br>
          <label>Имя:</label><p>ntrcn</p><br>
          <label>Отчество:</label><p>ntrcn</p><br>
          <label>Дата рождения:</label><p>ntrcn</p><br>
          <h4>Основное образование</h4>
          <h4>Дополнительное образование</h4>
          <h4>Опыт работы</h4>
          <h4>Профессиональные навыки</h4>
          <h4>Личные качества</h4>
          <h4>Дополнительно</h4>
          <label>Желаемая зарплата:</label><p>ntrcn</p><br>
          <label>Занятость:</label><p>ntrcn</p><br>
          <label>График работы:</label><p>ntrcn</p><br>
          <label>Готовность к командировкам:</label><p>ntrcn</p><br>
          <label>Готовность к переезду:</label><p>ntrcn</p><br>
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
  @import '../../styles/mixins';
  @import '../../styles/variables';

  .profile {
    @include container;
    padding: 0 5%;
    h1 { @include title2_h1; }
    .information {
      display: flex;
      flex-direction: row;
      padding-left: 5%;
      img { width: 80%; }
      h4 {
        font-family: $first-font;
        color: $primary-color;
        margin: 0 0 10px 0;
        font-weight: 700;
        font-size: 16px;
      }
      label { 
        @include label_style;
        width: 300px; 
      }
      p {
        font-family: $second-font;
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
        font-family: $first-font;
        font-weight: 700;
      }
    } 
  }
  
</style>