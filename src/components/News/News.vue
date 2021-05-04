<template>
  <div class="news-container">
       <h1>Новости</h1>
        <NewsItem />
  </div>
</template>

<script>
import NewsItem from './NewsItem.vue';
export default {
    components: {
        NewsItem
    }
}
</script>

<style lang="scss" scoped>
    .news-container {
        overflow-y: scroll;
        width: 100%;
        background-color: #F6FCFF;
        padding: 0 5%;
        h1 {
            font-family: 'Montserrat', sans-serif;
            margin: 2% 0 1% 0;
            font-weight: 700;    
        }
    }
</style>