import { todoService } from "../../services/todo.service.js"
import { store } from "../store.js"
import {REMOVE_TODO, SET_IS_LOADING, SET_TODOS } from "../reducers/todo.reducer.js"

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
        })
}

export function removeTodo(todoId){
    

}

export function removeTodoConfirmed (todoId){
    return todoService.remove(todoId)
    .then(()=>{
        store.dispatch({type:REMOVE_TODO, todoId})
    })
    .catch(err => {
        console.log('todo action -> Cannot remove todo', err)
        throw err
    })
}