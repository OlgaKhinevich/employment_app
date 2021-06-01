<template>
  <div class="applications">
      <h1>Заявки</h1>
      <div class="applications-table">
        <table>
          <tr>
            <th>Должность</th>
            <th>Студент</th>
            <th>Сопроводительное письмо</th>
            <th>Статус</th>
            <th></th>
          </tr>
          <tr v-for="(item, index) in applications" :key="index" :data-index="index">
            <td>{{item.position}}</td>
            <td><a href="/profile">{{item.surname}}  {{item.name}}  {{item.patronymic}}</a></td>
            <td>{{item.cover_letter}}</td>
            <td><div class="status">{{item.status}}</div></td>
            <td v-if="item.status == 'в процессе'">
              <i class="fa fa-check" @click="open_accept_modal"></i>
              <i class="fa fa-ban" @click="open_reject_modal"> </i>
            </td>   
          </tr>
        </table>
      </div>

      <accept-modal :application_id="application_id" v-if="is_accept_modal_visible"  ></accept-modal>
      <reject-modal :application_id="application_id" v-if="is_reject_modal_visible"  ></reject-modal>
  </div>
</template>

<script>
import AlertError from '../../../lib/alert_error';
import AcceptModal from './AcceptModal.vue';
import RejectModal from './RejectModal.vue';

export default {
  data() {
    return {
      applications: [],
      is_accept_modal_visible: false,
      is_reject_modal_visible: false,
      application_id: ''
    }       
  },
  components: {
    "accept-modal": AcceptModal,
    "reject-modal": RejectModal
  },
  mounted() {
    this.get_applications();
  },
  methods: {
    async get_applications() {
       try {
        const response = await fetch(`http://localhost:3000/getapplications`);
        if(!response.ok) throw new AlertError(response.statusText);
        const data = await response.json();
        this.applications = data;
      } catch (err) {
        if(err.name === "AlertError") return alert(err.message);
        console.log(err);
      }
    },
    open_accept_modal(e) {
      const row = e.target.closest('tr');
      const index = row.dataset.index;
      this.application_id = this.applications[index]._id;
      console.log(this.applications[index]._id);
      this.is_accept_modal_visible = true;
    },
    open_reject_modal(e) {
      const row = e.target.closest('tr');
      const index = row.dataset.index;
      this.application_id = this.applications[index]._id;
      this.is_reject_modal_visible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/mixins';
  @import '../../styles/variables';

  .applications {
    @include container;
    padding: 0 5%;
    h1 {
      font-family: 'Montserrat', sans-serif;
      margin: 2% 0 1% 0;
      font-weight: 700;    
    }
    .applications-table {
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
          width: 100px;
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