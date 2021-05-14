<template>
    <div class="authorization">    
        <div v-if="auth_mode=='signin'"  class="authorization-sidebar-signin">
            <h1>СОЗДАТЬ АККАУНТ</h1>
            <p>Присоединитесь к системе, которая помогает трудоустроиться молодым специалистам</p>
            <button @click="switch_mode" data-mode="signup_main">Регистрация</button>
        </div>
        
        <div class="authorization-form">
            <img class="logo" src="/dist/img/logo.svg"/>
            <h1 v-if="auth_mode=='signin'">Вход в систему</h1>
            <h1 v-if="['signup_main', 'signup_edu', 'signup_company'].includes(auth_mode)">Регистрация</h1>

            <template v-if="auth_mode=='signin'">
                <select v-model="signin.signin_mode" class="user">
                    <option disabled value="">Режим входа</option>
                    <option value="employer">Работодатель</option>
                    <option value="student">Студент</option>
                    <option value="admin">Администратор</option>
                </select>
                <input  v-model="signin.email" type="text" placeholder="Email адрес" class="user" />
                <input  v-model="signin.password" type="password" placeholder="Пароль" class="password" />
                <button @click="signin_click">Вход</button> 
            </template>

            <template v-if="auth_mode=='signup_main'">
                <input v-model="signup.surname" type="text" placeholder="Фамилия" class="user" />
                <input v-model="signup.name" type="text" placeholder="Имя" class="user" />
                <input v-model="signup.patronymic" type="text" placeholder="Отчество" class="user" />
                <input v-model="signup.email" type="text" placeholder="Email адрес" class="contact" />
                <input v-model="signup.password" type="password" placeholder="Пароль" class="password" />
                <input v-model="signup.repeat_password" type="password" placeholder="Повторите пароль" class="password" />
                <div class="showMore" @click="switch_mode" data-mode="signup_edu">Далее >></div>
            </template>

            <div v-if="['signup_edu', 'signup_company'].includes(auth_mode)">
                <input type="radio" id="student" value="signup_edu" v-model="auth_mode">
                <label for="student">Я студент</label>
                <input type="radio" id="company" value="signup_company" v-model="auth_mode">
                <label for="company">Я работодатель</label>
            </div>

            <template v-if="auth_mode=='signup_edu'">
                <select v-model="signup.faculty" class="edu">
                    <option disabled value="">Факультет</option>
                    <option>ФГУиМО</option>
                    <option>ЕНФ</option>
                    <option>ФЛМК</option>
                    <option>МТФ</option>
                    <option>ФСА</option>
                    <option>ФФиПИ</option>
                    <option>ФЭиМ</option>
                    <option>ЮФ</option>
                </select>
                <input  v-model="signup.profession" type="text" placeholder="Направление подготовки" class="edu" />
                <input  v-model="signup.gradebook_number" type="text" placeholder="Номер зачетной книжки" class="edu" />  
            </template>
            
            <template v-if="auth_mode=='signup_company'">
                <input  v-model="signup.company_name" type="text" placeholder="Название компании" class="company" />
                <select v-model="signup.company_direction" class="company">
                    <option disabled value="">Сфера деятельности</option>
                    <option>Энергетика</option>
                </select>
                <textarea v-model="signup.company_description" placeholder="Описание компании" class="company"></textarea>
                <input  v-model="signup.company_url" type="text" placeholder="Веб-сайт" class="web" />
            </template>

            <template v-if="['signup_edu', 'signup_company'].includes(auth_mode)">
                <button @click="signup_click">Регистрация</button>
            </template>
            
        </div>

        <div v-if="auth_mode!=='signin'" class="authorization-sidebar-signup">
            <h1>ВОЙТИ В СИСТЕМУ</h1>
            <p>Введите логин и пароль, чтобы снова войти в систему</p>
            <button @click="switch_mode" data-mode="signin">Вход</button>
        </div>
        
        <modal-window v-if="is_auth_modal_visible">
            <template v-slot:modal_content>
                {{auth_modal_text}}
            </template>
        </modal-window>
    </div>
</template>

