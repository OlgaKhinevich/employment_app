<template>
    <div class="vacancy-container">
        <div class="header">
            <h1>Администратор  </h1>
            <button>Откликнуться</button>
        </div>
        <h3>от 15000 руб.</h3>
        <h4>Основная информация</h4>
        <label>Профессиональная область:</label><p>Ntrcn</p><br>
        <label>Тип занятости:</label><p>Ntrcn</p><br>
        <label>График работы:</label><p>Ntrcn</p><br>
        <label>Обязанности:</label><p>Ntrcn</p><br>
        <label>Требуемые профессиональные навыки:</label><p>Владение программами, СУБД, языками программирования:</p><br>
        <label>Предпочтительные личные качества:</label><p>Ntrcn</p><br>
        <label>Условия работы:</label><p>Ntrcn</p><br>
        <h4>Информация о компании</h4>
        <label>Название:</label><p>Ntrcn</p><br>
        <label>Сфера деятельности:</label><p>Ntrcn</p><br>
        <label>Описание предприятия:</label><p>Ntrcn</p><br>
        <label>Веб-сайт:</label><p>Ntrcn</p><br>
        <h4>Информация о местоположении</h4>
        <label>Город:</label><p>Ntrcn</p><br>
        <label>Адрес:</label><p>Ntrcn</p><br> 
        <h4>Контакты</h4>
        <label>Телефон:</label><p>Ntrcn</p><br>
        <label>Email-адрес:</label><p>Ntrcn</p><br>
        <h4>Дополнительно</h4>
        <p>Ntrcn</p><br>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @import '../../styles/mixins';
    @import '../../styles/variables';

    .vacancy-container {
        @include container;
        padding: 0 5%;
        .header {
            display: flex;
            flex-direction: row;
            align-items: center;
            h1 { @include title2_h1; }
            button { 
                @include active_btn;
                font-size: 14px;
                margin-left: 20px;
            }
        }
        
        h3 {
            margin: -15px 0 15px 0;
            font-family: $second-font;
            font-size: 25px;
            color: $accent-color;
        }
        h4 { @include title_h4; }
        label { 
            @include label_style;
            width: 300px; 
        }
        p { 
            display: inline-block;
            font-family: $second-font;
            font-weight: 600; 
        }
    }
</style>