<template >
<div class="container" >
  <div v-if="!loading" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
    <div class="panel panel-info">
      <div class="panel-heading">
        <div class="panel-title">Sign In</div>
      </div>

      <div style="padding-top:30px" class="panel-body">

        <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>

        <form id="loginform" class="form-horizontal" role="form">

          <div style="margin-bottom: 25px" class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input v-model="user.email" type="text" class="form-control" placeholder="email">
          </div>

          <div style="margin-bottom: 25px" class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input v-model="user.password" type="password" class="form-control" placeholder="password">
          </div>

          <div v-if="authError" style="margin-bottom: 25px" class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-alert"></i> {{ authError }}</span>
          </div>

          <div v-if="showError" style="margin-bottom: 25px" class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-alert"></i> {{ errorMessage }}</span>
          </div>

          <div style="margin-top:10px" class="form-group">
            <!-- Button -->

            <div class="col-sm-12 controls">
              <a  v-on:click="onSignIn()" class="btn btn-success">Sign In</a>
            </div>
          </div>


          <div class="form-group">
            <div class="col-md-12 control">
              <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%">
                Not a member?
                <router-link :to="{ name: 'SignUp'}">Sign Up Here</router-link>
              </div>
            </div>
          </div>
        </form>



      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        email: null,
        password: null
      },
      authErrors: false,
      errorMessage: null,
      showError: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.user
    },
    authError () {
      return this.$store.getters.authError
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSignIn () {
      if (!this.validateForm()) {
        this.errorMessage = "please fill all inputs"
        return this.showError = true
      }
      this.errors = false
      this.showError = false
      this.$store.dispatch('signIn', this.user)
    },
    validateForm () {
      if (this.user.email === null || this.user.email === undefined || this.user.password === null || this.user.password === undefined) {
          return false
      }
      return true
    }
  },
  watch: {
    currentUser (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    },
    authError (value) {
      if (value !== null && value !== undefined){
        this.authErrors = true
      }
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 670px;
}

.panel-heading {
  background-color: #ecf0f1
}
</style>
