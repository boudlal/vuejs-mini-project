<template>
  <div class="container">
    <div class="container-title">
      <h2>Most strarred repositories</h2>
    </div>
    <div class="row">
    	<div v-for="repo in repositories" class="card border col-md-12 p-3">
    	 <div class="row ">
    			<div class="col-md-3">
    				<img class="w-100" :src="repo.user_avatar">
    			</div>
    		<div class="col-md-8">
    			<div class="card-block border">
    					<a :href="repo.url"><h3 class="card-title">{{ repo.title }}</h3></a>
    					<p class="card-text text-justify">{{ repo.description }}</p>
    					<a class="btn btn-default">Stars: {{ repo.stars_num }}</a>
    					<a class="btn btn-default">Issues: {{ repo.issues_num}}</a>
              <span>Submitted {{ repo.created_at }} days ago by <a :href="repo.user_url">{{ repo.user_name}}</a></span>
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
      loading: true,
      pageNumber: 1
    }
  },
  computed: {
    repositories () {
      return this.$store.getters.repositories
    }
  },
  created () {
    //
    this.$store.dispatch('getRepositories', this.pageNumber).then(() => {
      this.loading = false;
    })

    let vm = this;
    //send request to the Api when the scroll is in the bottom of the page
    $(window).scroll(function() {
      if (($(window).innerHeight() + $(window).scrollTop()) >= $("body").height()) {
        if (vm.loading === false) {
          vm.loading = true
          vm.pageNumber++
          vm.$store.dispatch('getRepositories', vm.pageNumber).then(() => {
            vm.loading = false
          })
        }
      }
    });
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
  width: 160px;
  border: 2px solid #cccccc;
  border-radius: 100%;
  padding: 6px;
  background-color: white;
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
  border-radius: 15px;
  margin: 10px auto;
  border: 1px solid #cccccc;
  padding: 15px;
  background-color: #ecf0f1
}

.card-block {
  text-align: left;
}

.card-text {
	margin-top:10px;
	margin-bottom: 10px;
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

@media only screen and (max-width: 600px) {
  .card-block span {
    margin-top: 5px;
    display: block;
  }
}

</style>
