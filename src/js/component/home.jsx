import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'



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
			doId()
		}
	}

	const doId = async () => {
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

	const doShift = (e) => {
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
				<ul>
					<input type="text" placeholder="What needs to be done?" value={todo.label} onKeyUp={AddTask} onChange={doShift}></input>
					{
						list.map((item, index) => {
							return <li className="form-control" key={index} style={{ backgroundColor: activeIndex === index ? 'pink' : 'pink', margin: '10px', width: '710px', display: 'flex', justifyContent: 'space-between' }} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave}>{item.label} {activeIndex === index && <FontAwesomeIcon icon={faX} size="xs" style={{color: "#e66565", }} onClick={() => deleteTask(index) }/>} </li>
						})
					}

					<button style={{borderRadius: '3px', border: 'none', background: 'pink', marginTop: '20px', marginLeft: '295px'}} onClick={deleteAll}>Delete All</button>
					{list.length > 1 ? (<span className="d-flex align-items-start" style={{  background: '#EBEDEF', width: '100%', marginTop: '50px' }}>{list.length}items left</span>) : (<span className="d-flex align-items-start" style={{ marginLeft: '0.5rem', background: '#EBEDEF', width: '100%', marginTop: '0.5rem' }}>{list.length}item left</span>)}
				</ul>
			</div>
		</>

	);
};

export default TodoListFetch;