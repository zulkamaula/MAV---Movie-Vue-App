<template>
  <div class="container-fluid">
    <div class="row header mb-3">
      <div class="col-12">
      <div class="title-page">
        <div style="letter-spacing: -1.2vmax">
        <span class="text-movie">
          M
        </span>
        <span class="text-app">
          A
        </span>
        <span class="text-vue">
          V
        </span>
        </div>
        <span class="mav">
          MovieAppVue! 
        </span>
      </div>
        
      <div class="row justify-content-between mt-3 p-0">
        <div class="col-lg-3 col-5 mb-5">
          
          <div class="card pt-2 pb-0">
            <h8 class="card-title">
              TOP MOVIE!
            </h8>
            <img :src="HeroMovie.Poster" class="mx-auto card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ HeroMovie.Title }}</h5>
              <p class="card-text">
                <div class="row">
                  <div class="col text-start">
                    Released : {{ HeroMovie.Released }}
                    <br />
                    Rated : {{ HeroMovie.Rated }}
                  </div>
                  <div class="col text-end">
                    <i class="fa fa-star text-warning"></i> {{ HeroMovie.imdbRating }} - IMDb Rating
                  <br />  
                     ({{ HeroMovie.imdbVotes }} Votes)
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Genre : {{ HeroMovie.Genre }}
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-12 col-sm-9">
        </div>
      </div>
    </div>
   </div>

   <div class="row justify-content-center mb-3">
     <div class="col-8 col-sm-8 col-lg-8 mt-2 mb-2">
       <span v-if="ResultSearch === false">
         <div class="input-group">
           <button class="btn btn-danger" type="button" @click="Searching()" >
               <i class="fa fa-search"></i>
           </button>
             <input type="text" class="form-control" placeholder="Search here.." v-model="Keyword" @keyup.enter="Searching()">
          </div>
       </span>
       <span v-else>
         <div class="input-group">
           <button class="btn btn-danger" type="button" @click="Searching()" >
               <i class="fa fa-times"></i>
           </button>
             <input type="text" class="form-control" v-model="Keyword" readonly>
          </div>
       </span>
       
     </div>
     
      <div class="col-sm-3 col-lg-3 col-3 text-center p-0">
       <div class="title-page2 p-1">
        <div style="letter-spacing: -1.2vmax">
        <span class="text-movie">
          M
        </span>
        <span class="text-app">
          A
        </span>
        <span class="text-vue">
          V
        </span>
        </div>
        <span class="mav">
          MovieAppVue!
        </span>
      </div>
    </div>
   </div>

    <span v-if="ResultSearch === true">
      <ResultSearch />
    </span>
    <span v-else>
      <CategoryMovie />
      <CategorySeries />
      <CategoryEpisode />
    </span>
    
    
    
<div class="row justify-content-center">
            <div class="col p-3">
              <div class="copyright fs-5">
                @Copyright . 2021 by Zulkariski
              </div>
            </div>
          </div>
  </div>
</template>

<script>
// import {ref} from 'vue';
import axios from "axios";
import env from '../env.js'
import CategoryMovie from '../components/CategoryMovie.vue'
import CategorySeries from '../components/CategorySeries.vue'
import CategoryEpisode from '../components/CategoryEpisode.vue'
import ResultSearch from '../components/ResultSearch.vue'
 
import '../assets/main.css' 

export default {
  components: {
    CategoryMovie,
    CategorySeries,
    CategoryEpisode,
    ResultSearch
  },
  created(){
    this.fetchMovieHero('tt1386697');
  },
  data() {
    return {
      ResSearching: "",
      HeroMovie: {},
      ResultSearch: false,
      Keyword: ""
    }; 
  },
  methods: {
     Searching(){
       if(this.ResultSearch === false){
         this.ResultSearch = true
         this.$store.commit('findMovie', this.Keyword)
          // this.Keyword = ''
       } else {
         this.Keyword = ''
           this.ResultSearch = false
           
       }
     },
      fetchMovieHero(movie){
        
        let API_URL = `${env.url}?i=${movie}&apikey=${env.apikey}`
        console.log('API_URL => ', API_URL)
        axios
          .get(API_URL, {
            headers: {
            "content-type" : "application/json"
            }
          })
          .then((res) => {
            console.log('ini isi res api film => ', res)
            this.HeroMovie = res.data
          })
          .catch((error) => {
            const info = error.response;
            console.log('ini info error nya : ', info);
          });
      },
    }
}
</script>