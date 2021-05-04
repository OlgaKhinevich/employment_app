<template>
    <div class="education">
        <label>Название учебного заведения</label>
        <input v-model="company_name" type="text" placeholder="Название" /><br>
        <label class="date-label">Год окончания</label>
        <select>
            <option>Пункт 1</option>
            <option>Пункт 2</option>
        </select><br> 
        <label>Факультет </label><input v-model="company_name" type="text" placeholder="Факультет" /><br>
        <label>Направление подготовки </label><input v-model="company_name" type="text" placeholder="Направление пдготовки" /><br> 
        <label>Уровень образования </label>
        <select class="education-level">
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
    .education {
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
            width: 220px;
        }
        .date-label {
            display: inline-block;
            width: 110px;
        }  
         .education-level { width: 200px; }       
    }
</style>