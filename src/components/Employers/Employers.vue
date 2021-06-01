<template>
  <div class="employers">
      <h1>Работодатели</h1>
      <div class="employers-table">
          <table>
                <tr>
                    <th>ФИО</th>
                    <th>Название компании</th>
                    <th>Сфера деятельности</th>
                    <th>Описание компании</th>
                    <th>Веб-сайт</th>
                    <th></th>
                </tr>
                <tr v-for="(item, index) in employers" :key="index" :data-index="index">
                    <td>{{item.surname}} {{item.name}} {{item.patronymic}}</td>
                    <td>{{item.company_name}}</td>
                    <td>{{item.company_direction}}</td>
                    <td>{{item.company_description}}</td>
                    <td>{{item.website}}</td>
                    <td>
                    <i class="fa fa-ban" @click="delete_employer"> </i>
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
      employers: []
    }       
  },
  mounted() {
    this.get_all_employers();
  },
  methods: {
    async get_all_employers() {
      try {
        const response = await fetch(`http://localhost:3000/getallemployers`);
        if(!response.ok) throw new AlertError(response.statusText);
        const data = await response.json();
        this.employers = data;
      } catch (err) {
        if(err.name === "AlertError") return alert(err.message);
        console.log(err);
      }
    },
    delete_employer() {

    }
  } 
    
}
</script>

<style lang="scss" scoped>
  .employers {
    overflow-y: scroll;
    width: 100%;
    background-color: #F6FCFF;
    padding: 0 5%;
    h1 {
      font-family: 'Montserrat', sans-serif;
      margin: 2% 0 1% 0;
      font-weight: 700;    
    }
    .employers-table {
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
          margin: 5px 0;
        }
        i { color: #224C84; }
      }
    }
  }
</style>