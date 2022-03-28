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
      this.fetchMovies('movie');  
    },
    methods: {
      fetchMovies(cat){
        let API_URL = `${env.url}?s=${cat}&type=${cat}&apikey=${env.apikey}`
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