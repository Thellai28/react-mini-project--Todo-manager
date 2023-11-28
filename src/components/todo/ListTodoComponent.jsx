import { useEffect, useState } from "react";
import { retrieveAllTodosForUserNameApi, deleteTodoApi } from './api/TodoApiService';
import { useAuth } from './Security/AuthContext';
import { useNavigate } from "react-router-dom";

function ListTodoComponent(){
    
    const authContext = useAuth();
    const userName = authContext.userName;
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [todos, setTodos] = useState( [] );

    useEffect( // useEffec takes, two arguments, one is a functiona and other one is array[]
        ()=> refreshTodos(),[]
    )

    function refreshTodos(){

        retrieveAllTodosForUserNameApi(userName)
        .then( response =>{
            console.log( userName);
            console.log(response.data);
            setTodos(response.data);
        } )
        .catch (error => console.log(error));
    }

    function deleteTodo( id ){
        console.log( 'clicked' + id );
        
        deleteTodoApi( userName, id )
            .then(
                () => {
                    setMessage(`Deletion of todo with ${id} is successful`)
                    refreshTodos()
                }
            ).catch( error => console.log(error));
    }

    function updateTodo( id ){
        console.log( 'clicked' + id );
        navigate(`/todos/${id}`);
    }

    function addNewTodo(){
        navigate(`/todos/-1`);
    }

    return (
        <div className = "container"> 
            <div>
                <h1>Your todo's are listed here</h1>
                { message && <div className='alert alert-warning'>{message}</div>}
                <table className='table'> 
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>is Done</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            currTodo => (
                                <tr key={currTodo.id}>
                                    <td>{currTodo.description}</td>
                                    <td>{currTodo.done.toString()}</td>
                                    {/* <td>{currTodo.targetDate.toDateString()}</td> */}
                                    <td>{currTodo.targetDate.toString()}</td>
                                    <td><button className='btn btn-warning' 
                                        onClick={()=> deleteTodo(currTodo.id)}>Delete</button></td>
                                    <td><button className='btn btn-success' 
                                        onClick={()=> updateTodo(currTodo.id)}>update</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add new todo</div>
        </div>
    )
}
export default ListTodoComponent;