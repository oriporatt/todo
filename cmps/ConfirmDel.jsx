

export function ConfirmDel({todoIdForDel, onConfirmDel, onDelete}) {

    return (
        <div className="confirm-del">
        <h1>Are you sure</h1>
        <button onClick={()=>onConfirmDel(todoIdForDel)}>Confirm Delete</button>
        <button onClick={()=>onDelete()}>X</button>
        </div>
    )
}

