<template>
  <div>
  <div class="row mt-3 mb-3 pt-2 body bg-light justify-content-center" style="height: 45vmax">
      <div class="col-11 align-self-center">
        <div class="row text-start">
          <h6 class="text-dark fw-bold">
            Episode List
          </h6>
          
          <div class="scroll-horizontal rounded">
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
        </div>
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
        ListMovie: {}
      }
    },
    created(){
      this.fetchMovies('episode');  
    },
    methods: {
      fetchMovies(cat){
        let API_URL = `${env.url}?s=${cat}&apikey=${env.apikey}`
        console.log('API_URL => ', API_URL)
        axios
          .get(API_URL, {
            headers: {
            "content-type" : "application/json"
            }
          })
          .then((res) => {
            console.log('ini isi res api film => ', res.data.Search)
            this.ListMovie = res.data.Search
          })
          .catch((error) => {
            const info = error.response;
            console.log('ini info error nya : ', info);
          })
      }
    }
  }
</script>