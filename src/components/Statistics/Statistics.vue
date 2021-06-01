<template>
  <div class="statistics">
      <h1>Статистика</h1>
      <div class="statistics-content">
        <div id="pie-content">
            <h5>Соотношение студентов и работодателей в системе</h5>
              <canvas ref="piechart" width="450"></canvas>
            <p>Количество работодателей в системе: {{this.statistics[0]}}</p>
            <p>Количество студентов в системе: {{this.statistics[1]}}</p>
        </div>
        <div id="pie-content2">
            <h5>Соотношение вакансий в системе</h5>
              <canvas ref="piechart2" width="450"></canvas>
            <p>Всего вакансий в системе: {{this.vacancies.length}}</p>
            <p>Открытых вакансий в системе: 2</p>
            <p>Закрытых вакансий в системе: 1</p>
            <p>Всего заявок на вакансии: 2</p>
            <p>Принятых заявок на вакансии: 1</p>
            <p>Отклоненных заявок на вакансии: 1</p>
            <p>На рассмотрении заявок на вакансии: 0</p>
        </div>
      </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import AlertError from '../../../lib/alert_error';
import json_fetch from '../../lib/json_fetch';

export default {
  data(){
    return {
      statistics: [],
      vacancies: []
    }
  },
  mounted() {
      this.get_statistics();
      this.get_all_vacancies();
  },
  methods: {
    async get_statistics() {
      try {
        const response = await fetch(`http://localhost:3000/getstatistics`);
        if(!response.ok) throw new AlertError(response.statusText);
        const data = await response.json();
        this.statistics = data;
        this.draw_pie_chart();
      } catch (err) {
        if(err.name === "AlertError") return alert(err.message);
        console.log(err);
      }
    },
    draw_pie_chart() {
      var chart = this.$refs.piechart;
      var ctx = chart.getContext("2d");
      var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ["Работодатели", "Студенты"],
              datasets: [{
                  label: '# of Votes',
                  data: this.statistics,
                  backgroundColor: [
                      '#74A5EE',
                      '#2195AE'  
                  ]
              }]
          },
          options: {
            responsive: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Колиество студентов и работодателей в системе'
              }
            }
          },
      });
    }, 
  draw_pie_chartt() {
      var chart = this.$refs.piechart2;
      var ctx = chart.getContext("2d");
      var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ["Открытые вакансии", "Закрытые вакансии"],
              datasets: [{
                  label: '# of Votes',
                  data: [2, 1],
                  backgroundColor: [
                      '#74A5EE',
                      '#2195AE'  
                  ]
              }]
          },
          options: {
            responsive: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Колиество студентов и работодателей в системе'
              }
            }
          },
      });
    },
    async get_all_vacancies() {
      try {
        const response = await json_fetch(`http://localhost:3000/getallvacancies`);
        if(!response.ok) throw new AlertError(response.statusText);
        const data = await response.json();
        console.log(data);
        this.vacancies = data;
        this.draw_pie_chartt();
      } catch (err) {
        if(err.name === "AlertError") return alert(err.message);
        console.log(err);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .statistics {
    overflow-y: scroll;
    width: 100%;
    background-color: #F6FCFF;
    padding: 0 5%;
    h1 {
      font-family: 'Montserrat', sans-serif;
      margin: 2% 0 1% 0;
      font-weight: 700;    
    }
    .statistics-content {
      display: flex;
    
    h5 {
      font-size: 16px;
      font-family: 'Raleway', sans-serif;
      margin: 0 0 10px 0;
    }
    #app {
        font-family: 'Raleway', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 60px 0;
        #pie-content, #pie-content2 {
          margin: auto;   
          background-color: #FFFFFF;
          padding: 20px; 
          p {
            font-family: 'Raleway', sans-serif;
            margin-top: 5px;
          }  
        } 
    }
    }
  }

</style>