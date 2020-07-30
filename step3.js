const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");
const alert = require("alert");
const fetch = require("node-fetch");
const {
	json
} = require("body-parser");
const {
	group
} = require("console");
app.use(express.static(__dirname + "/static"));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
const students = [];
const groupe = [];
const groupetriée = [];

// REQUETE DATA ------------------------------------------------------------------------------------->

async function data() {
	try {
		const responseStudents = await fetch("http://localhost:8080/students");
		const jsonStudents = await responseStudents.json();
		const responseGroupe = await fetch("http://localhost:8080/groups");
		const jsonGroupe = await responseGroupe.json();
		// Supprimer les etudiant deja dans des groupes
		for (i = 0; i < jsonStudents.length; i++) {
			for (let index = 0; index < jsonGroupe.length; index++) {
				if (jsonStudents.length == 0) {
					console.log("Il n'y a plus d'étudiant");
				} else if (jsonStudents[i].name == jsonGroupe[0].name[index]) {
					jsonStudents.splice(i, 1);
					if (i != 0) {
						i = i - 1;
						break;
					} else {
						i = -1;
						break;
					}
				} else if (jsonStudents[i].name == jsonGroupe[1].name[index]) {
					jsonStudents.splice(i, 1);
					if (i != 0) {
						i = i - 1;
						break;
					} else {
						i = -1;
						break;
					}
				}
			}
		}
		//  Trier les groupes par nom de groupe
		students.push(jsonStudents);

		groupe.push(jsonGroupe);


		let tempon = groupetriée.length;
		groupetriée.push(new Array(groupe[0][0])); // initialization length
		for (let index = 0; index < jsonGroupe.length; index++) {
			for (let i = 0; i <= tempon; i++) {
				if (groupe[0][index].grpName == groupetriée[0][i].grpName) {
					groupetriée[i].push(groupe[0][index]);
				} else if (groupe[0][index].grpName != undefined) {
					groupetriée.push(new Array(groupe[0][index]));
				}
			}
		}

	} catch (e) {
		console.log(e);
	}
}
data();
// REQUETE GET FRONT STUDENTS ------------------------------------------------------------------------------------->

app.get("/students", (req, res) => {
	try {
		async function fetch() {
			try {
				const template = fs.readFileSync("./student.ejs", "utf-8");
				var html = ejs.render(template, {
					students: students,
				});
				res.send(html);
			} catch (e) {
				console.log(e);
			}
		}
		fetch();
	} catch (e) {
		console.log(e);
	}
});

//REQUETE POST FRONT STUDENT ---------------------------------------------------------------------------------->

app.post("/students", (req, res) => {
	async function post() {
		try {
			if (req.body.name === "") {
				alert("Veuiller écrire un nom d'étudiant");
			} else {
				fetch("http://localhost:8080/students", {
						method: "post",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: req.body.name.toUpperCase(),
						}),
					})
					.then((res) => res.json())
					.then((json) => console.log(json));
				students[0].push({
					name: req.body.name.toUpperCase(),
				});
			}
			const template = fs.readFileSync("./student.ejs", "utf-8");
			var html = ejs.render(template, {
				students: students,
			});
			res.send(html);
		} catch (e) {
			console.log(e);
		}
	}
	post();
});

// REQUETE GET FRONT GROUP ---------------------------------------------------------------------------------->

app.get("/groups", (req, res) => {
	try {
		const template = fs.readFileSync("./groups.ejs", "utf-8");
		var html = ejs.render(template, {
			groupe: groupetriée,
		});
		res.send(html);
	} catch (error) {
		console.log(error);
	}
});

//REQUETE POST FRONT GROUP  --------------------------------------------------------------------------------->
app.post("/groups", (req, res) => {
	let name = [];
	var index = students[0].length;
	if (req.body.grpName === "") {
		alert("Nom du projet manquant");
	} else if (req.body.nbrPersonnes === "") {
		alert("Nombres de personnes manquantes");
	} else {
		if (students[0].length <= 1) {
			alert("Veuillez rajouter des étudiants");
		} else {
			for (let i = 1; i <= req.body.nbrPersonnes; i++) {
				random = Math.floor(Math.random() * index);
				name1 = students[0][random];
				name.push(name1.name);
				students[0].splice(random, 1);
				index = students[0].length;
			}
			class GROUPE {
				constructor() {
					this.grpName = req.body.grpName;
					this.nbrPersonnes = req.body.nbrPersonnes;
					this.name = name;
				}
			}
			let NGroupe = new GROUPE();
			groupe.push(NGroupe);

			async function post() {
				try {
					await fetch("http://localhost:8080/groups", {
						method: "post",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(NGroupe),
					});
				} catch (error) {
					console.log(error);
				}
			}
			post();
		}
	}

	const template = fs.readFileSync("./groups.ejs", "utf-8");
	var html = ejs.render(template, {
		groupe: groupe,
	});
	res.send(html);
});

app.listen(3000, function () {
	console.log("listening on port 3000");
});