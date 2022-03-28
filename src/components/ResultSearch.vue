<template>
  <div>
  <div class="row mt-3 mb-3 pt-2 body bg-light justify-content-center" style="height: 45vmax">
      <div class="col-11 align-self-center">

        <span v-if="load == true">
          <span class="spinner-border text-secondary" role="status">
         </span> Loading..
        </span>

        <span v-else>
          <span v-if="key.length === 0">
        <div class="row justify-content-center text-center h-50 bg-light">
          <div class="col-10 p-3">
           <h5 class="text-danger fw-bold">
             Keyword tidak boleh kosong!
           </h5>
          </div>
        </div>
          </span>

          <span class="row text-center" v-else>
          <h8 class="text-dark fw-bold col-12">
            Search result is here
          </h8>
          <div class="col-12 scroll-horizontal rounded">
            <div class="row itemscroll gap-2" v-for="lm in ListMovie" :key="lm.title">
              <div class="col-sm-10 col-lg-3">
                <img :src="lm.Poster" class="mx-auto card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ lm.Title }}</h5>
                <div class="d-grid">
                  <button class="btn btn-sm btn-danger" type="button">View</button>
              
              </div>
            </div>
            </div>
          </div>
          </div>
        </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import env from '../env.js'

  export default {
    data(){
      return {
        ListMovie: {},
        load: false,
        key: this.$store.state.keywords
      }
    },
    created(){
      this.fetchMovies(this.key);
    },
    methods: {
      fetchMovies(key){
        this.load = true;

        let API_URL = `${env.url}?s=${key}&apikey=${env.apikey}`
        console.log('API_URL => ', API_URL)
        
        axios
          .get(API_URL, {
            headers: {
            "content-type" : "application/json"
            }
          })
          .then((res) => {
            console.log('ini isi res api film => ', res);
            this.load = false;
            this.ListMovie = res.data.Search;
             this.$store.state.keywords = '';
          })
          .catch((error) => {
            const info = error.response;
            console.log('ini info error nya : ', info);
          })
      }
    }
  }
</script>