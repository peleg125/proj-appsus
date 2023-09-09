// const { useState } = React

// export function NoteTodos({ note, onUpdateNote }) {
//   const [noteWithTodos, setNoteWithTodos] = useState({
//     title: "",
//     todos: [],
//   })

//   const handleTodoChange = (index, newText) => {
//     const updatedTodos = [...note.todos]
//     updatedTodos[index].txt = newText
//     setNote({ ...note, todos: updatedTodos })
//   }

//   const handleTodoRemove = (index) => {
//     const updatedTodos = [...note.todos]
//     updatedTodos.splice(index, 1)
//     setNote({ ...note, todos: updatedTodos })
//   }

//   const handleAddTodo = (ev) => {
//     ev.preventDefault()
//     const newTodo = { txt: "", doneAt: null }
//     const updatedTodos = [...noteWithTodos.todos, newTodo]
//     setNoteWithTodos({ ...noteWithTodos, todos: updatedTodos })

//     const updatedNote = { ...noteWithTodos }
//     updatedNote.info.todos = updatedTodos
//     onUpdateNote(updatedNote)
//   }

//   const { title, todos: todoList } = noteWithTodos

//   return (
//     <div>
//       <form className='form-container' onSubmit={handleAddTodo}>
//         <input
//           className='text-title'
//           value={title}
//           name='title'
//           onChange={(e) => setNoteWithTodos({ ...noteWithTodos, title: e.target.value })}
//           type='text'
//           placeholder='Title'
//         />
//         <ul>
//           {todoList.map((todo, index) => (
//             <li key={index}>
//               <input type='text' value={todo.txt} onChange={(e) => handleTodoChange(index, e.target.value)} />
//               <button onClick={() => handleTodoRemove(index)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//         <button className='btn-form' type='submit'></button>
//       </form>
//     </div>
//   )
// }
