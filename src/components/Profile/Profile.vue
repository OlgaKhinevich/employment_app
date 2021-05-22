<template>
  <div class="profile">
    <h1>Личный профиль</h1>
    <div class="information">
        <div class="left-column">
          <img src="/dist/img/1.jpg" />
          <button @click="open_edit_page">Редактировать</button>
          <h4>Контакты</h4>
          <label>Email адрес</label><br>
          <span>{{this.student_info.email}}</span><br>
          <label>Телефон</label><br>
          <span>{{this.student_info.telephone_number}}</span><br>
          <h4>Портфолио</h4>
           <div class="portfolio-files">
              <p v-for="(item, index) in student_info.portfolio[0].files" :key="index" :data-index="index">
                <a :href="item.link">{{item.name}}</a> 
              </p>  
          </div>
          <h4>Достижения</h4>
          <div class="achievements-files">
              <p v-for="(item, index) in student_info.achievements[0].files" :key="index" :data-index="index">
                <a :href="item.link">{{item.name}}</a> 
              </p>
          </div>
        </div>
        <div class="right-column">
          <h4>Личная информация</h4>
          <label>Фамилия</label><span>{{this.student_info.surname}}</span><br>
          <label>Имя</label><span>{{this.student_info.name}}</span><br>
          <label>Отчество</label><span>{{this.student_info.patronymic}}</span><br>
          <label>Дата рождения</label><span>{{this.student_info.birth_date}}</span><br>
          <h4>Основное образование</h4>
          <h5>Основное общее образование</h5>
           <span>{{this.student_info.basic_edu.general_edu.grad_year}}</span>
          <span>{{this.student_info.basic_edu.general_edu.edu_institute}}</span><br>
          <h5>Среднее общее образование</h5>
          <span>{{this.student_info.basic_edu.secondary_general_edu.grad_year}}</span>
          <span>{{this.student_info.basic_edu.secondary_general_edu.edu_institute}}</span><br>
          <h5>Среднее профессиональное образование</h5>
            <p v-for="(item, index) in student_info.basic_edu.secondary_edu" :key="index" :data-index="index">
              <span>{{item.grad_year}}</span>
              <span>{{item.edu_institute}}</span>
              <span>{{item.profession}}</span><br>
            </p> 
          <h5>Высшее профессиональное образование</h5>
            <p v-for="(item, index) in student_info.basic_edu.higher_edu" :key="index" :data-index="index">
              <span>{{item.grad_year}}</span>
              <span>{{item.edu_level}}</span>
              <span>{{item.edu_institute}}</span>
              <span>{{item.faculty}}</span>
              <span>{{item.profession}}</span><br>
            </p>
          <h4>Дополнительное образование</h4>
            <p v-for="(item, index) in student_info.additional_edu" :key="index" :data-index="index">
              <span>{{item.grad_year}}</span>
              <span>{{item.edu_type}}</span>
              <span>{{item.edu_name}}</span><br>
            </p>
          <h4>Опыт работы</h4>
            <p v-for="(item, index) in student_info.work_experience" :key="index" :data-index="index">
              <span>{{item.start_year}} - {{item.end_year}}</span>
              <span>{{item.work_place}}</span>
              <span>{{item.position}}</span> 
            </p>
          <h4>Профессиональные навыки</h4>
          <p v-for="(item, index) in student_info.professional_skills" :key="index" :data-index="index">
              <span>{{item.skill_type}}</span>
              <span>{{item.skill_name}}</span>
              <span>{{item.skill_level}}</span> 
          </p>
          <h4>Личные качества</h4>
          <span>{{this.student_info.personal_qualities}}</span>
          <div class="additionally">
          <h4>Дополнительно</h4>
          <label>Желаемая зарплата</label><span>{{this.student_info.additionally.desired_salary}}</span><br>
          <label>Занятость</label><span>{{this.student_info.additionally.employment}}</span><br>
          <label>График работы</label><span>{{this.student_info.additionally.work_schedule}}</span><br>
          <label>Готовность к командировкам</label><span>{{this.student_info.additionally.business_trips}}</span><br>
          <label>Готовность к переезду</label><span>{{this.student_info.additionally.relocation}}</span><br>
          </div>
        </div>  
    </div>   
  </div>
</template>

<script>
import AlertError from '../../../lib/alert_error';
import json_fetch from '../../lib/json_fetch';

export default {
  data() {
    return {
      student_info: {}
    }
  },
  mounted() {
      this.$store.commit("setVisibility", true);
      this.get_student();
  },
  methods: {
    open_edit_page() {
      this.$router.push("/edit");
    },
    async get_student() {
      try {
        const response = await json_fetch(`http://localhost:3000/getstudent`);
        if(!response.ok) throw new AlertError(response.statusText);
        const data = await response.json();
        this.student_info = data[0];
        this.present_date();
        console.log(this.student_info);
      } catch (err) {
        if(err.name === "AlertError") return alert(err.message);
        console.log(err);
      }
    },
    present_date() {
      this.student_info.birth_date = `${this.student_info.birth_date[8]}${this.student_info.birth_date[9]}.${this.student_info.birth_date[5]}${this.student_info.birth_date[6]}.${this.student_info.birth_date[0]}${this.student_info.birth_date[1]}${this.student_info.birth_date[2]}${this.student_info.birth_date[3]}`
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
      .left-column {
        width: 60%;
        img { width: 70%; }
      }
      
      h4 {
        font-family: $first-font;
        color: $primary-color;
        margin: 0 0 10px 0;
        font-weight: 700;
        font-size: 20px;
      }
      h5 {
        font-size: 18px;
        font-family: 'Raleway', sans-serif;
        margin: 0 0 10px 0;
      }
      label { 
        @include label_style;
        width: 150px; 
      }
      p, span {
        font-family: $first-font;
        font-weight: 500;
        margin-bottom: 4px;
        font-size: 15px;
      }
      .additionally {
        label {
          width: 200px;
        }
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