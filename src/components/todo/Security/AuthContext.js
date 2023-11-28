import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService, jwtTokenTaker } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext(); //This authContec == moden in springBoot, this stores the valuse, 
// provides to the other part of applications.
export const useAuth = ()=> useContext( AuthContext ); // custom hook creation : AuthContext



export default function AuthProvider({children}){
    const [isAuthenticated, setAuthenticated] = useState( false );
    const [ userName, setUserName] = useState(null);
    const [ token, setToken ] = useState(null);

    // async function login( userName, password ){ // async keyword is used here : 

    //     const baToken = 'Basic ' + window.btoa( userName + ":" + password );  // baToken -> Basic auth token : 
    //     // ther is a space after Basic_, window.btoa is a function to create base64 encoding.
    //     //  Make sure you execute this is the exact same way or you'll get error.
    //     try{
    //         const response = await executeBasicAuthenticationService(baToken); // await keyword is used here : 
    //         if( response.status == 200 ){
    //             setAuthenticated( true );
    //             setUserName( true );
    //             setToken( baToken ); 

    //             apiClient.interceptors.request.use(
    //                 (config ) => {
    //                     console.log('intercepting and adding the token : ')
    //                     config.headers.Authorization = baToken
    //                     return config;
    //                 } 
    //             )

    //             return true;
    //         }else{
    //             logout();
    //             return false;
    //         }
    //     }catch{
    //         logout();
    //         return false;
    //     }

    // }
    async function login( username, password ){ // async keyword is used here :
        

        try{
            const response = await executeJwtAuthenticationService( username, password ); // await keyword is used here : 
           
            if( response.status == 200 ){
                const jwtToken = "Bearer " + response.data.token
                setAuthenticated( true );
                setUserName( userName );
                setToken( jwtToken ); 
 
                apiClient.interceptors.request.use(
                    ( config ) => {
                        console.log('intercepting and adding the token : ')
                        config.headers.Authorization = jwtToken
                        return config;
                    } 
                )
                return true;
            }else{
                logout();
                return false;
            }
        }catch{

            logout();
            return false;
        }

    }
     
    function logout(){
        setAuthenticated(false);
        setToken( null ); 
        setUserName( null );
    }

    const valuesToBeSent = { isAuthenticated, login, logout, userName, token };

    return(
       <AuthContext.Provider value = { valuesToBeSent }> 
            {children}
       </AuthContext.Provider>
    )
}