<template>
  <div class="students">
      <h1>Студенты</h1>
      <div class="students-table">
        <table>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Факультет</th>
            <th>Направление подготовки</th>
            <th>Номер зачетной книжки</th>
            <th>Статус</th>
            <th></th>
          </tr>
          <tr v-for="(item, index) in students" :key="index" :data-index="index">
            <td>{{item.surname}}</td>
            <td>{{item.name}}</td>
            <td>{{item.patronymic}}</td>
            <td>{{item.basic_edu.higher_edu[0].faculty}}</td>
            <td>{{item.basic_edu.higher_edu[0].profession}}</td>
            <td>{{item.basic_edu.higher_edu[0].gradebook_number}}</td>
            <td><div class="status">{{item.status}}</div></td>
            <td v-if="item.status == 'нерассмотрен'">
              <i class="fa fa-check" @click="accept_student"></i>
              <i class="fa fa-ban" @click="open_ban_modal"> </i>
            </td> 
          </tr>         
        </table>
      </div>

      <ban-modal :email="email" :student_id="student_id" v-if="is_ban_modal_visible"  ></ban-modal>
  </div>
</template>

<script>
import AlertError from '../../../lib/alert_error';
import json_fetch from '../../lib/json_fetch';
import BanModal from './BanModal.vue';

export default {
  data() {
    return {
      is_ban_modal_visible: false,
      ban_modal_text: "",
      students: [],
      email: '',
      student_id: ''
    }       
  },
  components: {
    "ban-modal": BanModal
  },
  mounted() {
    this.get_all_students();
    this.$store.commit("setVisibility", true);
  },
  methods: {
    async get_all_students() {
      try {
        const response = await json_fetch(`http://localhost:3000/students`);
        if(!response.ok) throw new AlertError(response.statusText);
        const data = await response.json();
        this.students = data;
      } catch (err) {
        if(err.name === "AlertError") return alert(err.message);
        console.log(err);
      }
    },
    async accept_student(e) {
      try {
        const row = e.target.closest('tr');
        const index = row.dataset.index;
        const email = this.students[index].email;
        const student_id = this.students[index]._id;
        const response = await json_fetch('http://localhost:3000/acceptstudent', {
          status: "одобрен", _id: student_id, email     
        }) 
        if(response.ok) alert("Уведомление отправлено на почту");
        if(!response.ok) throw new AlertError(response.statusText);
      } catch (err) {
        if(err.name === "AlertError") return alert(err.message);
        console.log(err);
      }
    },
    open_ban_modal(e) {
        const row = e.target.closest('tr');
        const index = row.dataset.index;
        this.email = this.students[index].email;
        this.student_id = this.students[index]._id;
        this.is_ban_modal_visible = true;
    }
  } 
    
}
</script>

<style lang="scss" scoped>
  .students {
    overflow-y: scroll;
    width: 100%;
    background-color: #F6FCFF;
    padding: 0 5%;
    h1 {
      font-family: 'Montserrat', sans-serif;
      margin: 2% 0 1% 0;
      font-weight: 700;    
    }
    .students-table {
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