import { todoService } from "../../services/todo.service.js"
import { store } from "../store.js"
import {REMOVE_TODO, SET_IS_LOADING, 
    SET_TODOS, UPDATE_TODO,
    ADD_TODOS,SET_STATUS_BAR } from "../reducers/todo.reducer.js"
import { ADD_ACTIVITY } from "../reducers/user.reducer.js"
import { update } from "../actions/user.actions.js"

const { useSelector, useDispatch } = ReactRedux







export function loadTodos(){
    store.dispatch({type:SET_IS_LOADING, isLoading: true})
    const filterBy=store.getState().toDoModule.filterBy
    return todoService.query(filterBy)
        .then(todos=>{
            store.dispatch({type: SET_TODOS, todos})
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(()=>{
            store.dispatch({type:SET_IS_LOADING, isLoading: false})
            refreshStatusBar()
        })
}

export function removeTodo(todoId,todoTxt){
    return todoService.remove(todoId)
    .then((todo)=>{
        store.dispatch({type:REMOVE_TODO, todoId})
        refreshStatusBar()
        store.dispatch({type: ADD_ACTIVITY, txt:`Deleted Todo: ${todoTxt}`})
    })
    .catch(err => {
        console.log('todo action -> Cannot remove todo', err)
        throw err
    })

}

export function loadTodo(todoId) {
    store.dispatch({type:SET_IS_LOADING, isLoading: true})
    return todoService.get(todoId)
        .then((todo) => {
            return todo

        })
        .catch(err => {
            console.log('todo action -> Cannot load todo', err)
            throw err
        })
        .finally(()=>{
            store.dispatch({type:SET_IS_LOADING, isLoading: false})
        })
}


export function toggleTodo(todo){
    const todoToSave = { ...todo, isDone: !todo.isDone }

    return todoService.save(todoToSave)
        .then((savedTodo)=>{
            refreshStatusBar()
            store.dispatch({type:UPDATE_TODO, todo:savedTodo})
            store.dispatch({type: ADD_ACTIVITY, txt:`Canged Todo status to ${savedTodo.isDone? 'Done':'Un-do'}. Todo: ${savedTodo.txt}`})

            return(savedTodo)
        })
        .catch(err => {
            console.log('todo action -> Cannot toggle todo', err)
            throw err
        })

}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODOS
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, todo: savedTodo })
            refreshStatusBar()
            store.dispatch({type: ADD_ACTIVITY, txt:`${type===UPDATE_TODO? "Updated":"Saved"} Todo: ${savedTodo.txt}`})

            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
        
}

export function refreshStatusBar(){
    return todoService.getStatusBar()
        .then((newStatus)=>{
            store.dispatch({ type:SET_STATUS_BAR, todosStatusBar: newStatus })
            return (newStatus)
        })
}