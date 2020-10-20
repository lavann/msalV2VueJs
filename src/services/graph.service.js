export default class GraphService {
    constructor() {
      this.graphUrl = 'https://graph.microsoft.com/v1.0';
    }
  
    getUserProfile(token) { 
        // Add the Authorisation Header and supply the bearer token as part of the argument for calling the graph API
      const headers = new Headers({ Authorization: `Bearer ${token}` });
      const options = {
        headers
      }; //Make the call and return back to the user
      return fetch(`${this.graphUrl}/me`, options)
        .then(response => response.json())
        .catch(response => {
          throw new Error(response.text());
        });
    }
  }