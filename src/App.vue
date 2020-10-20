<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
        <h1>{{ msg }}</h1>
            <button @click="logIn" type="button" v-if="!currentUser">Login</button>
            <button @click="callGraphApi" type="button" v-if="currentUser">
              Graph API
            </button>
            <button @click="logOut" type="button" v-if="currentUser">
              Logout
            </button>
      <h3 v-if="currentUser">Hello {{ this.currentUser }}</h3>
      <pre v-if="userProfile">{{ JSON.stringify(userProfile, null, 4) }}</pre>
      <p v-if="login">Login failed</p>
      <p v-if="graph">Graph API call failed</p>
  </div>
</template>

<script>

import AuthService from './services/auth.service';
import GraphService from './services/graph.service';
export default {
  name: "App",
  data: function() { //when a vue instance is created, it will add all the properties found in the data function to the system. These properties are then available to the application
    return {
      msg: "HMSAL V2 with Vue JS - An Example",
      currentUser:null,
      userProfile: null,
      graph: false, //use to toggle buttons in UI
      login: false //use to toggle buttons in UI  
      }
    }
    ,created: function() {  //created hook that allows the code to be run , you cannot manipulate the dom as it has not been mounted, you would need to use mounted()
      this.authService = new AuthService();
      this.graphService = new GraphService();
      
      console.log('in created');
  },
  methods: {
    callGraphApi() { //Call the Graph API and Return the User Profile
       this.graph = false;
      this.authService.getToken().then(
        token => {
          console.log(token);
          this.graphService.getUserProfile(token.accessToken).then(
            data => {
              this.userProfile = data;
            },
            error => {
              console.error(error);
              this.graph = true;
            }
          );
        },
        error => {
          console.error(error);
        }
      );
      }
    ,
    logOut() {
        this.authService.logout();
    },

    logIn() {
      this.login = false;
      this.authService.login().then(
        user => {
          if (user) {
            this.currentUser = user[0].name;
            console.log(this.currentUser);
          } else {
            this.login = true;
          }
        },
        () => {
          this.login = true;
        }
      );
    
    }
  }
    
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
