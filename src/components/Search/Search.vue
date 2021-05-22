<template>
  <div class="search-container">
    <div class="search-header">
      <h1>Поиск</h1>
    </div>
    <div class="search-filter">
      <h4>Фильтр</h4>
      <div class="filter-content">
        <div class="left-column">
          <label>Профессиональная область </label>  
          <select v-model="professional_field">
            <option>Любая</option>
            <option>IT, Интернет</option>
            <option>Бухгалтерия, финансы</option>
            <option>Реклама, маркетинг</option>
            <option>Административный персонал</option>
            <option>Банки, инвестиции</option>
            <option>Управление персоналом</option>
            <option>Автобизнес</option>
            <option>Безопасность</option>
            <option>Производство</option>
            <option>Искусство, развлечения</option>
            <option>Торговля</option>
            <option>Общепит</option>
            <option>Строительство, недвижимость</option>
            <option>Юриспруденция</option>
            <option>Гос.служба</option>
            <option>Образование</option>
          </select><br>
          <label>Город </label>  
          <select v-model="city">
            <option>Любой</option>
            <option>Белгород</option>
            <option>Воронеж</option>
            <option>Железногорск</option>
            <option>Курск</option>
            <option>Курчатов</option>
            <option>Орел</option>
            <option>Москва</option>
          </select><br>
            <label>График работы </label>
            <select v-model="work_schedule">
              <option>Любой</option>
              <option>Полный день</option>
              <option>Сменный график</option>
              <option>Гибкий график</option>
              <option>Удаленная работа</option>
              <option>Вахтовый метод</option>
            </select><br>
            <label>Должность </label><input v-model="position" type="text" /><br>
            <label>Навыки </label>
            <multiselect class="multiselect" v-model="professional_skills" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
        </div>
        <div class="right-column">
            <label>Тип занятости </label>
            <select v-model="employment_type">
              <option>Любой</option>
              <option>Полная занятость</option>
              <option>Частичная занятость</option>
              <option>Проектная работа/разовое задание</option>
              <option>Стажировка</option>
            </select><br>
            <div>
              <label>Минимальная зарплата (руб.) </label>
              <input v-model="min_salary" type="text" /><br>
              <label>Максимальная зарплата (руб.) </label>
              <input v-model="max_salary" type="text" /><br>
            </div>
            <div class="buttons">
              <button class="search-btn" @click="search_vacancy">Найти</button>
              <button class="clear-btn" @click="clear_filters">Очистить</button>
            </div>
        </div>
      </div>
    </div>
    <div class="search-results-container">
      <div class="search-result" v-for="(item, index) in search_result" :key="index" :data-index="index">
        <div class="search-result-header">
            <h3>{{item.position}}</h3>
            <h4>от {{item.min_salary}} руб.</h4>
        </div>
        <div class="search-result-more">Подробнее >></div> 
      </div>
    </div>
  </div>
</template>

<script>
import AlertError from '../../../lib/alert_error';
import json_fetch from '../../lib/json_fetch';
import Multiselect from 'vue-multiselect';

export default {
  data() {
    return {
        position: '',
        min_salary: '',
        max_salary: '',
        professional_field: '',
        employment_type: '',
        work_schedule: '',
        city: '',
        professional_skills: [{ name: 'Vue.js' }],
        options: [
          { name: 'Vue.js'},
          { name: 'Javascript'},
          { name: 'CSS'}
        ],
        search_result: []
    }       
  },
  components: {
    multiselect: Multiselect
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.professional_skills.push(tag)
    },
    async search_vacancy() {
      try {
        const {position, min_salary, max_salary, professional_field, employment_type, work_schedule, city, professional_skills} = this;
        const response = await json_fetch('http://localhost:3000/search', {
          position, min_salary, max_salary, professional_field, employment_type, work_schedule, 
          city, professional_skills       
        })
        const data = await response.json();
        this.search_result = data;
        console.log(this.search_result);
        if(!response.ok) throw new AlertError(response.statusText); 
      } catch(err) {
        console.log(err);
      } 
    },
    clear_filters() {
      this.position = '';
      this.min_salary = '';
      this.max_salary ='';
      this.professional_field = '';
      this.employment_type = '';
      this.work_schedule = '';
      this.city = '';
      this.professional_skills = '';
    },
    open_add_vacancy() {
      this.$router.push("/addvacancy");
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-container {
    overflow-y: scroll;
    width: 100%;
    background-color: #F6FCFF;
    button {
      border-radius: 5px;
      margin-top: 3%;
      color: white;
      border: none;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
    }
    .search-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-right: 5%;
      h1 {
        font-family: 'Montserrat', sans-serif;
        margin: 2% 0 1% 5%;
        font-weight: 700;    
      }
      button {
        width: 220px;
        height: 35px;
        background: #74A5EE;
        padding: 4px 0;
      }
    }
    .search-filter {
      background-color: #E4EDF8;
      padding: 20px 40px;
      margin: 0 5%;
      h4 {
        font-family: 'Montserrat', sans-serif;
        color: #224C84;
        margin: 0 0 10px 0;
        font-weight: 700;
        font-size: 20px;
      }
      .filter-content {
        display: flex;
        flex-direction: row;
        height: 30%; 
        justify-content: space-between; 
        label {
          font-family: 'Raleway', sans-serif;
          margin-bottom: 4px;
          font-size: 15px;
          display: inline-block;
          width: 170px;
        }
        .multiselect {
          height: 30px;
          border: 1px solid #425359;
          border-radius: 5px;
          .multiselect__tags-wrap {
            .multiselect__tag {
                background: #224C84 !important;     
            }
          }
        }
        textarea, input, select{   
          outline: none;
          border: 1px solid #425359;
          border-radius: 5px;
          padding-left: 7px;
          font-family: 'Raleway', sans-serif;
          &:focus {
            border-radius: 5px;
            background-color: #FFFFFF;
            font-size: 14px;
            outline: none;
          }
        } 
        textarea {
          width: 400px;
          &::-webkit-input-placeholder {
            color: black; 
            font-size: 14px;
            font-family: 'Raleway', sans-serif;
            transition: 0.5s;
          }
        }
        input, select {
          width: 200px;
          height: 30px;
          margin-bottom: 10px;
        }
        select {
          color: black; 
          font-size: 14px;
          font-family: 'Raleway', sans-serif;
          transition: 0.5s;
          background-color: #FFFFFF;
        }
        .search-btn, .clear-btn {
          width: 100px;
          height: 35px;
        }
        .search-btn {
          background-color: #224C84;
          margin-right: 10px;
        }
        .clear-btn {
          background-color: #74A5EE;
           width: 120px;
        }
      }
    }
    .search-results-container {
      margin: 0 5%;
      .search-result {
        margin: 15px 0;
        background-color: #ffffff;
        padding: 20px 40px;
        .search-result-header {
           display: flex;
           flex-direction: row;
           justify-content: space-between;
           h3 {
                font-family: 'Montserrat', sans-serif;
                color: #224C84;
                margin: 0 0 10px 0;
                font-weight: 700;
                font-size: 22px;
           }
           h4 {
               font-family: 'Raleway', sans-serif;
               color: #224C84;
               font-size: 20px;
           } 
        }
        p {
            font-family: 'Raleway', sans-serif;
        }
        .search-result-more {
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            margin-top: 15px;
        }
      }
    }
  }
</style>