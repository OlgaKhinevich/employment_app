<template>
  <div class="edit-profile">
    <h1>Личный профиль</h1>
    <div class="information">
        <div class="left-column">
          <img src="/dist/img/1.jpg">
          <Avatar />
          <h4>Контакты</h4>
          <label>Email адрес </label><input v-model="email" type="text" placeholder="Email адрес" /><br>
          <label>Телефон </label><input type="tel" v-model="telephone_number" placeholder="Телефон"/><br>
          <label>Смена пароля </label><input type="password" v-model="password" placeholder="Пароль"/><br>
          
          <h4>Портфолио</h4>
          <p>Название ссылки</p>
          <input type="url" placeholder="https://example.com" size="30" v-model="portfolio.name">
          <p>Добавить ссылку</p>
          <input type="url" placeholder="https://example.com" size="30" v-model="portfolio.link">
          <button @click="add_new_portfolio">Добавить</button>
          <div class="portfolio-files">
              <p v-for="(item, index) in portfolio.files" :key="index" :data-index="index">
                <a :href="item.link">{{item.name}}</a> 
                <i class="fa fa-trash set_remove_btn" @click="delete_portfolio_item"> </i> 
              </p>
             
          </div>

          <h4>Достижения</h4>
          <p>Название ссылки</p>
          <input type="url" placeholder="https://example.com" size="30" v-model="achievements.name">
          <p>Добавить ссылку</p>
          <input type="url" placeholder="https://example.com" size="30" v-model="achievements.link">
          <button @click="add_new_achievement">Добавить</button>
          <div class="achievements-files">
              <p v-for="(item, index) in achievements.files" :key="index" :data-index="index">
                <a :href="item.link">{{item.name}}</a> 
                <i class="fa fa-trash set_remove_btn" @click="delete_achievements_item"> </i> 
              </p>
          </div>

        </div>
        <div class="right-column">
          <h4>Личная информация</h4>
          <div class="personal-information">
              <label>Фамилия </label><input v-model="surname" type="text" placeholder="Фамилия" /><br>
              <label>Имя </label><input v-model="name" type="text" placeholder="Имя" /><br>
              <label>Отчество </label><input v-model="patronymic" type="text" placeholder="Отчество" /><br>
              <label>Дата рождения </label><input type="date" v-model="birth_date" /><br>
          </div>

          <h4>Основное образование</h4>
          <h5>Основное общее образование</h5>
          <div class="education">
            <p>
                <label>Название учебного заведения</label>
                <input v-model="basic_edu.general_edu.edu_institute" type="text" placeholder="Название" /><br>
                <label class="date-label" >Год окончания</label>
                <select v-model="basic_edu.general_edu.grad_year">
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                </select>
            </p>
          </div>

          <h5>Среднее общее образование</h5>
          <div class="education">
            <p>
                <label>Название учебного заведения</label>
                <input v-model="basic_edu.secondary_general_edu.edu_institute" type="text" placeholder="Название" /><br>
                <label class="date-label">Год окончания</label>
                <select v-model="basic_edu.secondary_general_edu.grad_year">
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                </select>
            </p>
          </div>

          <h5>Среднее профессиональное образование</h5> 
          <div class="education">
            <label>Название учебного заведения</label>
            <input v-model="basic_edu.secondary_edu.edu_institute" type="text" placeholder="Название" /><br>
            <label class="date-label">Год окончания</label>
            <select v-model="basic_edu.secondary_edu.grad_year">
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
            </select><br> 
            <label>Направление подготовки </label>
            <input v-model="basic_edu.secondary_edu.profession" type="text" placeholder="Направление подготовки" /><br> 
            <button @click="add_secondary_edu">Добавить</button>
          </div>
          <div class="secondary-edu-list">
              <p v-for="(item, index) in basic_edu.secondary_edu" :key="index" :data-index="index">
                <span>{{item.edu_institute}}</span>
                <span>{{item.grad_year}}</span>
                <span>{{item.profession}}</span>
                <i class="fa fa-trash set_remove_btn" @click="delete_secondary_edu_item"> </i> 
              </p>    
          </div>  

          <h5>Высшее профессиональное образование</h5>
          <div class="education">
            <label>Название учебного заведения</label>
            <input v-model="basic_edu.higher_edu.edu_institute" type="text" placeholder="Название" /><br>
            <label class="date-label">Год окончания</label>
            <select v-model="basic_edu.higher_edu.grad_year">
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
            </select><br> 
            <label>Факультет </label><input v-model="basic_edu.higher_edu.faculty" type="text" placeholder="Факультет" /><br>
            <label>Направление подготовки </label><input v-model="basic_edu.higher_edu.profession" type="text" placeholder="Направление пдготовки" /><br> 
            <label>Уровень образования </label>
            <select class="education-level" v-model="basic_edu.higher_edu.edu_level">
              <option>Бакалавриат</option>
              <option>Специалитет</option>
              <option>Магистратура</option>
              <option>Аспирантура</option>
            </select><br>
            <button @click="add_higher_edu">Добавить</button>
          </div>
          <div class="higher-edu-list">
              <p v-for="(item, index) in basic_edu.higher_edu" :key="index" :data-index="index">
                <span>{{item.edu_institute}}</span>
                <span>{{item.grad_year}}</span>
                <span>{{item.faculty}}</span>
                <span>{{item.profession}}</span>
                <i class="fa fa-trash set_remove_btn" @click="delete_higher_edu_item"> </i> 
              </p>    
          </div>   
          
          <h4>Дополнительное образование</h4>
          <div class="additional-edu">
            <label>Тип</label>
            <select class="edu-type" v-model="additional_edu.edu_type">
                <option>Курс</option>
                <option>Семинар</option>
                <option>Тренинг</option>
                <option>Повышение квалификации</option>
            </select><br>
            <label>Название</label>
            <input v-model="additional_edu.edu_name" type="text" placeholder="Название" /><br>
            <label>Место</label>
            <input v-model="additional_edu.edu_place" type="text" placeholder="Место" /><br>
            <label class="date-label">Год окончания</label>
            <select v-model="additional_edu.grad_year">
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
            </select><br>
            <button @click="add_additional_edu">Добавить</button> 
          </div>
          <div class="additional-edu-list">
              <p v-for="(item, index) in additional_edu" :key="index" :data-index="index">
                <span>{{item.edu_type}}</span>
                <span>{{item.edu_name}}</span>
                <span>{{item.grad_year}}</span>
                <i class="fa fa-trash set_remove_btn" @click="delete_addtional_edu_item"> </i> 
              </p>    
          </div>
          
          <h4>Опыт работы</h4>
          <input type="radio" id="no" :value="false" v-model="work_experience_visible">
          <label for="no">Нет</label>
          <input type="radio" id="yes" :value="true" v-model="work_experience_visible">
          <label for="yes">Да</label>
          <div class="work-experience" v-if="work_experience_visible">
            <label>Место работы</label>
            <input v-model="work_experience.work_place" type="text" placeholder="Название" /><br>
            <label class="date-label">с</label>
            <select v-model="work_experience.start_year">
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
            </select>
            <label class="date-label">по</label>
            <select v-model="work_experience.end_year">
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
            </select><br> 
            <label>Должность </label><input v-model="work_experience.position" type="text" placeholder="Должность" /><br>
            <button @click="add_work_experience">Добавить</button> 
          </div>
          <div class="work-experience-list">
              <p v-for="(item, index) in work_experience" :key="index" :data-index="index">
                <span>{{item.work_place}}</span>
                <span>{{item.start_year}}</span>
                <span>{{item.end_year}}</span>
                <span>{{item.position}}</span>
                <i class="fa fa-trash set_remove_btn" @click="delete_work_experience"> </i> 
              </p>    
          </div>

          <h4>Профеcсиональные навыки</h4>
          <div class="professional-skills">
            <label>Тип навыка</label>
            <select v-model="professional_skills.skill_type">
              <option>Навыки работы в программе</option>
              <option>Знание языков программирования</option>
              <option>Знание иностранных языков</option>
              <option>Навыки работы с оргтехникой</option>
            </select><br>
            <label>Название навыка</label>
            <input v-model="professional_skills.skill_name" type="text" placeholder="Название навыка" /><br>
            <label>Уровень владения</label>
            <select v-model="professional_skills.skill_level">
              <option>Начальный уровень</option>
              <option>Средний уровень</option>
              <option>Высокий уровень</option>
            </select><br>
            <button @click="add_professional_skill">Добавить</button> 
          </div>
          <div class="professional-skills-list">
              <p v-for="(item, index) in professional_skills" :key="index" :data-index="index">
                <span>{{item.skill_type}}</span>
                <span>{{item.skill_name}}</span>
                <span>{{item.skill_level}}</span>
                <i class="fa fa-trash set_remove_btn" @click="delete_professional_skill"> </i> 
              </p>    
          </div>
          
          <h4>Личные качества</h4>
          <textarea v-model="personal_qualities" placeholder="Описание личных качеств"></textarea>
          
          <h4>Дополнительно</h4>
          <div class="optionally">
            <label>Желаемая зарплата </label>
            <input v-model="additionally.desired_salary" type="text" placeholder="Желаемая зарплата" />
            <label> руб.</label><br>
            <label>Занятость </label>
            <select v-model="additionally.employment">
              <option>Любая</option>
              <option>Полная занятость</option>
              <option>Частичная занятость</option>
              <option>проектная работа/разовое задание</option>
              <option>Стажировка</option>
            </select><br>
            <label>График работы </label>
            <select v-model="additionally.work_schedule">
              <option>Любой</option>
              <option>Полный день</option>
              <option>Сменный график</option>
              <option>Гибкий график</option>
              <option>Удаленная работа</option>
              <option>Вахтовый метод</option>
            </select><br>
            <label>Готовность к командировкам </label>
            <select v-model="additionally.business_trips">
              <option>Да</option>
              <option>Нет</option>
            </select><br>
            <label>Готовность к переезду </label>
            <select v-model="additionally.relocation">
              <option>Да</option>
              <option>Нет</option>
            </select>
          </div>
          <button class="save-changes" @click="edit_profile">Сохранить изменения</button>
        </div>
    </div>   
  </div>
