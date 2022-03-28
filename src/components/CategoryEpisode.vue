<template>
  <div>
  <div class="row mt-3 mb-3 body bg-light justify-content-center text-center" style="height: 55vmax">
      <div class="col-11 align-self-center">
        <div class="row text-start">
          <h6 class="col text-dark fw-bold">
            Episode List
          </h6>
        </div>
        <div class="row">
          <div class="col scroll-horizontal rounded">
            <div class="row text-center justify-content-center itemscroll gap-2" v-for="lm in ListMovie" :key="lm.title">
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
        </div>
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
        Movie: {}
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
            console.log('ini isi res api film => ', res)
            this.ListMovie = res.data.Search
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