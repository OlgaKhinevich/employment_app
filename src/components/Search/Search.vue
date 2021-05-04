<template>
  <div class="search-container">
    <div class="search-header">
      <h1>Поиск</h1>
      <button>Предложить вакансию</button>
    </div>
    <div class="search-filter">
      <h4>Фильтр</h4>
      <div class="filter-content">
        <div class="left-column">
          <label>Профессиональная область </label>  
          <select>
            <option>Пункт 1</option>
            <option>Пункт 2</option>
          </select><br>
          <label>Город </label>  
          <select>
            <option>Пункт 1</option>
            <option>Пункт 2</option>
          </select><br>
            <label>График работы </label>
            <select>
              <option>Пункт 1</option>
              <option>Пункт 2</option>
            </select><br>
            <label>Навыки </label><br>
            <textarea v-model="company_description" placeholder="Описание личных качеств"></textarea>
        </div>
        <div class="right-column">
            <label>Тип занятости </label>
            <select>
              <option>Пункт 1</option>
              <option>Пункт 2</option>
            </select><br>
            <label>График работы </label>
            <select>
              <option>Пункт 1</option>
              <option>Пункт 2</option>
            </select><br>
            <label>Зарплата (руб.) </label><br>
            <input v-model="company_name" type="range" min="0" max="100000" step="1000"/>
            <div class="buttons">
              <button class="search-btn">Найти</button>
              <button class="clear-btn">Очистить</button>
            </div>
        </div>
      </div>
    </div>
    <div class="search-results-container">
      <SearchResult />
    </div>
  </div>
</template>

<script>
import SearchResult from './SearchResult.vue';
export default {
  components: {
    SearchResult
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
        textarea, input, select {   
          outline: none;
          background-color: #F1F2F2;
          border: 1px solid #425359;
          border-radius: 5px;
          padding-left: 7px;
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
    }
  }
</style>