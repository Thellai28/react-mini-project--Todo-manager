function ListTodoComponent(){
    const today = new Date();
    const newDate = new Date( today.getFullYear(), today.getMonth(), today.getDate() );

    const todos = [
                    { id : 1, description : 'Learn javaScript and react', done : false, targetDate :newDate },
                    { id : 2, description : 'Learn people management skill',done : false, targetDate :newDate },
                    { id : 3, description : 'LEarn how billionaires spend their time',done : false, targetDate :newDate }
                ]

    return (
        <div className = "container"> 
            <h1>Your todo's are listed here</h1>
            <table className='table'> 
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Description</td>
                        <td>is Done</td>
                        <td>Target Date</td>
                    </tr>
                </thead>
                <tbody>
                  {
                      todos.map(
                        currTodo => (
                            <tr key={currTodo.id}>
                                <td>{currTodo.id}</td>
                                <td>{currTodo.description}</td>
                                <td>{currTodo.done.toString()}</td>
                                <td>{currTodo.targetDate.toDateString()}</td>
                            </tr>
                        )
                    )
                  }
                </tbody>
            </table>
        </div>
    )
}


export default ListTodoComponent;