<template>
  <div class="add-vacancy">
      <h1>Добавить вакансию</h1>
        <h4>Основная информация</h4>
        <label>Должность </label><input v-model="position" type="text" placeholder="Название должности" /><br>
        <label>Минимальная зарплата </label><input class="salary" v-model="min_salary" type="text" placeholder="Зарплата" /><label>  руб.</label><br>
        <label>Максимальная зарплата </label><input class="salary" v-model="max_salary" type="text" placeholder="Зарплата" /><label>  руб.</label><br>
        <label>Профессиональная область </label>
        <select v-model="professional_field">
            <option>Любая</option>
            <option>IT, Интернет</option>
            <option>Бухгалтерия, финансы</option>
            <option>Реклама, маркетинг</option>
            <option>Административный персонал</option>
            <option>Банки, инвестиции</option>
            <option>Управление персоналом</option>
            <option>Автобизнес</option>
            <option>Безопасность</option>
            <option>Производство</option>
            <option>Искусство, развлечения</option>
            <option>Торговля</option>
            <option>Общепит</option>
            <option>Строительство, недвижимость</option>
            <option>Юриспруденция</option>
            <option>Гос.служба</option>
            <option>Образование</option>
        </select><br>
        <label>Занятость </label>
        <select v-model="employment_type">
            <option>Любая</option>
            <option>Полная занятость</option>
            <option>Частичная занятость</option>
            <option>Проектная работа/разовое задание</option>
            <option>Стажировка</option>
        </select><br>
        <label>График работы </label>
        <select v-model="work_schedule">
            <option>Любой</option>
            <option>Полный день</option>
            <option>Сменный график</option>
            <option>Гибкий график</option>
            <option>Удаленная работа</option>
            <option>Вахтовый метод</option>
        </select><br>
        <label>Город </label><input v-model="city" type="text" placeholder="Город" /><br>
        <label>Адрес </label><input v-model="address" type="text" placeholder="Адрес" /><br>
        <label>Условия работы</label><br>
        <textarea v-model="working_conditions" placeholder="Описание условий работы"></textarea><br>
        <h4>Требования к соискателю</h4>
        <label>Обязанности</label><br>
        <textarea v-model="duties" placeholder="Описание обязанностей"></textarea><br>
        <label>Профессиональные навыки</label><br>
        <div class="professional-skills">
            <label>Тип навыка</label>
            <select v-model="professional_skills.skill_type">
                <option>Навыки работы в программе</option>
                <option>Знание языков программирования</option>
                <option>Знание иностранных языков</option>
                <option>Навыки работы с оргтехникой</option>
            </select><br>
            <label>Название навыка</label>
            <input v-model="professional_skills.skill_name" type="text" placeholder="Название навыка" /><br>
            <label>Уровень владения</label>
            <select v-model="professional_skills.skill_level">
                <option>Начальный уровень</option>
                <option>Средний уровень</option>
                <option>Высокий уровень</option>
            </select><br>
            <button @click="add_professional_skill">Добавить</button> 
        </div>
        <div class="professional-skills-list">
            <p v-for="(item, index) in professional_skills" :key="index" :data-index="index">
                <span>{{item.skill_type}}</span>
                <span>{{item.skill_name}}</span>
                <span>{{item.skill_level}}</span>
                <i class="fa fa-trash set_remove_btn" @click="delete_professional_skill"> </i> 
            </p>    
        </div>
        <label>Личные качества</label><br>
        <textarea v-model="personal_qualities" placeholder="Описание личных качеств"></textarea><br>
        <h4>Дополнительно</h4>
        <textarea v-model="additionally" placeholder="Дополнительная информация"></textarea>
        <h4>Контакты</h4>
        <label>Телефон </label><input v-model="phone_number" type="text" placeholder="Номер телефона" /><br>
        <label>Email </label><input v-model="email" type="text" placeholder="Emai-адрес" /><br>
        <button @click="add_vacancy">Добавить вакансию</button>  
  </div>
</template>

