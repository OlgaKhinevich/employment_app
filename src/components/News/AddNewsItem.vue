<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <div class="modal-close" @click="closeModal">&#10006;</div>
            <slot name="title">
                <h2 class="modal-title">Добавить новостное объявление</h2>
            </slot>
            <slot name="body">
                <div class="modal-content">
                    <label>Заголовок новостного объявления: </label><input v-model="news_title" type="text" placeholder="Заголовок" /><br>
                    <textarea v-model="news_text" placeholder="Текст объявления"></textarea>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button" @click="add_news_item">
                        Добавить
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "ModalWindow",
        data: function () {
            return {
                news_title: '',
                news_text: '',
                show: false
            }
        },
        methods: {
            async addNewsItem() {
                if(!news_title || !news_text) throw new Error("Empty field!");
                if(response.status !== 200) throw new Error(response.statusText);
                const response = await fetch('http://localhost:4000/signup', {
                        news_title: this.news_title,
                        name: this.news_text            
                })  
                this.show = false;
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
            &__button {
                background-color: #0971c7;
                color: #fff;
                border: none;
                text-align: center;
                padding: 8px;
                font-size: 17px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
            }
        }
    }
</style>