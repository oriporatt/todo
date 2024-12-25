import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js"

export function login(credentials){
    return userService.login(credentials)
        .then(user=>{
            store.dispatch({type:SET_USER, user})
        })
        .catch(err=>{
            console.log('user actions>cant login',err)
            throw err
        })
}

export function signup(credentials){
    return userService.signup(credentials)
        .then(user=>{
            store.dispatch({type:SET_USER, user: user})
        })
        .catch(err=>{
            console.log('user actions>cant signup',err)
            throw err
        })
}


export function logout(){
    return userService.logout()
        .then(()=>{
            store.dispatch({type:SET_USER,user: null})
        })
        .catch(err=>{
            console.log('user actions>cant logout',err)
            throw err
        })
}