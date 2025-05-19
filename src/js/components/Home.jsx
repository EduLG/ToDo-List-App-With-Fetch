import React, { useEffect, useState } from "react";

const Home = () => {
	const [newTask,setNewTask] = useState("");
	const [tasks,setTasks] = useState([]);
	const username = "EduLG";
	const API_URL = "https://playground.4geeks.com/todo";
	
	//Create tasks when mounting component
	useEffect(()=> {
	syncTasks();
	}, [])

	//Synchronize tasks with API
	const syncTasks = (updatedTasks) => {
			fetch(`${API_URL}/users/EduLG`)
			.then(resp => {
			if (!resp.ok) throw new Error("User not found");
			return resp.json();
		})
		.then(data => setTasks(data.todos))
		.catch(() => {
			//Create user if not existing
			fetch(`${API_URL}/users/EduLG`, {
				method: "POST",
				headers: {"Content-Type": "application/json" },
			})
				.then(() => setTasks([]));
		})
	};

	const addTask = (newTaskData) => {
		fetch(`${API_URL}/todos/EduLG`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newTaskData)
		}).then(resp => {
			if(resp.status === 201) {
				syncTasks();
			};
		})
	}

	const handleAddTask = (event) => {
		if (event.key === "Enter" && newTask.trim() !== "") {
			addTask({label: newTask.trim(), is_done:false});
			setNewTask("");
		}
	};


	const handleDoneTask = (indexToDone) => {
		const updatedTasks = task.map((task, i)=>
			i === indexToDone ? {...task, done:true} : task
		);
	}

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
					tasks.map((task, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between">
							<span style={{ textDecoration: task.done ? "line-through" : "none" }}>
								{task.label}
							</span>
							{!task.done && (
								<button className="btn btn-success btn-sm" onClick={() => handleDoneTask(index)}>
									<i className="fa-solid fa-check"></i>
								</button>
							)}
						</li>
					))
				)}
			</ul>
			<p className="text-center mt-3">{tasks.filter(t => !t.done).length} tasks left</p>
		</div>
	);
};

export default Home;