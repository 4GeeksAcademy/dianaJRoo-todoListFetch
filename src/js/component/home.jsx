import React, { useEffect, useState } from "react";



//create your first component

const TodoListFetch = () => {

	const [todo, setTodo] = useState({
		label: '',
		done: false,
	});
	const [list, setList] = useState([])
	const [activeIndex, setActiveIndex] = useState(null);

	const getList = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/dianajroo')
			const data = await response.json()
			// console.log(data);
			setList(data);
		} catch {
			createUser()
		}
	}

	const createUser = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/dianajroo', {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (response.ok) {
				getList();
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	const AddTask = async (e) => {
		if (e.key === 'Enter' && e.target.value.trim() !== '') {
			try {
				const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/dianajroo', {
					method: "PUT",
					body: JSON.stringify([...list, todo]),
					headers: {
						"Content-Type": "application/json"
					}
				})
				if (response.ok) {
					getList();
					setTodo({
						label: '',
						done: false,
					})
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	const handleChange = (e) => {
		setTodo({ ...todo, "label": e.target.value });
	}

	const deleteTask = async (index) => {
		const filterList = list.filter((todo, i) => {
			if (index !== i) {
				return true;
			}
			return false;
		})
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/dianajroo', {
				method: "PUT",
				body: JSON.stringify(filterList),
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (response.ok) {
				setList(filterList);
			}
		} catch (error) {
			console.log(error);
		}

	}

	const deleteAll = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/dianajroo', {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			})
			setList([]);
			createUser();
		}
		catch (error) {
			console.log(error);
		}

	}

	let onMouseEnter = (index) => {
		setActiveIndex(index);
	}

	let onMouseLeave = () => {
		setActiveIndex(null);
	}

	useEffect(() => {
		getList();
	}, []);


	return (
		<>
			<div className="container mt-4">
				<h1 style={{ color: '#7f7f7f', textAlign: 'center', fontSize: '5rem' }}>todos</h1>
				<div>
					<input type="text" placeholder="What needs to be done?" value={todo.label} onKeyUp={AddTask} onChange={handleChange}></input>
					{
						list.map((item, index) => {
							return <li className="form-control" key={index} style={{ backgroundColor: activeIndex === index ? 'pink' : 'pink', margin: '0.5rem' }} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave}>{item.label} {activeIndex === index && (<button onClick={() => deleteTask(index)}  style={{ cursor: 'pointer', border: 'none', borderRadius: '2px', backgroundColor: 'white', }} >x</button>)} </li>
						})
					}

					<button style={{borderRadius: '3px', border: 'none', background: 'pink', marginTop: '20px', display: 'flex', justifyContent: 'center',}} onClick={deleteAll}>Delete All</button>
					{list.length > 1 ? (<span className="d-flex align-items-start" style={{  background: '#EBEDEF', width: '100%', marginTop: '50px' }}>{list.length}items left</span>) : (<span className="d-flex align-items-start" style={{ marginLeft: '0.5rem', background: '#EBEDEF', width: '100%', marginTop: '0.5rem' }}>{list.length}item left</span>)}
				</div>
			</div>
		</>

	);
};

export default TodoListFetch;