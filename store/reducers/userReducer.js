import { userService } from "../../services/user.service.js"

export function userReducer(state=initialState,cmd={}){
    switch (cmd.type){
        //* User:

        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        }

}