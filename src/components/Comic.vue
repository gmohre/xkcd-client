<template>
  <div class="comic">
    <div class="title">{{ title }}
    <img v-on:click="fave" class="heart" src="/heart.png" v-bind:class="{ 'favoriteheart': favorite, 'fadedheart': !favorite}" /></div>
    <div class="dateline">#{{ num }} &bull; {{ dateline }}</div>
    <img class="comic" :src="img"/>
    <div class="alt">{{ alt}}</div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'Comic',
  props: ['title', 'img', 'num', 'year', 'month', 'day', 'favorite', 'alt'],
  methods: {
    fave: function() {
      this.$emit('update:favorite', !this.favorite);
    }
  },
  computed: {
    dateline: function () {
      let datestring = this.month + '-' + this.day + '-' + this.year;
      let date_moment = moment(datestring);
      return date_moment.format('MMMM Do YYYY')
    }
  }
  }
</script>
<style scoped>
div {
  font-family: Monaco;
}
div .comic {
  margin: 10px;
}
div .dateline, .alt{
  margin: 5px;
  font-size: 11px;
}
div.title {
  margin: 5px;
  font-size: 25px;
  color: #FFFFFF;
}
img.comic {
  margin : 15px;
}
img.fadedheart {
  opacity: 0.5;
  height : 20px;
}
img.favoriteheart  {
  opacity: 1;
  height : 20px;
}

</style>
