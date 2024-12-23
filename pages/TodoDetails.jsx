import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodo,toggleTodo } from "../store/actions/todo.actions.js"


const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        _loadTodo()

    }, [params.todoId])


    function _loadTodo() {
        loadTodo(params.todoId)
            .then(setTodo)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todo')
                navigate('/todo')
            })
    }

    function _toggleTodo(todo){
        showSuccessMsg("Updating..")
        toggleTodo(todo)
        .then(()=>{
            
            loadTodo(todo._id)
            .then((newToDo)=>{
                setTodo(newToDo)
                showSuccessMsg("Saved")
            })
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todo')
                navigate('/todo')
            })
        })

    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/todo')
        // navigate(-1)
    }

    if (!todo) return <div>Loading...</div>
    const button_text= todo.isDone? "Mark Un-Do":"Mark as Done!"
    return (
        <section className="todo-details">
            <button><Link to={`/todo/edit/${todo._id}`}>Edit Task</Link></button> 
            <h1 className={(todo.isDone)? 'done' : ''}>{todo.txt}</h1>
            <button onClick={()=>_toggleTodo(todo)}>{button_text}</button>
            
            {todo.colorTodo&&<h4>Task Color:<span style=
                {{
                    backgroundColor:todo.colorTodo,
                    color:todo.colorTodo
                }}>_Area with Color_</span></h4>}
            
            <h1>Todo importance: {todo.importance}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <button onClick={onBack}>Back to list</button>
            <div>
                <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link> |
                <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
            </div>
        </section>
    )
}