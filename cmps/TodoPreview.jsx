export function TodoPreview({ todo, onToggleTodo }) {
    return (
        <article className="todo-preview">
            <h2 className={(todo.isDone)? 'done' : ''} onClick={onToggleTodo}>
                {todo.txt}
            </h2>
            <h4>Importance: {todo.importance}</h4>
        </article>
    )
}
