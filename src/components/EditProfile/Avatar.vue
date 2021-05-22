<template>
    <div class="Image-input">
        <div class="Image-input__image-wrapper">
            <i v-show="! imageSrc" class="icon fa fa-picture-o"></i>
            <img v-show="imageSrc" class="Image-input__image" :src="imageSrc">
        </div>

        <div class="Image-input__input-wrapper">
            Добавить фото
            <input @change="previewThumbnail" class="Image-input__input" name="thumbnail" type="file">
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'imageSrc' ],

    methods: {
        previewThumbnail: function(event) {
            var input = event.target;

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var vm = this;

                reader.onload = function(e) {
                    vm.imageSrc = e.target.result;
                }

                reader.readAsDataURL(input.files[0]);
            }
        }
    }
}
</script>

<style>
    .Image-input {
        display: flex;
        flex-direction: column;
    }

    .Image-input__image-wrapper {
        flex-basis: 80%;
        width: 80%; 
        flex: 2.5;
        border-radius: 1px;
        margin-right: 10px;
        overflow-y: hidden;
        border-radius: 1px;
        align-items: center;
        display: flex;
    }

    .Image-input__image-wrapper > .icon {
        color: #ccc;
        font-size: 50px;
        cursor: default;
    }

    .Image-input__image {
        max-width: 90%;
        border-radius: 1px;
    }

    .Image-input__input-wrapper {
        overflow: hidden;
        position: relative;
        background: #74A5EE;
        margin-top: 10px;
        float: left;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        width: 160px;
        font-family: 'Montserrat', sans-serif;
        border-radius: 7px;
        color: white;
        padding: 4px 0;
        font-weight: 700;
    }
    
    .Image-input__input {
        cursor: inherit;
        display: block;
        font-size: 999px;
        min-height: 100%;
        opacity: 0;
        position: absolute;
        right: 0;
        text-align: right;
        top: 0;
        cursor: pointer;
    }
</style>