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
		incorporar_usuarios();
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

	async function incorporar_tareas(valor) {
		try {
			const settings = {
				method: "PUT",
				body: JSON.stringify(valor),
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
			incorporar_usuarios();
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
			let temp = await recolectar_tareas();
			temp.splice(num, 1);
			console.log(temp.length);
			debugger;

			if (temp.length == 0) {
				alert("Debes mantener al menos una tarea");
			} else {
				let cargar = await incorporar_tareas(temp);
				temp = await recolectar_tareas();
				document.querySelector("ul").innerHTML = "";

				for (let index = 0; index < temp.length; index++) {
					let item = document.createElement("li");
					item.className = "list-group-item";
					item.value = index;
					item.innerHTML = `<span><i class="fas fa-minus-circle"></i></span> ${temp[index].label}`;
					item.addEventListener("click", function() {
						let elementoeliminar = this.value;
						eliminar_tareas(elementoeliminar);
					});
					document.querySelector("ul").appendChild(item);
					setTareas(document.querySelectorAll("li").length);
				}
			}
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function escribir(arr) {
		document.querySelector("ul").innerHTML = "";
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
			document.querySelector("ul").appendChild(item);
			setTareas(document.querySelectorAll("li").length);
			document.querySelector("input").value = "";
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
		temp = await Promise.all(temp);
		let write = escribir(temp);
	}

	return (
		<>
			<div className="container">
				<div className="card paper">
					<div className="card-header display-4 d-flex flex-wrap">
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
					<div className="d-flex justify-content-end">
						<h4>ELIMINAR TODO</h4>
						<i
							className="fas fa-trash-alt borrar"
							type="button"
							onClick={borrar_todo}></i>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
