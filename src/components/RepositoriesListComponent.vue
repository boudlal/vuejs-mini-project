<template>
  <div class="container">
    <div class="container-title">
      <h2>Most strarred repositories</h2>
    </div>
    <div class="row">
    	<div v-for="repo in repositories" class="card col-md-12 p-3">
    	 <div class="row ">
    			<div class="col-md-3">
    				<img class="w-100" :src="repo.user_avatar">
    			</div>
    		<div class="col-md-8">
    			<div class="card-block">
    					<a :href="repo.url"><h3 class="card-title">{{ repo.title }}</h3></a>
    					<p class="card-text text-justify">{{ repo.description }}</p>
    					<a href="https://www.google.com" class="btn btn-default">Stars: {{ repo.stars_num }}</a>
    					<a href="https://www.google.com" class="btn btn-default">Issues: {{ repo.issues_num}}</a>
              <span>Submitted {{ repo.created_at }} days ago by {{ repo.user_name}}</span>
    			</div>
    		</div>
    		</div>
    	</div>
    </div>
    <pulse-loader class="loader" v-show="loading"></pulse-loader>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import PulseLoader  from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    repositories () {
      return this.$store.getters.repositories
    }
  },
  created () {
    this.$store.dispatch('getRepositories', this.pageNumber).then(() => {
      this.loading = false;
    })

  }
}
</script>


<style scoped>
.container {
  min-height: 500px
}

.container-title {
  text-align: left;
  margin: 5px;
  padding: 10px
}

img {
  width: 60%;
}

.row {
  margin: 0px;
}

.card-title {
  text-align: left;
  text-transform: uppercase;
	color: #E44424;
}

.card {
  border-radius:0;
  margin:10px auto;
}

.card-block {
  text-align: left;
}

.card-text {
	margin-top:10px;
	margin-bottom: 10px;
	background-color:#FFFFFF;
	color:#000000;
}

a.btn, a.btn:visited {
  color:#333333;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.loader {
  margin: 10px
}

</style>
