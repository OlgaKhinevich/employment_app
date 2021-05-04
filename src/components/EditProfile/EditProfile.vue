<template>
  <div class="edit-profile">
    <h1>Личный профиль</h1>
    <div class="information">
        <div class="left-column">
          <img src="/dist/img/avatar.jpg" />
          <button>Добавить фото</button>
          <h4>Контакты</h4>
          <label>Email адрес: </label><input v-model="company_name" type="text" placeholder="Email адрес" /><br>
          <label>Телефон: </label><input type="tel" v-model="company_name" placeholder="Телефон" pattern="8[0-9]{10}"/><br>
          <h4>Портфолио</h4>
          <p>Добавить ссылки</p>
          <input type="url" name="url" id="url" placeholder="https://example.com" size="30">
          <button>Добавить</button>
          <p>Добавить файлы</p>
          <input type="file" id="portfolio" multiple accept="application/pdf,image/*" @change="change_portfolio_list">
          <div class="portfolio-files">
              <p v-for="(item, index) in portfolio_files" :key="index">{{item}} 
                <i class="fa fa-trash set_remove_btn" @click="delete_portfolio_item(index)"> </i>
              </p>
          </div>
          <h4>Достижения</h4>
          <p>Добавить ссылки</p>
          <input type="url" name="url" id="url" placeholder="https://example.com" size="30">
          <button>Добавить</button>
          <p>Добавить файлы</p>
          <input type="file" id="file" multiple accept="application/pdf,image/*" @change="change_achievements_list">
          <div class="achievements-files">
              <p v-for="(item, index) in achievements_files" :key="index">
                {{item}} 
                <i class="fa fa-trash set_remove_btn" @click="delete_achievements_item(index)"></i>
              </p>
          </div>
        </div>
        <div class="right-column">
          <h4>Личная информация</h4>
          <div class="personal-information">
              <label>Фамилия: </label><input v-model="surname" type="text" placeholder="Фамилия" /><br>
              <label>Имя: </label><input v-model="name" type="text" placeholder="Имя" /><br>
              <label>Отчество: </label><input v-model="patronymic" type="text" placeholder="Отчество" /><br>
              <label>Дата рождения: </label><input type="date" /><br>
          </div>
          <h4>Основное образование</h4>
          <h5>Основное общее образование</h5>
          <div class="education">
            <p>
                <label>Название учебного заведения</label>
                <input v-model="company_name" type="text" placeholder="Название" /><br>
                <label class="date-label">Год окончания</label>
                <select>
                    <option>Пункт 1</option>
                    <option>Пункт 2</option>
                </select>
            </p>
          </div>
          <h5>Среднее общее образование</h5>
          <div class="education">
            <p>
                <label>Название учебного заведения</label>
                <input v-model="company_name" type="text" placeholder="Название" /><br>
                <label class="date-label">Год окончания</label>
                <select>
                    <option>Пункт 1</option>
                    <option>Пункт 2</option>
                </select>
            </p>
          </div>
          <h5>Среднее профессиональное образование  <button @click="add_secondary_edu">Добавить</button></h5> 
          <SecondaryEdu v-if="is_secondary_edu_visible" />
          <h5>Высшее профессиональное образование  <button>Добавить</button></h5>
          <HigherEdu />    
          <h4>Дополнительное образование <button @click="add_additional_edu">Добавить</button></h4>
          <AdditionalEdu v-if="is_addtional_edu_visible" />
          <h4>Опыт работы</h4>
          <input type="radio" id="no" :value="false" v-model="work_experience">
          <label for="no">Нет</label>
          <input type="radio" id="yes" :value="true" v-model="work_experience">
          <label for="yes">Да</label>
          <WorkExp v-if="work_experience" />
          <h4>Профеcсиональные навыки <button @click="show_modal">Добавить</button></h4>
          <modal-window ref="modal"></modal-window>
          <h4>Личные качества</h4>
          <textarea v-model="personal_qualities" placeholder="Описание личных качеств"></textarea>
          <h4>Дополнительно</h4>
          <div class="optionally">
            <label>Желаемая зарплата: </label>
            <input v-model="salary" type="text" placeholder="Желаемая зарплата" />
            <label> руб.</label><br>
            <label>Занятость: </label>
            <select>
              <option>Любая</option>
              <option>Полная занятость</option>
              <option>Частичная занятость</option>
              <option>проектная работа/разовое задание</option>
              <option>Стажировка</option>
            </select><br>
            <label>График работы: </label>
            <select>
              <option>Любой</option>
              <option>Полный день</option>
              <option>Сменный график</option>
              <option>Гибкий график</option>
              <option>Удаленная работа</option>
              <option>Вахтовый метод</option>
            </select><br>
            <label>Готовность к командировкам: </label>
            <select>
              <option>Да</option>
              <option>Нет</option>
            </select><br>
            <label>Готовность к переезду: </label>
            <select>
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
import HigherEdu from './HigherEdu.vue';
import SecondaryEdu from './SecondaryEdu.vue';
import WorkExp from './WorkExp.vue';
import AdditionalEdu from './AdditionalEdu.vue';
//import ModalWindow from './ModalWindow.vue';

