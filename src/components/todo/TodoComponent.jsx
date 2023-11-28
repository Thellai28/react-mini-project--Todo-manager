import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";
import { useEffect, useState } from "react";
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService";
import { Formik,  Form, Field, ErrorMessage } from "formik";
import moment from "moment";

function TodoComponent(){
    const {id} = useParams();
    const authContext = useAuth();
    const user = authContext.userName;
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const navigate = useNavigate();

    useEffect(
        () => retrieveTodo(), [id]
    )

    function retrieveTodo( ){
        if( id != -1 ){
            retrieveTodoApi(user, id )
            .then( 
                response => {
                    setDescription(response.data.description)
                    setTargetDate( response.data.targetDate)
                }
            ).catch( error => console.log( error));
        }
    }

    function onSubmit( values ){ // This executes only if the validatioin method didn't throw any error.
        
        const todo = {
            id : id,
            username : user,
            description: values.description,
            targetDate : values.targetDate,
            done : false
            /* The name id, username, description, targetDate, done every thing should be same as field name defined inside Todo bean in
            Sprinb boot bean, or else error will be thrown */
        }

        if( id == -1 ){  // When we try to create a new todo, the values of id will be -1 : 
                        // This request is initiated form the ListTodoComponent, checek there to understand the flow.
            createTodoApi( user, todo )
            .then( 
                (response) => {
                    console.log( response)
                    navigate('/todos')
                }
                
            ).catch( error => console.log( error));
        }else{
            updateTodoApi( user, id, todo )
            .then( 
               //response => console.log( response)
               navigate('/todos')
            ).catch( error => console.log( error));
        }
    } 

    function validate( values ){ // once submit button is clicek, validation happens automatically, if ther is no error, onSubmit method
                                // will be triggered and respective functions will happen.
        console.log( values)
        let error  = {} // empty object : 
        if( values.description.length < 5 ){
            error.description = 'enter Atleast 5 character'
        }
        if( values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()){
            error.targetDate = 'enter a valid date'
        }

        // You have to store the error messages in 'description' and ' targetDate' because those are the states that is sent to the 
        // <Formic>,where the data collection template is declared. If you you any other custom names other than 
        // 'description' and 'targetDate', Eror messages will not be properly reflected in you websites.
        // make sure that you use 'description' and 'targetDate' as values for the "name" attribute inside the <ErrorMessage> tag,
        // Or else you will not see the proper validation failer message.
        return error;
    }
    return(
        <div className= 'container'>
            <h1>Enter todo details</h1>
            <div>
                <Formik initialValues={ {description, targetDate} }
                    enableReinitialize = {true}
                    onSubmit={onSubmit}
                    validate = {validate}
                    validateOnBlur = {false}
                    validateOnChange = { false }                >
                { 
                    (props)=> (
                        <Form>
                            <ErrorMessage
                                name = 'description'
                                component = "div"
                                className="alert alert-warning"
                            />

                            <ErrorMessage
                                name = 'targetDate'
                                component = "div"
                                className="alert alert-warning"
                            /> 

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type = 'text' className = 'form-controls' name = 'description'/>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field  type = 'date' className = 'form-controls' name = 'targetDate'/>
                            </fieldset>

                            <div>
                                <button className="btn btn-success m-5" type ='submit'>Save</button>
                            </div>
                        </Form>
                    )   
                }
                </Formik>
            </div>
        </div>
    )
}

export default TodoComponent;