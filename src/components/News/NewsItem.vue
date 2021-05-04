<template>
  <div class="news-item">
    <div class="news-header">
        <h3>Название новости</h3>
        <h4>17.04.2021</h4>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>
    <div class="news-more">Подробнее >></div> 
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .news-item {
        margin: 15px 0;
        background-color: #ffffff;
        padding: 20px 40px;
        .news-header {
           display: flex;
           flex-direction: row;
           justify-content: space-between;
           h3 {
                font-family: 'Montserrat', sans-serif;
                color: #224C84;
                margin: 0 0 10px 0;
                font-weight: 700;
                font-size: 22px;
           }
           h4 {
               font-family: 'Raleway', sans-serif;
               color: #224C84;
               font-size: 20px;
           } 
        }
        p {
            font-family: 'Raleway', sans-serif;
        }
        .news-more {
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            margin-top: 15px;
        }
    }
</style>