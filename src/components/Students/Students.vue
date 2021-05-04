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
          </tr>
          <tr>
            <td>Иванов</td>
            <td>Иван</td>
            <td>Иванович</td>
            <td>Факультет фундаментальной и прикладной информатики</td>
            <td>Информационные системы и технологии</td>
            <td>17-06-0000</td>
            <td><div class="status">Одобрен</div></td>
          </tr>
          <tr>
            <td>Иванов</td>
            <td>Иван</td>
            <td>Иванович</td>
            <td>Факультет фундаментальной и прикладной информатики</td>
            <td>Информационные системы и технологии</td>
            <td>17-06-0000</td>
            <td><div class="status">Нерассмотрен</div></td>
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
        }
      }
    }
  }
</style>