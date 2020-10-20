


import * as MsalV2 from "@azure/msal-browser";

export default class AuthService {
    
    constructor() {
        console.log('in auth service constructor');
        this.graphScopes = ['user.read']
    
        this.config = { //Config object used to initalise the MSAL V2 Client
            auth: {
                clientId: 'Replace me with a client ID From the APP Registration',
                redirectUri: window.location.origin, //defaults to application start page
                authority:'https://login.microsoftonline.com/Replace me with the tenant ID From the APP Registration',
                postLogoutRedirectUri: window.location.origin
            }
        };

        this.app = new MsalV2.PublicClientApplication(this.config)
    }


    login() {
        return this.app.loginPopup(this.graphScopes).then( //Call the login method and supply the graph scope 
            () => {               
                const user = this.app.getAllAccounts();   // Get the User Object, this will return an array, however for the current it is index 0             
                if(user) {
                    return user;
                }
                else {
                    return null;
                }
            }, () => {return null}
        );
    }

    logout() {
        this.app.logout(); //User the SDK to log out the user
    }

    getToken() { //Obtain the bearer token
        return this.app.acquireTokenSilent(this.graphScopes).then(accessToken => {
            return accessToken;
        }, error => {
            console.log(error) 
            return this.app //if we get an error, try and obtain the token again
                    .acquireTokenPopup(this.graphScopes)
                    .then(
                        accessToken => {
                            return accessToken
                        }, err=> {
                            console.log(err);
                        }
                    );
        });
    }    
}