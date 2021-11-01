import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tareas, setTareas] = useState(
		document.querySelectorAll("li").length
	);

	const [todos, setTodos] = useState([]);
	const lista = document.querySelector("ul");
	const limpiador = document.querySelector(".bugger");
	const url = "https://assets.breatheco.de/apis/fake/todos/user/jamaldonadoa";
	const eliminar = document.querySelector("i");

	useEffect(() => {
		//incorporar_usuarios();
	}, []);

	async function incorporar_usuarios() {
		try {
			const settings = {
				method: "POST",
				body: JSON.stringify(todos),
				headers: {
					"Content-Type": "application/json"
				}
			};
			const resp = await fetch(url, settings);
			const respuestas = await resp.json();
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function incorporar_tareas(temp) {
		try {
			const settings = {
				method: "PUT",
				body: JSON.stringify(temp),
				headers: {
					"Content-Type": "application/json"
				}
			};
			const resp = await fetch(url, settings);
			const respuestas = await resp.json();
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function borrar_todo() {
		try {
			const settings = {
				method: "DELETE"
			};
			const resp = await fetch(url, settings);
			const respuestas = await resp.json();
			lista.innerHTML = "";
			setTareas(0);
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function recolectar_tareas() {
		try {
			const settings = {
				method: "GET"
			};
			const response = await fetch(url, settings);
			const resp = await response.json();
			return resp;
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function eliminar_tareas(num) {
		try {
			const response = await fetch(url);
			const respuestas = await response.json();
			setTodos(respuestas);
			todos.splice(num, 1);
			setTodos(todos);
			if (todos.length == 0) {
				setTodos();
				lista.innerHTML = "";
			}
			incorporar_tareas();
			lista.innerHTML = "";

			if (todos.length == 0) {
				setTareas(0);
			} else {
				for (let index = 0; index < todos.length; index++) {
					let item = document.createElement("li");
					item.className = "list-group-item";
					item.value = index;
					item.innerHTML = `<span><i class="fas fa-minus-circle"></i></span> ${todos[index].label}`;
					item.addEventListener("click", function() {
						let elementoeliminar = this.value;
						eliminar_tareas(elementoeliminar);
					});
					lista.appendChild(item);
					setTareas(document.querySelectorAll("li").length);
				}
			}
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function escribir(arr) {
		for (let i = 0; i < arr.length; i++) {
			let item = document.createElement("li");
			item.className = "list-group-item";
			item.value = i;
			item.innerHTML = `<span><i class="fas fa-minus-circle"></i></span> ${arr[i].label}`;
			console.log(item.innerHTML);
			item.addEventListener("click", function() {
				let elementoeliminar = this.value;
				eliminar_tareas(elementoeliminar);
			});
			lista.appendChild(item);
			setTareas(document.querySelectorAll("li").length);
			document.querySelectorAll("input").value = "";
		}
	}

	async function actualizar(evalor) {
		let objeto = {
			label: evalor.target.value,
			done: false
		};

		let temp = await recolectar_tareas();
		temp.push(objeto);
		let grabar = await incorporar_tareas(temp);
		temp = await recolectar_tareas();
		//lista.innerHTML = " ";
		console.log(temp);
		debugger;
		// let write = await escribir(temp);
	}

	return (
		<>
			<div className="container">
				<div className="card paper">
					<div className="card-header display-4 d-flex justify-content-between">
						<input
							type="text"
							name="tarea"
							id="tarea"
							placeholder="Introduzca una tarea"
							onKeyPress={e => {
								if (
									e.key === "Enter" &&
									e.target.value !== ""
								) {
									actualizar(e);
								}
							}}
						/>
					</div>
					<ul className="list-group list-group-flush"></ul>
					<div className="card-footer">
						Tareas por hacer: {tareas}
					</div>
					<div className="bugger"> </div>
					<div className="bg-danger">
						{" "}
						ELIMINAR TODO
						<i className="fas fa-trash-alt" type="button"></i>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
