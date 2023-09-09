// import { noteService } from "../services/note.service.js"
// const { useState, useRef, useEffect } = React

// export function NoteCanvas({ onAddNote }) {
//   const [drawing, setDrawing] = useState(false)
//   const canvasRef = useRef(null)
//   const ctxRef = useRef(null)
//   const [imageUrl, setImageUrl] = useState("")

//   useEffect(() => {
//     const canvas = canvasRef.current
//     const ctx = canvas.getContext("2d")
//     ctxRef.current = ctx
//   }, [])

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent
//     ctxRef.current.beginPath()
//     ctxRef.current.moveTo(offsetX, offsetY)
//     setDrawing(true)
//   }

//   const stopDrawing = () => {
//     ctxRef.current.closePath()
//     setDrawing(false)

//     const canvas = canvasRef.current
//     const imageUrl = canvas.toDataURL("image/png")
//     setImageUrl(imageUrl)
//   }

//   const draw = ({ nativeEvent }) => {
//     if (!drawing) return

//     const { offsetX, offsetY } = nativeEvent
//     ctxRef.current.lineTo(offsetX, offsetY)
//     ctxRef.current.stroke()
//   }

//   const handleAddCanvasNote = () => {
//     const newNote = {
//       type: "NoteCanvas",
//       imageUrl: imageUrl,
//     }

//     onAddNote(newNote)
//   }

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={400}
//         height={400}
//         onMouseDown={startDrawing}
//         onMouseUp={stopDrawing}
//         onMouseOut={stopDrawing}
//         onMouseMove={draw}
//       ></canvas>
//       <button onClick={handleAddCanvasNote}>Add Note</button>
//     </div>
//   )
// }
