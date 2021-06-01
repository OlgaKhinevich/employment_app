<template>
     <div v-if="show" class="modal-shadow">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                    <label>Сопроводительное письмо</label><br>
                    <textarea v-model="reason" type="text" placeholder="Сопроводительное письмо"></textarea>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button" @click="close_modal">
                        Отмена
                    </button>
                    <button class="modal-footer__button" @click="add_application">
                        Отправить
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import json_fetch from '../../lib/json_fetch';
    import AlertError from '../../../lib/alert_error';

    export default {
        props: ['company_info'],
        data: function () {
            return {
                show: true,
                reason: '',
                cover_letter: ''
            }
        },
        computed:{
            user_vacancy(){
                return this.$store.state.vacancy;
            }
        },
        methods: {
            close_modal() {
                this.show = false
            },
            async add_application() {
                try {
                    console.log(this.company_info);
                    const response = await json_fetch('http://localhost:3000/addapplication', {
                        position: this.user_vacancy.position, 
                        company_name: this.company_info.company_name,
                        status: "в процессе",
                        cover_letter: this.cover_letter     
                    }) 
                    if(!response.ok) throw new AlertError(response.statusText);
                    console.log("Заявка отправлена!");
                } catch (err) {
                    if(err.name === "AlertError") return alert(err.message);
                    console.log(err);
                }
            }
        }
    }
</script>
 
<style scoped lang="scss">
    .modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }
 
    .modal {
        background: #fff;
        border-radius: 8px;
        padding: 15px;
        min-width: 500px;
        max-width: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .modal-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 10px;
            label, textarea { 
                font-family: 'Raleway', sans-serif;
            }
        }
 
        &-close {
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
 
        &-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            color: #000000;
        }

        h4 {
            font-family: 'Montserrat', sans-serif;
            color: #224C84;
            margin: 5px 0 10px 0;
            font-weight: 700;
            font-size: 16px;
        }
 
        &-content {
            margin-bottom: 20px
        }
 
        &-footer {
            display: flex;
            justify-content: center;
            &__button {
                background-color: #0C3B7A;
                color: #fff;
                border: none;
                text-align: center;
                padding: 8px;
                font-size: 17px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
                cursor: pointer;
                margin-right: 10px;
                font-family: 'Montserrat', sans-serif;
            }
        }
    }
</style>