<script>
    import AlertError from '../../../lib/alert_error';
    import json_fetch from '../../lib/json_fetch';

    export default {
        data() {
            return {
                position: "Backend Developer",
                min_salary: 30000,
                max_salary: 35000,
                professional_field: "",
                employment_type: "",
                work_schedule: "",
                city: "Курск",
                address: "ул. Ленина, д.100",
                duties: "Работа в областях web-разработки, мобильной разработки, десктопной разработки, разработки в области data science, проектирования, тестирования и создания ",
                professional_skills: [],
                personal_qualities: "Ответственность, техническое образование (допускается неоконченное), обучаемость, умение работать в команде.",
                working_conditions: "Оформление согласно Трудовому Кодексу РФ. Работа с инновационными технологиями. Система премирования (помимо указанного оклада выплачиваются ежемесячные премии согласно эффективности труда). Полный соц. пакет. Восьмичасовой рабочий день. Перерыв 1 час + два кофе-тайма по 15 минут.",
                additionally: "Приветствуется наличие примеров Ваших проектов.",
                phone_number: "89109007832",
                email: "novatest@mail.ru"
            }       
        },
        methods: {
            async add_vacancy() {
                const { position, min_salary, max_salary, professional_field, employment_type, work_schedule,
                        city, address, duties, professional_skills, personal_qualities, working_conditions,
                        additionally, phone_number, email  } = this;
                    if(!position || !professional_field || !employment_type ||
                    !work_schedule || !duties || !professional_skills || 
                    !personal_qualities || !working_conditions) throw new Error("Пожалуйста, заполните все поля!"); 
                    const response = await json_fetch('http://localhost:3000/addvacancy', {
                        position, min_salary, max_salary, professional_field, employment_type, work_schedule,
                        city, address, duties, professional_skills, personal_qualities, working_conditions,
                        additionally, phone_number, email, status: "открыта"          
                    }) 
                    if(!response.ok) throw new AlertError(response.statusText);  
            },
            add_professional_skill() {
                this.professional_skills.push({
                    skill_type: this.professional_skills.skill_type, 
                    skill_name: this.professional_skills.skill_name,
                    skill_level: this.professional_skills.skill_level
                });
                this.professional_skills.skill_type = '';
                this.professional_skills.skill_name = '';
                this.professional_skills.skill_level = '';
            },
            delete_professional_skill({target}) {
                const is_confirmed = confirm("Вы действительно хотите удалить?");
                if(!is_confirmed) return;
                const delete_index = target.closest("p").dataset.index;
                this.professional_skills.splice(delete_index, 1);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/mixins';
    @import '../../styles/variables';

    .add-vacancy {
        @include container;
        padding: 0 5%;
        h1 { @include title2_h1; }
        h4 { @include title_h4; }
        label {
            @include label_style;
            width: 210px;
        }
        textarea, input, select {   
            outline: none;
            border: 1px solid #425359;
            font-family: 'Raleway', sans-serif;
            border-radius: 5px;
            padding-left: 7px;
            &:focus {
                border: 1.5px solid #2195AE;
                border-radius: 5px;
                background-color: #FFFFFF;
                font-size: 14px;
                outline: none;
            }
        }
        textarea {width: 620px;}
        input, select {
            width: 170px;
            height: 30px;
            margin-bottom: 10px;
            margin-right: 5px;
        }
        .salary {
            width: 80px;
        }
        select {
            color: black; 
            font-size: 14px;
            font-family: 'Raleway', sans-serif;
            transition: 0.5s;
            background-color: #FFFFFF;
        }
        textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
            color: black; 
            font-size: 14px;
            font-family: 'Raleway', sans-serif;
            transition: 0.5s;
        }
        .professional-skills-list {
            font-family: $first-font;
            font-weight: 500;
        }
        i {color: #224C84;}
        button {
            width: 110px;
            height: 30px;
            border-radius: 5px;
            font-size: 14px;
            background: #74A5EE;
            margin: 10px 0 10px 0;
            color: white;
            border: none;
            padding: 4px 0;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
        }
    }
</style>