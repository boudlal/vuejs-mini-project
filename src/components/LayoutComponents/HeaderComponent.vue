<template>
  <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href=""><img src=""/>MY LOGO</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul v-if="userIsAuthenticated" class="nav navbar-nav navbar-right">
                    <li><a href="#" v-on:click.prevent="onLogout()">Logout</a></li>
                </ul>
                <ul v-if="!userIsAuthenticated" class="nav navbar-nav navbar-right">
                    <li><router-link :to="{ name: 'SignUp'}">Sign Up</router-link></li>
                    <li><router-link :to="{ name: 'SignIn'}">Sign In</router-link></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
    </nav>
</template>

<script>
export default {
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      return this.$router.push('/signin')
    }
  }
}
</script>

<style lang="css" scoped>
.navbar {
  background-color: #ecf0f1
}
</style>
