<template>
  <div id='HomeView'>
    <div v-if="this.option" >
      <img alt="Vue logo" src="../assets/logo.png">
      <h1>Welcome to One Great Studio Applications Platform</h1>
      <input v-model="searchQuery" placeholder="type to search">
      
        <div v-if="this.searchQuery.length >3">
        <div v-for="r of resultQuery" :key="r.id">
        <div @click="displayDetails(r.id)" class="container pt-3 col-6 my-auto" >
          <div class="row ">
          <div class="col-6 "><img class="businessImg" v-bind:src="'http://localhost:3000/' + r.businessLogo" /> </div>
          <div class="col-6 ">
            <p>{{r.businessName}}</p>
            <p>{{r.businessAddress}}</p>
            <p>{{r.businessEmail}}</p>
            <p>{{r.businessPhone}}</p>
         </div>
          </div>
        </div>
        </div>
        </div>
    </div>
    <div v-if="this.details" class="my-auto">
    <div class="container pt-3 col-6 my-auto">
      <a class="float-left" @click="option=true, details=false">Back</a>
      <div class="row ">
        <div class="col-6"><img class="businessImg" v-bind:src="'http://localhost:3000/' + arr[id].businessLogo" /> </div>
        <div class="col-6">
        <p>Customer Name:{{arr[id].customerFirstName}}&nbsp;{{arr[id].customerLastName}}</p>
        <p>Customer Email:{{arr[id].customerEmail}}</p>
        <p>Customer Phone number:{{arr[id].customerPhone}}</p>
        <p>Business TRN:{{arr[id].businessTrn}}</p>
        <p>Business Name:{{arr[id].businessName}}</p>
        <p>Business Address:{{arr[id].street}}, {{arr[id].city}}, {{arr[id].state}}, {{arr[id].zipcode}}, {{arr[id].country}}</p>
        <p>Business Email:{{arr[id].businessEmail}}</p>
        <p>Business Phone Number:{{arr[id].businessPhone}}</p>
        </div>
      </div>
    </div>
       <div>
    <br>
    <gmap-map
        :zoom="14"    
        :center="center"
        style="width:100%;  height: 600px;"
      >
      <gmap-marker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'


export default {
  name: 'HomeView',
  data() {
    return {
      searchQuery: '',
      arr:[],
      option:true,
      details:false,
      id:0,

        center: { 
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      lati:'',
      lang:''
        
    };
  },
  mounted(){
   this.locateGeoLocation();
  },
  created() {
  axios.get('http://localhost:3000/api/v1/customers').then(response =>{
    this.arr=response.data
  }).catch(e => {
  this.error.push(e)
  })
  
 },
  computed: {
    resultQuery() {
      if (this.searchQuery.length > 3) {
        //console.log(this.arr[0])
        return this.arr.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.businessName.toLowerCase().includes(v) || item.street.toLowerCase().includes(v) || item.city.toLowerCase().includes(v) || item.country.toLowerCase().includes(v) || item.state.toLowerCase().includes(v));
        });
      } else {
        return this.arr;
      }
    }
  },
  methods:{
    displayDetails(id){
      this.option=false
      this.details=true
      this.id=id -1
      this.getlatlng(this.id=id -1)
    },
    addLocationMarker() {
      
      if (this.lang) {
        const marker = {
          lat: this.lati,
          lng: this.lang
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    },
      getlatlng(id){
      this.$geocoder.setDefaultMode('address');      // this is default
      var addressObj = {
      address_line_1: this.arr[id].street,
      address_line_2: '',
      city:           this.arr[id].city,
      state:          this.arr[id].state,               // province also valid
      zip_code:       this.arr[id].zipcode,            // postal_code also valid
      country:        this.arr[id].country
      }
      this.$geocoder.send(addressObj, response => { 
      this.lati=response.results[0].geometry.location.lat
      this.lang=response.results[0].geometry.location.lng
      this.addLocationMarker()
        //console.log(response.results[0].geometry.location.lat) 
        });
      }
  }
};
</script>
<style>
.businessImg{
  width: 100%;
  max-width: 150px;
}
.container{
  width: 500px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>