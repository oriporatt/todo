
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function UserDetials() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const [userEdit, setUserEdit] = useState(user)
    const [isLoading, setIsLoading] = useState(null)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {

        } , [])

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

        setUserEdit(prevUserToEdit => ({ ...prevUserToEdit, [field]: value }))
    }

    function onSaveUser(ev) {
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
    const { fullname, color, bgColor} = userEdit
    if (!userEdit){
        return <h1> Loading..</h1>
    }
    
    return (
        
        <section className="user-detials" >
            <form onSubmit={onSaveUser} >
                <label htmlFor="txt">Full Name:</label>
                <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />
                <br></br>
                <label htmlFor="color" style={{color:color}}>Color:</label>
                <select onChange={handleChange} 
                        value={color} 
                        name="color" 
                        id="color"

                >
                    <option value="#ffb3b3" style={{backgroundColor:"#ffb3b3"}}>red</option>
                    <option value="#b3ffb3" style={{backgroundColor:"#b3ffb3"}}>green</option>
                    <option value="#b3c6ff" style={{backgroundColor:"#b3c6ff"}}>blue</option>
                    <option value="#ffffb3" style={{backgroundColor:"#ffffb3"}}>yellow</option>
                    <option value="#e0b3ff" style={{backgroundColor:"#e0b3ff"}}>purple</option>
                    <option value="#b3ffff" style={{backgroundColor:"#b3ffff"}}>cyan</option>
                    <option value="#d9d9d9" style={{backgroundColor:"#d9d9d9"}}>gray</option>
                    <option value="white" style={{backgroundColor:"white"}}>white</option>
                    <option value= "black" style={{backgroundColor:"black", color:"white"} }>black</option>

                    
                </select>
                <br></br>

                <label htmlFor="bgColor" style={{backgroundColor:bgColor}}>bgColor:</label>
                <select onChange={handleChange} 
                        value={bgColor} 
                        name="bgColor" 
                        id="bgColor"

                >
                    <option value="#ffb3b3" style={{backgroundColor:"#ffb3b3"}}>red</option>
                    <option value="#b3ffb3" style={{backgroundColor:"#b3ffb3"}}>green</option>
                    <option value="#b3c6ff" style={{backgroundColor:"#b3c6ff"}}>blue</option>
                    <option value="#ffffb3" style={{backgroundColor:"#ffffb3"}}>yellow</option>
                    <option value="#e0b3ff" style={{backgroundColor:"#e0b3ff"}}>purple</option>
                    <option value="#b3ffff" style={{backgroundColor:"#b3ffff"}}>cyan</option>
                    <option value="#d9d9d9" style={{backgroundColor:"#d9d9d9"}}>gray</option>
                    <option value="white" style={{backgroundColor:"white"}}>white</option>
                    <option value= "black" style={{backgroundColor:"black", color:"white"} }>black</option>

                    
                </select>

                <button>Save</button>
            </form>
        </section>
    )
}