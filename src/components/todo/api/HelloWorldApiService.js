import { apiClient } from "./ApiClient";


export function retrieveHelloWorldBean(){
    apiClient.get('/hello-world')
}

export const retrieveHelloWorldPathVariable = 
    (username, token) => apiClient.get(`/hello-world/path-variable/${username}`, // Notice the comma here : 
        { //sending credentials in headers : 
            headers: {
                Authorization : token // this is the hashcode or encrypted value of our credentials : 
            }
        }
    );



 