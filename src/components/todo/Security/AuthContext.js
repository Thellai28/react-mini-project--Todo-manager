import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuth = ()=> useContext( AuthContext); // custom hook creation : AuthContext



export default function AuthProvider({children}){
    const [isAuthenticated, setAuthenticated] = useState( false );

    function login( userName, password ){
        if( userName === 'Thellai' && password === 'password'){
            setAuthenticated( true );
            return true;
        }else {
            setAuthenticated( false );
            return false;
        }
    }
    function logout(){
        setAuthenticated(false);
    }
    const valuesToBeSent = { isAuthenticated, login, logout};
    return(
       <AuthContext.Provider value = { valuesToBeSent }> 
            {children}
       </AuthContext.Provider>
    )
}