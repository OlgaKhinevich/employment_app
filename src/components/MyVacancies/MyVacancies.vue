<template>
    <div class="my-vacancies">
      <div class="my-vacancies-header">
        <h1>Добавленные вакансии </h1>
        <button class="search-btn" @click="add_vacancy">Добавить вакансию</button>
      </div>
        <div class="vacancies-table">
            <table>
                <tr>
                    <th>Должность</th>
                    <th>Минимальная зарплата</th>
                    <th>Обязанности</th>
                    <th>Условия работы</th>
                    <th>Профессиональные навыки</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
                <tr v-for="(item, index) in vacancies" :key="index" :data-index="index">
                    <td>{{item.position}}</td>
                    <td>{{item.min_salary}}</td>
                    <td>{{item.duties}}</td>
                    <td>{{item.working_conditions}}</td>
                    <td>
                      <p v-for="(item1, index) in item.professional_skills" :key="index" :data-index="index">
                        <span>{{item1.skill_name}}</span>
                        <span>{{item1.skill_level}}</span>
                      </p>
                    </td>
                    <td><div class="status">{{item.status}}</div></td>
                    <td>
                      <i class="fa fa-times"> </i>
                      <i class="fa fa-ban" @click="delete_vacancy"> </i>
                    </td> 
                </tr>
            </table>
        </div>
  </div>
</template>

<script>
import AlertError from '../../../lib/alert_error';
import json_fetch from '../../lib/json_fetch';

export default {
    
    data() {
        return {
            vacancies: []
        }
    },
    mounted() {
      this.get_company_vacancies();
      this.$store.commit("setVisibility", true);
    },
    methods: {
        async get_company_vacancies() {
            try {
                const response = await json_fetch(`http://localhost:3000/getcompanyvacancies`);
                if(!response.ok) throw new AlertError(response.statusText);
                const data = await response.json();
                console.log(data);
                this.vacancies = data;
                console.log(this.vacancies);
            } catch (err) {
                if(err.name === "AlertError") return alert(err.message);
                console.log(err);
            }
        },
        async delete_vacancy(e) {
          try {
            const is_confirmed = confirm("Вы действительно удалить вакансию?");
            if(!is_confirmed) return;
            const row = e.target.closest('tr');
            const index = row.dataset.index;
            const vacancy_id = this.vacancies[index]._id;
            const response = await json_fetch('http://localhost:3000/deletevacancy', {
              _id: vacancy_id    
            }) 
            if(!response.ok) throw new AlertError(response.statusText);
          } catch (err) {
            if(err.name === "AlertError") return alert(err.message);
            console.log(err); 
          }
        },
        add_vacancy() {
          this.$router.push("/addvacancy"); 
        }
    }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/mixins';

    .my-vacancies {
    overflow-y: scroll;
    width: 100%;
    background-color: #F6FCFF;
    padding: 0 5%;
    .my-vacancies-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        font-family: 'Montserrat', sans-serif;
        margin: 2% 0 1% 0;
        font-weight: 700;    
      }
      button {
        @include active_btn;
        width: 230px;
      }
    }
    
    .vacancies-table {
      table {
        border-collapse: collapse;
        width: 100%;
        th, td {
          text-align: left;
          padding: 8px;
          font-size: 14px;
        }
        th {
          background-color: #E4EDF8;
          color: #224C84;
          font-family: 'Montserrat', sans-serif;
        }
        td {
          font-family: 'Raleway', sans-serif;
          font-weight: 500;
          border-top: 0.9px solid  #577eb1;
          border-bottom: 0.9px solid #577eb1;
        }
        .status {
          background-color: #74A5EE;
          width: 120px;
          height: 22px;
          text-align: center;
          border-radius: 5px;
          color: #ffffff;
          font-weight: 600;
        }
        i { color: #224C84; }
      }
    }
  }
</style>