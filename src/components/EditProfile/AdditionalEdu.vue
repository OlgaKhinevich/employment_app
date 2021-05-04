<template>
    <div class="additional-edu">
        <label>Тип</label>
        <select class="edu-type">
            <option>Пункт 1</option>
            <option>Пункт 2</option>
        </select><br>
        <label>Название</label>
        <input v-model="company_name" type="text" placeholder="Название" /><br>
        <label>Место</label>
        <input v-model="company_name" type="text" placeholder="Место" /><br>
        <label class="date-label">Год окончания</label>
        <select>
            <option>Пункт 1</option>
            <option>Пункт 2</option>
        </select><br> 
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .additional-edu {
        font-family: 'Raleway', sans-serif;
        font-size: 15px;
        select, input {
            outline: none;
            background-color: #F1F2F2;
            border: 1px solid #425359;
            border-radius: 5px;
            padding-left: 7px;
            height: 30px;
            margin-bottom: 10px;
            font-size: 14px;
        }
        select { width: 90px; }
        input { 
            width: 390px;
            &:focus {
            border: 1.5px solid #2195AE;
            border-radius: 5px;
            background-color: #FFFFFF;
            outline: none; 
            }
            &::-webkit-input-placeholder {
            color: black; 
            transition: 0.5s;
            }
        }
        label {
            display: inline-block;
            width: 130px;
        }
        .date-label {
            display: inline-block;
            width: 20px;
        }
        .edu-type { width: 200px; }         
    }
</style>