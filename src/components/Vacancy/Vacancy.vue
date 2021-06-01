<template>
    <div class="vacancy-container">
        <div class="header">
            <h1>{{user_vacancy.position}}  </h1>
            <button @click="open_modal">Откликнуться</button>
        </div>
        <h3>от {{user_vacancy.min_salary}} руб.  до {{user_vacancy.max_salary}} руб.</h3>
        <h4>Основная информация</h4>
        <label>Профессиональная область:</label><p>{{user_vacancy.professional_field}}</p><br>
        <label>Тип занятости:</label><p>{{user_vacancy.employment_type}}</p><br>
        <label>График работы:</label><p>{{user_vacancy.work_schedule}}</p><br>
        <label>Обязанности:</label><p>{{user_vacancy.duties}}</p><br>
        <label>Требуемые профессиональные навыки:</label>
        <p v-for="(item, index) in user_vacancy.professional_skills" :key="index">
            <span>{{item.skill_name}} ({{item.skill_level}}), </span>  
        </p><br>
        <label>Предпочтительные личные качества:</label><p>{{user_vacancy.personal_qualities}}</p><br>
        <label>Условия работы:</label><p>{{user_vacancy.work_conditions}}</p><br>
        <h4>Информация о компании</h4>
        <label>Название:</label><p>{{this.company_info.company_name}}</p><br>
        <label>Сфера деятельности:</label><p>{{this.company_info.company_direction}}</p><br>
        <label>Описание предприятия:</label><p>{{this.company_info.company_description}}</p><br>
        <label>Веб-сайт:</label><p>{{this.company_info.website}}</p><br>
        <h4>Информация о местоположении</h4>
        <label>Город:</label><p>{{user_vacancy.city}}</p><br>
        <label>Адрес:</label><p>{{user_vacancy.address}}</p><br> 
        <h4>Контакты</h4>
        <label>Телефон:</label><p>{{user_vacancy.phone_number}}</p><br>
        <label>Email-адрес:</label><p>{{user_vacancy.email}}</p><br>
        <h4>Дополнительно</h4>
        <p>{{user_vacancy.additionally}}</p><br>

         <modal-window v-if="is_modal_visible" :company_info="company_info"></modal-window>
    </div>
</template>

<script>
import AlertError from '../../../lib/alert_error';
import json_fetch from '../../lib/json_fetch';
import Modal from './Modal.vue';

export default {
    data() {
        return {
            company_info: [],
            is_modal_visible: false
        }
    },
    components: {
        "modal-window": Modal
    },
    computed:{
        user_vacancy(){
            return this.$store.state.vacancy;
        }
    },
    mounted() {
        this.get_company();
    },
    methods: {
        async get_company() {
            try {
                const response = await json_fetch(`http://localhost:3000/getcompany`, {
                    company: this.user_vacancy.company
                });
                if(!response.ok) throw new AlertError(response.statusText);
                const data = await response.json();
                this.company_info = data[0];
                console.log(this.company_info);
            } catch (err) {
                if(err.name === "AlertError") return alert(err.message);
                console.log(err);
            }
        },
        open_modal() {
             this.is_modal_visible = true;
        }
    }
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
        h4 { 
            @include title_h4; 
            font-weight: 700;
            font-size: 18px;
        }
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