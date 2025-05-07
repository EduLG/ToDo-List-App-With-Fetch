import React from "react";
import { useState } from "react";


const Home = () => {
	const [newTask,setNewTask] = useState("");
	const [tasks,setTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);

	const handleAddTask = (event) => {
		if (event.key === "Enter" && newTask.trim() !== "") {
			setTasks([...tasks, newTask.trim()]);
			setNewTask("");
		}
	};



	const handleDoneTask = (indexToDone) => {
		const doneTask = tasks[indexToDone]
		setCompletedTasks([...completedTasks, doneTask.trim()]);
		setTasks(tasks.filter((_, index) => index !== indexToDone));
	}

	return (
		<>
			<div className="text-center container">
				<h1 className="text-center mt-5">To do list:</h1>
				<input 
					className="form-control"
					placeholder="Insert a task to do..."
					onChange={event => setNewTask(event.target.value)}
					value={newTask}
					onKeyDown={handleAddTask}
				/>
				<ul className=" list-group mt-3">
					{tasks.length === 0 ? (
						<li className="list-group-item justify-content-between align-items-center d-flex">No tasks. Please add a new task.</li>
					):(
						tasks.map((task,index) => (
							<li key={index} className="list-group-item justify-content-between align-items-center d-flex">
								<span>{task}</span>
								<div>

									<button
										className="btn btn-success btn-sm inv-btn"
										onClick={() => handleDoneTask(index)}
									>
										<i className="fa-solid fa-check"></i>
									</button>
									
								</div>
							</li>
						))
					)}
				</ul>
			</div>

			<div>
				<p className="text-center">{tasks.length} tasks left</p>
			</div>

			<div className="text-center container">
			<h2 className="text-center mt-5">Done tasks:</h2>
				<ul className=" list-group mt-3">
					{completedTasks.map((completedTask, index) => (
						<li key={index} className="list-group-item justify-content-between align-items-center d-flex">
							<span>{completedTask}</span>
						</li>
					))
					}
				</ul>
			</div>

		</>
	);
};

export default Home;