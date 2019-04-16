<template>
   <div class="container">
      <div class="panel panel-primary">
         <div class="panel-heading">
            <h3 class="panel-title">Add User</h3>
         </div>
         <div class="panel-body">
            <form>
               <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" placeholder="Name" v-model="name">
               </div>
               <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" placeholder="Email" v-model="email">
               </div>
               <button type="submit" class="btn btn-primary">Submit</button>
            </form>
         </div>
      </div>
      <div class="panel panel-success">
         <div class="panel-body">
            My Name is : {{ name }}
            <br>
            My Email is : {{ email }}
         </div>
      </div>
   </div>
</template>

<script>
   export default {

   data () {
      return {
           name: '',
           email: ''
      }
   }
}
</script>