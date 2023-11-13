<template>
<div class="container">
   <div class="input-group my-3">
   <input type="text" class="form-control" v-model="message">
    <button class="btn btn-outline-primary" @click="add()">Add</button>
   </div>
   <ul>
    <li v-for="item in items">{{ item }}</li>
   </ul>
</div>
</template>

<script>
export default {
    data(){
        return {
            message: '',
            items: ['Piim', 'Sai', 'Viin', 'Leib']
        }
    },
    methods: {
        add(){
            if(this.message.trim() !== ''){
            this.items.push(this.message);
            this.message = '';
            }
        }
    }
}
</script>

<style>

</style>