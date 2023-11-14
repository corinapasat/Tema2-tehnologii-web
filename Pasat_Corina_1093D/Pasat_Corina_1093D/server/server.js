const express = require('express');
const {join, resolve} = require('path');
const PORT = process.env.PORT || 8080;
const {getTasksByStatus, changeTaskStatus} = require('./service')('tasks.json');
express()
    .use(express.static(join(resolve('..'), 'client')))
// Aceasta linie creează o nouă aplicație Express și îi spune să servească fișierele statice din directorul client, care este în directorul părinte al directorului curent.


    .get('/tasks', (request, response) => {
        const tasks = getTasksByStatus();
//Aceasta linie definește un răspuns la cererile GET la ruta /tasks. Răspunde cu un obiect JSON care conține sarcinile, sau cu un cod de stare 204 dacă nu există sarcini.


        if(Object.keys(tasks).length > 0) {
            response.json(tasks);
        } else {




            response.sendStatus(204);
        }
    })
    .put('/tasks', (request, response) => {
        //Aceasta linie definește un răspuns la cererile PUT la ruta /tasks. Schimbă starea unei sarcini dacă sunt furnizate toate parametrii necesari, sau răspunde cu un cod de stare 400 dacă nu sunt.
        if (request.query.task && request.query.oldStatus && request.query.newStatus) {


            if (changeTaskStatus(request.query.task, request.query.oldStatus, request.query.newStatus)) {
                response.sendStatus(204);


            } else {
                response.sendStatus(403);


            }
        } else {
            response.sendStatus(400);
        }
    })
    .listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
    //Aceasta linie începe să asculte pe portul specificat și afișează un mesaj în consolă când serverul începe să ruleze.