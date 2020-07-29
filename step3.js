const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const alert = require('alert-node');
const fetch = require('node-fetch');
const { json } = require('body-parser');
const { group } = require('console');
app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);
const students = [];
const groupe = [];

// REQUETE DATA ------------------------------------------------------------------------------------->

async function data() {
	try {
		const responseStudents = await fetch('http://localhost:8080/students');
		const jsonStudents = await responseStudents.json();
		const responseGroupe = await fetch('http://localhost:8080/groups');
		const jsonGroupe = await responseGroupe.json();
		// Supprimer les etudiant deja dans des groupes
		for (i = 0; i < jsonStudents.length; i++) {
            console.log(jsonStudents)
			for (let index = 0; index < jsonGroupe.length; index++) {
                if (jsonStudents.length == 0){
                    console.log('Il n\'y a plus d\'étudiant')
                }
				else if (jsonStudents[i].name == jsonGroupe[index].name[0]) {
					jsonStudents.splice(i, 1);
					i = i - 1;
				} else if (jsonStudents[i].name == jsonGroupe[index].name[1]) {
					jsonStudents.splice(i, 1);
					i = i - 1;
				}
			}
        }
        console.log(jsonStudents)
		students.push(jsonStudents);
		groupe.push(jsonGroupe);
	} catch (e) {
		console.log(e);
	}
}
data();
// REQUETE GET FRONT STUDENTS ------------------------------------------------------------------------------------->

app.get('/students', (req, res) => {
	try {
		async function fetch() {
			try {
				const template = fs.readFileSync('./student.ejs', 'utf-8');
				var html = ejs.render(template, {
					students: students
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

app.post('/students', (req, res) => {
	async function post() {
		try {
			fetch('http://localhost:8080/students', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: req.body.name.toUpperCase()
				})
			})
				.then((res) => res.json())
				.then((json) => console.log(json));
			const template = fs.readFileSync('./student.ejs', 'utf-8');
			students[0].push({
				name: req.body.name.toUpperCase()
			});
			var html = ejs.render(template, {
				students: students
			});
			res.send(html);
		} catch (e) {
			console.log(e);
		}
	}
	post();
});

// REQUETE GET FRONT GROUP ---------------------------------------------------------------------------------->

app.get('/groups', (req, res) => {
	try {
		const template = fs.readFileSync('./groups.ejs', 'utf-8');
		var html = ejs.render(template, {
			groupe: groupe
		});
		res.send(html);
	} catch (error) {
		console.log(error);
	}
});

//REQUETE POST FRONT GROUP  --------------------------------------------------------------------------------->
app.post('/groups', (req, res) => {
	let name = [];
	var index = students[0].length;
	if (students[0].length <= 1) {
		alert('Veuillez rajouter des étudiants');
	} else {
		for (let i = 1; i <= req.body.nbrPersonnes; i++) {
			random = Math.floor(Math.random() * index);
			name1 = students[0][random];
			name.push(name1.name);
			students[0].splice(random, 1);
			index = students[0].length;
		}
		console.log(name);
		console.log(req.body);
		class GROUPE {
			constructor() {
				this.grpName = req.body.grpName;
				this.nbrPersonnes = req.body.nbrPersonnes;
				this.name = name;
			}
		}
		let NGroupe = new GROUPE();
		console.log(NGroupe);
		groupe[0].push(NGroupe);
		if (NGroupe.grpName === '') {
			alert('Nom de groupe manquant');
		} else {
			async function post() {
				try {
					await fetch('http://localhost:8080/groups', {
						method: 'post',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(NGroupe)
					});
				} catch (error) {
					console.log(error);
				}
			}
			post();
		}
	}

	const template = fs.readFileSync('./groups.ejs', 'utf-8');
	var html = ejs.render(template, {
		groupe: groupe
	});
	res.send(html);
});

app.listen(3000, function() {
	console.log('listening on port 3000');
});
