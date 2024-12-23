const { useState, useEffect,useRef } = React
import { utilService } from "../services/util.service.js"


export function TodoFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
    onSetFilter = useRef(utilService.debounce(onSetFilter)).current

    const options = [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'done', label: 'Done' }
      ];

    useEffect(() => {
        // Notify parent
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

            case 'select-one':
                value = target.options[target.selectedIndex].value
               
                break

            default: break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance ,taskFilter} = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Text: </label>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <br></br>
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                 <br></br>
                 <label htmlFor="taskFilter">Show: </label>
                 <select value={taskFilter} name="taskFilter" onChange={handleChange}> 
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                </select>




                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}