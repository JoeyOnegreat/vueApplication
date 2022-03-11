<template>
  <div id='HomeView'>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to One Great Studio Applications Platform</h1>
    <input v-model="searchQuery">
    <div v-if="this.searchQuery.length >3">
    <div v-for="r of resultQuery" :key="r.id">{{r.title}} {{r.title2}}</div>
    </div>
    <div class="container">
  <div class="row">
    <div class="col-4">.col-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div>
    <div class="col-6">.col-6<br>Subsequent columns continue along the new line.</div>
  </div>
</div>
  </div>
</template>
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      searchQuery: '',
      resources: [
        { id: 1, title: "javascript for dummies", title2: "running", },
        { id: 2, title: "vue for dummies", title2: "down", },
        { id: 3, title: "dos for dummies", title2: "now", },
        { id: 4, title: "windows for dummies", title2: "ok", },
        { id: 5, title: "html for dummies", title2: "hshs", }
      ]
    };
  },
  computed: {
    resultQuery() {
      console.log(this.searchQuery.length > 3)
      if (this.searchQuery.length > 3) {
        return this.resources.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.title.toLowerCase().includes(v) || item.title2.toLowerCase().includes(v));
        });
      } else {
        return this.resources;
      }
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>