<script>
    import AlertError from '../../../lib/alert_error';
    import ModalWindow from '../Modal/ModalWindow.vue';
    import json_fetch from '../../lib/json_fetch';

    export default {
        data() {
            return {
                is_auth_modal_visible: false,
                auth_modal_text: "",
                auth_mode: "signin",
                signin: {
                    signin_mode: "",
                    email: "ivan@list.ru",
                    password: "12345678"
                },
                signup: {
                    surname: "Иванов",
                    name: "Иван",
                    patronymic: "Иванович",
                    email: "ivan@list.ru",
                    password: "12345678",
                    repeat_password: "12345678",
                    faculty: "ФФиПИ",
                    profession: "Экономика",
                    gradebook_number: "17-06-0000",
                    company_name: "Компания",
                    company_description: "описание",
                    company_url: "www.company.ru",
                    company_direction: "Энергетика"
                },
                
            }
        },
        components: {
           "modal-window" : ModalWindow
        },
        mounted() {
            this.$store.commit("setVisibility", false);
        },
        methods: {
            switch_mode({target}) {
                this.auth_mode = target.dataset.mode;
            },
            async signin_click() {
                try {
                    if(!this.signin.email || !this.signin.password) throw new Error("Empty field!");
                    const response = await json_fetch('http://localhost:3000/signin', {
                        email: this.signin.email,
                        password: this.signin.password,
                        mode: this.signin.signin_mode
                    })
                   console.log(response);
                    this.$router.push("/profile");
                    if(!response.ok) throw new Error(response.statusText);
                } catch(err) {
                    console.log(err);
                }
            },

            async signup_click() {
                try {
                    if(this.auth_mode === "signup_edu") await this.signup_student();
                    else await this.signup_employer();

                } catch(err) {
                    if(err.name === "AlertError") alert(err.message);
                    console.log(err);
                }
            },
            
            async signup_student() {
                try {
                const {surname, name, patronymic, email, password, repeat_password, faculty, profession,
                gradebook_number} = this.signup;
                if(!surname || !name || !patronymic || !email || !password || !faculty ||
                !profession || !gradebook_number) throw new AlertError("Пожалуйста, заполните все поля!");
                if(password.length < 6 || password.length > 20) throw new AlertError("Длина пароля должна быть больше 6 символов, но меньше 20!");
                if(password !== repeat_password) throw new AlertError("Пароли не совпадают!");
                if(!email.includes("@")) throw new AlertError ("Неправильный формат email!");
                const response = await json_fetch('http://localhost:3000/signup', {
                    signup_type: "student", surname, name, patronymic, email, password, faculty, profession, gradebook_number     
                });
                if(!response.ok) throw new AlertError(response.statusText); 
                this.auth_modal_text = `Ваша заявка отправлена на рассмотрение администратору. 
                                        Рассмотрение заявки может заняь несколько дней. 
                                        Вам придет письмо на email-адрес с ответом.`;
                this.is_auth_modal_visible = true;
                }
                catch(err){
                    if(err.name === "AlertError") alert(err.message);
                    console.log(err);
                } 
            },
            async signup_employer() {
                try{
                    const {surname, name, patronymic, email, password, repeat_password, company_name, company_direction,
                    company_description, company_url} = this.signup;
                    if(!surname || !name || !patronymic || !email || !password || !company_name || 
                    !company_direction || !company_description || !company_url) throw new AlertError("Пожалуйста, заполните все поля!"); 
                    if(password.length < 6 || password.length > 20) throw new AlertError("Длина пароля должна быть больше 6 символов, но меньше 20!");
                    if(password !== repeat_password) throw new AlertError("Пароли не совпадают!");
                    if(!email.includes("@")) throw new AlertError("Неправильный формат email!");
                    const response = await json_fetch('http://localhost:3000/signup', {
                        signup_type: "employer", surname, name, patronymic, email, password, company_name, 
                        company_direction, company_description, company_url            
                    });
                    if(!response.ok) throw new AlertError(response.statusText);  
                    this.auth_modal_text = `Регистрация прошла успешно!`;
                    this.is_auth_modal_visible = true;
                }
                catch(err){
                    if(err.name === "AlertError") alert(err.message);
                    console.log(err);
                }
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
    @import '../../styles/mixins';
    @import '../../styles/variables';

    .authorization {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: row;
            .authorization-sidebar-signin, .authorization-sidebar-signup {
            width: 35%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-color: $primary-color;
            color: white; 
            h1 { @include title_h1; }
            p { 
                margin: 10px 20px;
                font-family: $second-font;
                font-size: 15px;
            }
                button { @include blue_btn; }
            } 
        }
        .authorization-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 65%;
            .logo {
                height: 4%;
                margin-bottom: 15px;
            }
            textarea, input, select{
                border: 1px solid #425359;
                border-radius: 7px;
                padding-left: 7px;
                transition: 0.5s;
                margin-bottom: 9px;
                padding: 5px 5px 5px 40px;
                width: 350px;
                height: 50px;
                font-family: $second-font; 
            }
            input, select {
                height: 44px;
                &:focus {
                border: 1.5px solid #2195AE;
                border-radius: 7px;
                background-color: #FFFFFF;
                font-size: 14px;
                outline: none;
                background-size: 30px auto;
                background-position: 5px center;
                    &::placeholder { 
                        font-size: 10px; 
                        transform: translateY(-13px); 
                    }
                }
            }
            .user { 
                background: url(/dist/img/person-icon.svg) no-repeat; 
                background-size: 30px auto;
                background-position: 5px center;
            }
            .password {
                background: url(/dist/img/password-icon.svg) no-repeat; 
                background-size: 30px auto;
                background-position: 5px center;
            }
            .contact {
                background: url(/dist/img/contact-icon.svg) no-repeat; 
                background-size: 30px auto;
                background-position: 5px center;
            }
            .web {
                background: url(/dist/img/web-icon.svg) no-repeat; 
                background-size: 30px auto;
                background-position: 5px center;
            }
            .edu {
                background: url(/dist/img/edu-icon.svg) no-repeat; 
                background-size: 30px auto;
                background-position: 5px center;
            }
            .company {
                background: url(/dist/img/edu-icon.svg) no-repeat; 
                background-size: 30px auto;
                background-position: 5px center;
            }
            select {
                color: black; 
                font-size: 14px;
                font-family: $second-font;
                transition: 0.5s;
            }
            textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
                color: black; 
                font-size: 14px;
                font-family: $second-font;
                transition: 0.5s;
            }
            input[type="radio"] {
                height: 12px;
                width: 12px;
                margin-right: 10px;
            }
            h1 {
                font-family: 'Montserrat', sans-serif;
                font-weight: 400;
                font-size: 35px;
                margin: 0 0 15px 0;
                text-align: center;
            }
            button {
               @include active_btn;
            }
        }
    
</style>