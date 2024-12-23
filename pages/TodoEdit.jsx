import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo,loadTodo } from "../store/actions/todo.actions.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const [isLoading, setIsLoading] = useState(null)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.todoId){
            _loadTodo()
        } 
    }, [])

    function _loadTodo() {
        setIsLoading(true)
        loadTodo(params.todoId)
            .then((todo) => {
                setTodoToEdit(todo);
                setIsLoading(false); 
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
            case 'color': 
                value = target.value 
                break
            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
            .then((savedTodo) => {
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })
    }
    const { txt, importance, isDone ,colorTodo} = todoToEdit
    if (isLoading && params.todoId){
        return <h1> Loading..</h1>
    }
    
    return (
        
        <section className="todo-edit" >
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} type="checkbox" name="isDone" id="isDone" />

                <label htmlFor="colorTodo" style={{backgroundColor:colorTodo}}>Task Color:</label>
                {/* <input onChange={handleChange} value={colorTodo} type="color"  name="colorTodo" id="colorTodo"  /> */}
                <select onChange={handleChange} 
                        value={colorTodo} 
                        name="colorTodo" 
                        id="colorTodo"

                >
                    <option value="#ffb3b3" style={{backgroundColor:"#ffb3b3"}}>Red</option>
                    <option value="#b3ffb3" style={{backgroundColor:"#b3ffb3"}}>Green</option>
                    <option value="#b3c6ff" style={{backgroundColor:"#b3c6ff"}}>Blue</option>
                    <option value="#ffffb3" style={{backgroundColor:"#ffffb3"}}>Yellow</option>
                    <option value="#e0b3ff" style={{backgroundColor:"#e0b3ff"}}>Purple</option>
                    <option value="#b3ffff" style={{backgroundColor:"#b3ffff"}}>Cyan</option>
                    <option value="#d9d9d9" style={{backgroundColor:"#d9d9d9"}}>Gray</option>
                    <option value="#ffffff" style={{backgroundColor:"#ffffff"}}>White</option>
                </select>

                <button>Save</button>
            </form>
        </section>
    )
}