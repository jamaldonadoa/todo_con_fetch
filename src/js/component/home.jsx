import React, { createElement, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tareas, setTareas] = useState(
		document.querySelectorAll("li").length
	);

	return (
		<>
			<div className="container">
				<div className="card paper">
					<div className="card-header display-4">
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
									let lista = document.querySelector("ul");
									let item = document.createElement("li");
									item.className = "list-group-item";
									item.innerHTML = `<span><i class="fas fa-minus-circle"></i></span> ${e.target.value}`;
									item.addEventListener("click", function() {
										this.remove();
										setTareas(
											document.querySelectorAll("li")
												.length
										);
									});
									lista.appendChild(item);
									setTareas(
										document.querySelectorAll("li").length
									);
									e.target.value = "";
								}
							}}
						/>
					</div>
					<ul className="list-group list-group-flush"></ul>
					<div className="card-footer">
						Tareas por hacer: {tareas}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
