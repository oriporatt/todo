import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos,removeTodo ,toggleTodo} from "../store/actions/todo.actions.js"
import {SET_FILTER_BY} from "../store/reducers/todo.reducer.js"
import { ConfirmDel } from "../cmps/ConfirmDel.jsx"
import {update} from "../store/actions/user.actions.js"

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoApp() {

    const todos = useSelector(storeState => storeState.toDoModule.todos)
    const isLoading = useSelector(storeState => storeState.toDoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toDoModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const dispatch = useDispatch()
    const [todoIdForDel, setIdForDel] = useState(null)
    // Special hook for accessing search-params:
    // const [searchParams, setSearchParams] = useSearchParams()


    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)


    useEffect(() => {
        // setSearchParams(filterBy)
        loadTodos()
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        toggleTodo(todo)
            .then((newTodo)=>{
                onComplete(newTodo)
                showSuccessMsg(`Todo toggled`)
            })

    }

    function onComplete(todo){
        if (todo.isDone){
            update({...user,balance: user.balance+10})
        }
    }
    
    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onConfirmDel(todoId){
        setIdForDel(null)
        removeTodo(todoId)
            .then(()=>{
                showSuccessMsg('Todo Removed')
            }) 
            .catch ((err)=>showErrorMsg('Cannot remover car'))
    }

    function onDelete(){
        setIdForDel(null)
    }

    function onRemoveTodo(todoIdForDelInput){
        setIdForDel(todoIdForDelInput)

    }
    // if (isLoading) return  <h2>Why this not working and flicker?</h2>
    return (
        <section className="todo-app">
            <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>

            {!isLoading
                ? <div>
                    <h2>Todos List</h2>
                    <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
                    <hr />
                    <h2>Todos Table</h2>
                    <div style={{ width: '60%', margin: 'auto' }}>
                        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
                    </div>
                        {todoIdForDel && <ConfirmDel todoIdForDel={todoIdForDel} 
                        onConfirmDel={onConfirmDel} onDelete={onDelete} />}
                    </div>
                :<div>Loading</div>
            }

        </section>
    )
}