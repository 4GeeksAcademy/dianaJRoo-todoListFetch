import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react";



//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const [activeIndex, setactiveIndex] = useState(null)

	useEffect(() => {

		fetch('https://playground.4geeks.com/apis/fake/todos/user/dianajroo', {
			method: "GET",
			 
		})
			.then(resp => {
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setTodos(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});




	}, [])

	return (
		<div className="container">
			<h1>todos</h1>
			<ul>
				<li> <input type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							setTodos(todos.concat(inputValue));
							setInputValue("")
						}
					}}
					placeholder="Que necesitas hacer?"></input>

				</li>
				{todos.map((todo, index) => (
					<li key={index} style={{ display: "flex", justifyContent: "space-between" }} onMouseEnter={() => setactiveIndex(index)} onMouseLeave={() => setactiveIndex(null)}>
						{todo.label} {index == activeIndex && <FontAwesomeIcon icon={faX} size="xs" style={{ color: "#e66565", }} onClick={() => setTodos(todos.filter((t, flujoIndex) => index != flujoIndex))} />}
					</li>
				))}

				<div className="footer">{todos.length} items left</div>

			</ul>
		</div>
	);
};

export default Home;