export default {
  data() {
    return {
      work_experience: false,
      is_secondary_edu_visible: false,
      is_addtional_edu_visible: false,
      portfolio_files: [],
      achievements_files: [],
      secondary_edu: [],
      higher_edu: [],
      additional_edu: []
    }
  },
  components: {
      SecondaryEdu,
      HigherEdu,
      WorkExp,
      AdditionalEdu,
      //ModalWindow
  },
  methods: {
    show_modal: function () {
      this.$refs.modal.show = true
    },
    change_portfolio_list(e) {
      this.portfolio_files.push(e.target.files[0].name);
      console.log(this.portfolio_files);
    },
    delete_portfolio_item(index) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      this.portfolio_files.splice(index, 1);
    },
    change_achievements_list(e) {
      this.achievements_files.push(e.target.files[0].name);
    },
    delete_achievements_item(index) {
      const is_confirmed = confirm("Вы действительно хотите удалить?");
      if(!is_confirmed) return;
      this.achievements_files.splice(index, 1);
    },
    add_additional_edu() {
      this.is_addtional_edu_visible = true;
    },
    add_secondary_edu() {
      this.is_secondary_edu_visible = true;
    },
    
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/mixins';
  @import '../../styles/variables';

    .edit-profile {
    @include container;
    h1 {
        font-family: $first-font;
        margin: 2% 0 3% 5%;
        font-weight: 700;    
    }
    .information {
      display: flex;
      flex-direction: row;
      padding-left: 5%;
      img { width: 74%; }
      h4 { @include title_h4; }
      h5 {
        font-size: 16px;
        font-family: 'Raleway', sans-serif;
        margin: 0 0 10px 0;
      }

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
      }
      i {color: #224C84;}
      textarea, input, select {   
        outline: none;
        background-color: #F1F2F2;
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
      textarea {width: 620px;}
      input, select {
        width: 170px;
        height: 30px;
        margin-bottom: 10px;
      }
      input[type="file"] {
        border: none;
        background-color: #F6FCFF; 
        width: 200px;
        font-size: 12px;
        padding: 0;
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
        width: 110px;
        height: 30px;
        border-radius: 5px;
        font-size: 14px;
        background: #74A5EE;
        margin: 10px 0 10px 0;
        color: white;
        border: none;
        padding: 4px 0;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
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
          .education, .work-experience {
            select { width: 90px; }
            input { width: 370px; }
            label {
              width: 220px;
            }
            .date-label {
              width: 110px;
            }
            .education-level { width: 200px; }
          }
          .optionally {
              label {
                display: inline-block;
                width: 220px;
              }
          }
          .save-changes {
            background-color: #224C84;
            width: 200px;
            height: 38px;
            border-radius: 7px;
          }
      }
    } 
  }
</style>