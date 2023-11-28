import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = 
    (token) => apiClient.get(`/basicauth`, // Notice the comma here : 
        {
            headers: {
                Authorization : token
            }
        }
    );

export const executeJwtAuthenticationService = 
    (username, password) => apiClient.post( `/authenticate`, { username, password} );