</template>

<script>
import Avatar from './Avatar.vue';
import AlertError from '../../../lib/alert_error';
import ModalWindow from '../Modal/ModalWindow.vue';
import json_fetch from '../../lib/json_fetch';


export default {
  data() {
    return {
      surname: '',
      name: '',
      patronymic: '',
      birth_date: '',
      email: '',
      telephone_number: '',
      password: '',
      basic_edu: {
        general_edu: {
          edu_institute: '',
          grad_year: 0
        },
        secondary_general_edu: {
          edu_institute: '',
          grad_year: 0
        },
        secondary_edu: [],
        higher_edu: []
      },
      additional_edu: [],
      work_experience: [],
      professional_skills: [],
      personal_qualities: '',
      additionally: {
        desired_salary: 0,
        employment: '',
        work_schedule: '',
        business_trips: '',
        relocation: ''
      },

      work_experience_visible: false,
      portfolio: {
        name: "",
        link: "",
        files: []
      },
      achievements: {
        name: "",
        link: "",
        files: []
      }
    }
  },
  components: {
      Avatar
  },
  methods: {
    show_modal: function () {
      this.$refs.modal.show = true
    },
    add_new_portfolio() {
      this.portfolio.files.push({name: this.portfolio.name, link: this.portfolio.link});
      this.portfolio.name = '';
      this.portfolio.link = '';
    },
    delete_portfolio_item({target}) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      const delete_index = target.closest("p").dataset.index;
      this.portfolio.files.splice(delete_index, 1);
    },
    add_new_achievement() {
      this.achievements.files.push({name: this.achievements.name, link: this.achievements.link});
      this.achievements.name = '';
      this.achievements.link = '';
    },
    delete_achievements_item({target}) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      const delete_index = target.closest("p").dataset.index;
      this.achievements.files.splice(delete_index, 1);
    },
    add_additional_edu() {
      this.additional_edu.push({
        edu_type: this.additional_edu.edu_type, 
        grad_year: this.additional_edu.grad_year,
        edu_name: this.additional_edu.edu_name,
        edu_place: this.additional_edu.edu_place
      });
      this.additional_edu.edu_type = '';
      this.additional_edu.grad_year = '';
      this.additional_edu.edu_name = '';
      this.additional_edu.edu_place = '';
    },
    delete_addtional_edu_item({target}) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      const delete_index = target.closest("p").dataset.index;
      this.additional_edu.splice(delete_index, 1);
    },
    add_secondary_edu() {
      this.basic_edu.secondary_edu.push({
        edu_institute: this.basic_edu.secondary_edu.edu_institute, 
        grad_year: this.basic_edu.secondary_edu.grad_year,
        profession: this.basic_edu.secondary_edu.profession
      });
      this.basic_edu.secondary_edu.edu_institute = '';
      this.basic_edu.secondary_edu.grad_year = '';
      this.basic_edu.secondary_edu.profession = '';
    },
    delete_secondary_edu_item({target}) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      const delete_index = target.closest("p").dataset.index;
      this.basic_edu.secondary_edu.splice(delete_index, 1);
    },
    add_higher_edu() {
      this.basic_edu.higher_edu.push({
        edu_institute: this.basic_edu.higher_edu.edu_institute, 
        grad_year: this.basic_edu.higher_edu.grad_year,
        faculty: this.basic_edu.higher_edu.faculty,
        profession: this.basic_edu.higher_edu.profession
      });
      this.basic_edu.higher_edu.edu_institute = '';
      this.basic_edu.higher_edu.grad_year = '';
      this.basic_edu.higher_edu.faculty = '';
      this.basic_edu.higher_edu.profession = '';
    },
    add_professional_skill() {
      this.professional_skills.push({
        skill_type: this.professional_skills.skill_type, 
        skill_name: this.professional_skills.skill_name,
        skill_level: this.professional_skills.skill_level
      });
      this.professional_skills.skill_type = '';
      this.professional_skills.skill_name = '';
      this.professional_skills.skill_level = '';
    },
    delete_professional_skill({target}) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      const delete_index = target.closest("p").dataset.index;
      this.professional_skills.splice(delete_index, 1);
    },
    delete_higher_edu_item({target}) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      const delete_index = target.closest("p").dataset.index;
      this.basic_edu.higher_edu.splice(delete_index, 1);
    },
    add_work_experience() {
      this.work_experience.push({
        work_place: this.work_experience.work_place, 
        start_year: this.work_experience.start_year,
        end_year: this.work_experience.end_year,
        position: this.work_experience.position
      });
      this.work_experience.work_place = ''; 
      this.work_experience.start_year = '';
      this.work_experience.end_year = '';
      this.work_experience.position = '';
    },
    delete_work_experience({target}) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      const delete_index = target.closest("p").dataset.index;
      this.work_experience.splice(delete_index, 1);
    },
    async edit_profile() {
      try{
        const {surname, name, patronymic, birth_date, email, password, telephone_number, basic_edu,
        additional_edu, work_experience, personal_qualities,
        additionally, portfolio, achievements} = this;       
        if(!email.includes("@")) throw new AlertError("Неправильный формат email!");
        if(password.length < 6 || password.length > 20) throw new AlertError("Длина пароля должна быть больше 6 символов, но меньше 20!");
        const response = await json_fetch('http://localhost:3000/edit', {
          surname, name, patronymic, birth_date, email, password, telephone_number, basic_edu,
          additional_edu, work_experience, personal_qualities,
          additionally, portfolio, achievements            
        });
        if(!response.ok) throw new AlertError(response.statusText);  
        this.edit_modal_text = `Данные изменены!`;
        this.is_edit_modal_visible = true;
      }
      catch(err){
          if(err.name === "AlertError") alert(err.message);
          console.log(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/mixins';
  @import '../../styles/variables';

  .edit-profile {
    @include container;
    padding: 0 5%;
    h1 {
      @include title2_h1; 
    }
    .information {
      display: flex;
      flex-direction: row;
      h4 { @include title_h4; }
      h5 {
        font-size: 16px;
        font-family: 'Raleway', sans-serif;
        margin: 0 0 10px 0;
      }
      img {width: 90%;}
      .portfolio-files, .achievements-files {
        p {
          margin-bottom: 7px;
          font-family: $second-font;
          font-weight: 500;
          font-size: 15px;
        }
      }
      label {
        @include label_style;
        margin-right: 5px;
      }
      i {color: #224C84;}
      textarea, input, select {   
        outline: none;
        border: 1px solid #425359;
        border-radius: 5px;
        padding-left: 7px;
        &:focus {
          border: 1.5px solid #2195AE;
          border-radius: 5px;
          background-color: #FFFFFF;
          font-size: 14px;
          outline: none;
        }
      }
      textarea {width: 600px;}
      input, select {
        width: 170px;
        height: 30px;
        margin-bottom: 10px;
        font-family: $second-font;
        background-color: #ffffff; 
      }
      select {
        color: black; 
        font-size: 14px;
        font-family: 'Raleway', sans-serif;
        transition: 0.5s;
      }
      textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
        color: black; 
        font-size: 14px;
        font-family: 'Raleway', sans-serif;
        transition: 0.5s;
      }
      button {
        @include blue_btn;
        height: 38px;
      }
      .right-column {
          margin-left: 25px;
          .personal-information {
            label {
              width: 150px;
            }
          }
          input[type="radio"] {
            height: 12px;
            width: 12px;
            margin-right: 10px;
          }
          .education, .additional-edu, .professional-skills {
            select { 
              width: 150px;
              background-color: #ffffff;  
            }
            input { 
              width: 370px;
              background-color: #ffffff;  
            }
            label {
              width: 220px;
            }
            .date-label {
              width: 110px;
            }
            .education-level { 
              width: 200px;
              background-color: #ffffff; 
            }
          }
          .work-experience {
            label {
              width: 120px;
            }
            .date-label {
              width: 20px;
            }
            
          }
          .professional-skills {
             label {
              width: 140px;
            }
          }
          .additional-edu {
            label {
              width: 110px;
            }
            .date-label {
              width: 110px;
            }
          }
          .optionally {
              label {
                display: inline-block;
                width: 210px;
              }
          }
          .additional-edu-list, .higher-edu-list, .secondary-edu-list, work-experience-list, .postfolio-list, .achievements-files, .professional-skills-list {
            font-family: $first-font;
            font-weight: 500;
          }
          .save-changes {
            background-color: #224C84;
            width: 220px;
            height: 38px;
            border-radius: 7px;
            padding: 0 10px;
          }
      }
    } 
  }
</style>