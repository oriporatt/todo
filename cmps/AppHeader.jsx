const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg,showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, signup } from '../store/actions/user.actions.js'

const { useSelector, useDispatch } = ReactRedux



export function AppHeader() {
    const navigate = useNavigate()
    const todosStatusBar = useSelector(storeState => storeState.toDoModule.todosStatusBar)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)




    function onLogout() {
        logout()
            .then(() => {
                
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onLogin(user) {
        login(user)
            .then(() => { 
                
                showSuccessMsg('Logged in successfully') })
            .catch((err) => {
                showErrorMsg('Oops try again')
             })
    }

    function onSignup(user) {
        signup({...user,balance:10000})
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }
    
    
    const isStatusBarDataExist= (todosStatusBar.todoCompleted>=0) && (todosStatusBar.todoLength>=0)
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >

                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                        <span>{user.balance}</span>
                    </ section >
                ) : (
                    <section> 
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                )}
                <div className='status-bar'>
                    {isStatusBarDataExist? 
                        <span>Completed {todosStatusBar.todoCompleted}
                        /{todosStatusBar.todoLength}</span> :
                        <span>Loading Status Bar..</span>}
                </div>

                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
