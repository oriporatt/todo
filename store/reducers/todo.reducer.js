import { todoService } from "../../services/todo.service.js"

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODOS = 'ADD_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_STATUS_BAR = 'SET_STATUS_BAR'





const initialState = {
    todos: [],
    todosStatusBar: {},
    filterBy: todoService.getDefaultFilter(),
    isLoading: true
}

export function todoReducer(state=initialState,cmd={}){
    switch(cmd.type){
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }
        
        case ADD_TODOS:
            return {
                ...state,
                todos: [...state.todos,cmd.todo]
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo=>todo._id!==cmd.todoId)
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo=>todo._id===cmd.todo._id? cmd.todo:todo)
            }
        case SET_STATUS_BAR:
            return {
                ...state,
                todosStatusBar: {...state.todosStatusBar,...cmd.todosStatusBar}
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: {...state.filterBy,...cmd.filterBy}
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        default:
            return state
    }
}