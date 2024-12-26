import { userService } from "../../services/user.service.js"

// user
export const SET_USER='SET_USER'
export const ADD_ACTIVITY = 'ADD_ACTIVITY'


const initialState={
    loggedInUser: userService.getLoggedinUser(),
    activities:[] //[{txt: 'Added a Todo', at: 1523873242735}]//
}



export function userReducer(state=initialState,cmd={}){
    switch (cmd.type){
        //* User:

        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        case ADD_ACTIVITY:
            const newActivity =  {txt: cmd.txt , at: Date.now()}
            const newActivities= [...state.activities,newActivity]
            return {
                ...state,
                activities: newActivities
            }
        
        default:
            return state

    }

}