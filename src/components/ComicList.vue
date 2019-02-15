<template>
    <div id="comicslist">
    <button @click="showFavorites=!showFavorites">Filter Favorites</button>
    <ul>
        <li
          is="Comic"
          v-for="comic in filteredComics"
          v-bind:key="comic.num"
          v-bind:img="comic.img"
          v-bind:title="comic.title"
          v-bind:num="comic.num"
          v-bind:year="comic.year"
          v-bind:month="comic.month"
          v-bind:day="comic.day"
          v-bind:alt="comic.alt"
          v-bind:favorite.sync="comic.favorite"
        ></li>
    </ul>
    </div>
</template>

<script>

import axios from 'axios';
import Comic from './Comic.vue';
export default {
    name: 'ComicList',
    components: {
        Comic: Comic
    },
    data() {
        return {
            comics: [],
            index: 0,
            bottom: false,
            showFavorites: false
        }
    },
    methods: {
        favorites: function(comics) {
            return comics.filter(function (comic) {
                return comic.favorite
            })
        },
        bottomVisible() {
            const scrollY = window.scrollY;
            const visible = document.documentElement.clientHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const bottomOfPage = visible + scrollY >= pageHeight;
            return bottomOfPage || pageHeight < visible
        },
        addComic() {
            if (this.index != 0){
                let url = 'http://localhost:8000/api/xkcd/comic/' + this.index;

                axios.get(url).then(response => {
                    let comic = response.data;
                    this.index = comic['num'] - 1;
                    this.comics.push(comic);
                })
            }
        },
        getInitialComics() {
            axios.get('http://localhost:8000/api/xkcd/latest/?backissues=2').then(response => {
                let comics = response.data;
                this.index = comics[comics.length - 1]['num'] - 1;
                this.comics.push(...comics);
            });
        },
        favoriteComic(post) {
            axios.post('http://localhost:8000/api/favorite/'+post).then(response => {
                let isFavorited = true;
            });
        },
    },
    watch: {
        bottom(bottom) {
            if(bottom) {
                this.addComic()
            }
        }
    },
    computed: {
        filteredComics: function() {
            if(!this.showFavorites){
                return this.comics
            } else {
                return this.comics.filter(function(comic){
                    return comic.favorite
                });
            }
        }
    },
    beforeMount() {
        this.getInitialComics();
    },
    created() {
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        },)
        this.addComic();
    }
}
</script>
