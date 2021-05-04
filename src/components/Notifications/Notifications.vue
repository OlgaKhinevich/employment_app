<template>
  <div class="notifications">
    <h1>Уведомления</h1>
    <Notification />
  </div>
</template>

<script>
import Notification from './Notification.vue';

export default {
   components: {
      Notification
  }
}
</script>

<style lang="scss" scoped>
    .notifications {
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