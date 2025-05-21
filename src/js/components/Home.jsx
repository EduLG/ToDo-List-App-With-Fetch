import React, { useEffect, useState } from "react";

const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const API_URL = "https://playground.4geeks.com/todo";

	// Cargar tareas al montar el componente
	useEffect(() => {
		syncTasks();
	}, []);

	// Sincronizar tareas con la API
	const syncTasks = () => {
		fetch(`${API_URL}/users/EduLG`)
			.then(resp => {
				if (!resp.ok) throw new Error("User not found");
				return resp.json();
			})
			.then(data => setTasks(data.todos))
			.catch(() => {
				// Crear usuario si no existe
				fetch(`${API_URL}/users/EduLG`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
				}).then(() => setTasks([]));
			});
	};

	// Añadir nueva tarea
	const addTask = (newTaskData) => {
		fetch(`${API_URL}/todos/EduLG`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTaskData)
		})
			.then(resp => {
				if (resp.status === 201) {
					syncTasks();
				} else {
					console.error("Error al añadir la tarea");
				}
			})
			.catch(error => console.error("Error en la petición POST:", error));
	};

	// Manejar evento de tecla para añadir tarea
	const handleAddTask = (event) => {
		if (event.key === "Enter" && newTask.trim() !== "") {
			addTask({ label: newTask.trim(), is_done: false });
			setNewTask("");
		}
	};

	// Marcar tarea como hecha (eliminar en este caso)
	const handleDoneTask = (taskId) => {
		fetch(`${API_URL}/todos/${taskId}`, {
			method: "DELETE"
		})
			.then(resp => {
				if (resp.ok) {
					syncTasks();
				} else {
					console.error("Error al eliminar la tarea");
				}
			})
			.catch(error => console.error("Error en la petición DELETE:", error));
	};

	return (
		<div className="container text-center">
			<h1 className="mt-5">To do list:</h1>
			<input
				className="form-control"
				placeholder="Insert a task to do..."
				value={newTask}
				onChange={e => setNewTask(e.target.value)}
				onKeyDown={handleAddTask}
			/>
			<ul className="list-group mt-3">
				{tasks.length === 0 ? (
					<li className="list-group-item">No tasks. Please add one.</li>
				) : (
					tasks.map(task => (
						<li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
							<span>{task.label}</span>
							{!task.is_done && (
								<button className="btn btn-success btn-sm" onClick={() => handleDoneTask(task.id)}>
									<i className="fa-solid fa-check"></i>
								</button>
							)}
						</li>
					))
				)}
			</ul>
			<p className="text-center mt-3">{tasks.filter(t => !t.is_done).length} tasks left</p>
		</div>
	);
};

export default Home;
