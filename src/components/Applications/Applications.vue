<template>
  <div class="applications">
      <h1>Заявки</h1>
      <div class="applications-table">
        <table>
          <tr>
            <th>Название вакансии</th>
            <th>Компания</th>
            <th>Статус</th>
            <th>Комментарий</th>
          </tr>
          <tr>
            <td>Peter</td>
            <td>Griffin</td>
            <td><div class="status">Принята</div></td>
            <td>Griffin</td>
          </tr>
          <tr>
            <td>Lois</td>
            <td>Griffin</td>
            <td><div class="status">В процессе</div></td>
            <td>Griffin</td>
          </tr>
          <tr>
            <td>Joe</td>
            <td>Swanson</td>
            <td><div class="status">Отклонена</div></td>
            <td>Griffin</td>
          </tr>
          <tr>
            <td>Cleveland</td>
            <td>Brown</td>
            <td>$250</td>
            <td>Griffin</td>
          </tr>
        </table>
      </div>
  </div>
</template>

<script>
export default {

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
      }
    }
  }
</style>