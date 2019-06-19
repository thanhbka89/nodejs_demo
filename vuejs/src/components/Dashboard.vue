<template>
  <div class="hello">
    <h2>Welcome to regular user's page</h2>
    <h3>{{msg}}</h3>
    <ul>
      <li>
        <router-link to="/register">Add user</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'DASHBOARD'
    }
  }
}
</script>