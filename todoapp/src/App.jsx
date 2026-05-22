import { useState, useEffect } from "react"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"

const API = "http://localhost:5000/api"
const priorityOrder = { high: 1, medium: 2, low: 3 }

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("none")

  // GET all tasks from backend
  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  // ADD task
  const addTask = async (taskData) => {
    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData)
    })
    const newTask = await res.json()
    setTasks([...tasks, newTask])
  }

  // TOGGLE task
  const toggleTask = async (id, completed) => {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    })
    const updated = await res.json()
    setTasks(tasks.map(t => t.id === id ? updated : t))
  }

  // DELETE task
  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" })
    setTasks(tasks.filter(t => t.id !== id))
  }

  const editTask = async (id, taskData) => {
  const res = await fetch(`${API}/tasks/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData)
  })
  const updated = await res.json()
  setTasks(tasks.map(t => t.id === id ? updated : t))
 }

  const filteredTasks = tasks
    .filter(t => {
      if (filter === "active") return !t.completed
      if (filter === "completed") return t.completed
      return true
    })
    .sort((a, b) => {
      if (sortBy === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority]
      if (sortBy === "date") {
        if (!a.due_date) return 1
        if (!b.due_date) return -1
        return new Date(a.due_date) - new Date(b.due_date)
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">My To-Do List</h1>
        <TaskInput addTask={addTask} />

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-3">
          {["all", "active", "completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1 rounded-lg text-sm font-medium capitalize transition
                ${filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-2 mb-4">
          {[
            { value: "none", label: "🔀 Default" },
            { value: "priority", label: "🔴 Priority" },
            { value: "date", label: "📅 Date" },
          ].map(s => (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              className={`flex-1 py-1 rounded-lg text-sm font-medium transition
                ${sortBy === s.value
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
      </div>
    </div>
  )
}

export default App