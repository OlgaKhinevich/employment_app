<template>
     <div v-if="show" class="modal-shadow">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                    <label>Комментарий</label><br>
                    <textarea v-model="employer_answer" type="text" placeholder="Комментарий"></textarea>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button" @click="close_modal">
                        Отмена
                    </button>
                    <button class="modal-footer__button" @click="accept_application">
                        Отправить
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import json_fetch from '../../lib/json_fetch';

    export default {
        name: "ModalWindow",
        props: ['application_id'],
        data: function () {
            return {
                show: true,
                employer_answer: ''
            }
        },
        methods: {
            close_modal() {
                this.show = false
            },
            async accept_application() {
                try {
                    const {student_id, application_id, employer_answer} = this;
                    const response = await json_fetch('http://localhost:3000/acceptapplication', {
                        status: "принят", _id: application_id, employer_answer         
                    }) 
                    if(!response.ok) throw new AlertError(response.statusText);
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