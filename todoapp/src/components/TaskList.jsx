import { useState } from "react"

const priorityColors = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500",
}

const priorityLabels = {
  high: "🔴 High",
  medium: "🟡 Medium",
  low: "🟢 Low",
}

function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [flipping, setFlipping] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.due_date || "")

  const handleToggle = () => {
    setFlipping(true)
    setTimeout(() => {
      toggleTask(task.id, task.completed)
      setFlipping(false)
    }, 500)
  }

  const handleSave = () => {
    if (editText.trim() === "") return
    editTask(task.id, {
      text: editText.trim(),
      priority: editPriority,
      dueDate: editDueDate || null
    })
    setIsEditing(false)
  }

  return (
    <li
      className={`relative flex flex-col px-4 py-3 rounded-xl border-2 gap-1 transition-all overflow-hidden
        ${task.completed
          ? "bg-green-50 border-green-300 opacity-80"
          : "bg-red-50 border-red-200 shadow-sm hover:shadow-md"
        }`}
    >
      {/* SIGN */}
      {!isEditing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-0.5 h-3 bg-gray-400"></div>
          <div
            className={`border-4 font-black text-sm px-3 py-1 rounded-md tracking-widest shadow-md
              ${flipping ? "flip" : "swing"}
              ${task.completed
                ? "border-green-600 bg-green-100 text-green-700"
                : "border-red-600 bg-red-100 text-red-700"
              }`}
            style={{ transformOrigin: "top center" }}
          >
            {task.completed ? "DONE" : "UNDONE"}
          </div>
        </div>
      )}

      {isEditing ? (
        /* EDIT MODE */
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none"
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-1 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-1 rounded-lg text-sm hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* VIEW MODE */
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              className="w-4 h-4 accent-green-500 cursor-pointer"
            />
            <span
              onClick={handleToggle}
              className={`cursor-pointer font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
            >
              {task.text}
            </span>
          </div>
          <div className="flex gap-2 ml-4 z-10">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-400 hover:text-blue-600 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-600 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="flex gap-3 text-xs ml-6">
          <span className={`font-medium ${priorityColors[task.priority]}`}>
            {priorityLabels[task.priority]}
          </span>
          {task.due_date && (
            <span className="text-gray-400">📅 {task.due_date}</span>
          )}
        </div>
      )}
    </li>
  )
}

function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  if (tasks.length === 0)
    return <p className="text-center text-gray-400">No tasks yet. Add one above!</p>

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
      ))}
    </ul>
  )
}

export default TaskList