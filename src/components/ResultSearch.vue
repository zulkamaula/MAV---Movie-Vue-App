<template>
  <div>
  <div class="row mt-3 mb-3 body bg-light justify-content-center" style="height: 55vmax">
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
          <h8 class="fw-bold col-12 pb-2">
            Search result is here
          </h8>
          <div class="col-12 scroll-horizontal rounded">
            <div class="row itemscroll gap-2" v-for="lm in ListMovie" :key="lm.title">
              <div class="col-sm-10 col-lg-3">
                <img :src="lm.Poster" class="mx-auto card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ lm.Title }}</h5>
                <div class="d-grid">
                  <button class="btn btn-sm btn-danger" type="button" @click="viewMovie(lm.imdbID)">View</button>
              
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
  import Swal from 'sweetalert2/dist/sweetalert2.js'
  import 'sweetalert2/src/sweetalert2.scss'

  export default {
    data(){
      return {
        ListMovie: {},
        Movie: {},
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
      },
      viewMovie(id){
        let API_URL = `${env.url}?i=${id}&apikey=${env.apikey}`
        console.log('API_URL => ', API_URL)
        axios
          .get(API_URL, {
            headers: {
            "content-type" : "application/json"
            }
          })
          .then((res) => {
            console.log('ini isi res api film => ', res)
            this.Movie = res.data;
            Swal.fire({
              title: 'success!',
              width: 600,
              confirmButtonText: 'Close',
              title: `${this.Movie.Title} (${this.Movie.Year})`,
              html: `
<div class="container">
<div class="row fst-italic">
  Sinopsis : ${this.Movie.Plot}
</div>

<br /> 
<div class="row">
                  <div class="col text-start">
                    Released : ${ this.Movie.Released }
                    <br />
                    Rated : ${ this.Movie.Rated }
                  </div>
                  <div class="col text-end">
                    <i class="fa fa-star text-warning"></i> ${ this.Movie.imdbRating } - IMDb Rating
                  <br />  
                     (${ this.Movie.imdbVotes } Votes)
                  </div>
                </div>
                <div class="row m-1">
                  <div class="col">
                    Genre : ${ this.Movie.Genre }
                  </div>
                </div>
</div>`,
              imageUrl: this.Movie.Poster,
              imageHeight: 400,
            })
          })
          .catch((error) => {
            const info = error.response;
            console.log('ini info error nya : ', info);
            Swal.fire({
              title: 'Error!',
              text: 'Do you want to continue?',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      }
    }
  }
</script>