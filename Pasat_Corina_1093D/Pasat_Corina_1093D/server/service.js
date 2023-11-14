const {existsSync, readFileSync, writeFileSync, readFile} = require('fs');
module.exports = function(path) { //Aceasta linie exportă o funcție care primește un parametru path, care este calea către un fișier.
    function readTasks() { //Aceasta este o funcție internă care citește sarcinile din fișierul specificat de path. Dacă fișierul există, el este citit și conținutul său este returnat ca un obiect JavaScript. Dacă fișierul nu există, este returnat un obiect gol.
        if(existsSync(path)) {

            return JSON.parse(readFileSync(path))
        } else {


            return {}
        }
    }

    return {
        
        getTasksByStatus() { //Aceasta este o metodă a obiectului returnat de funcția exportată, care returnează toate sarcinile citite din fișier.

            const tasks = readTasks();

            return tasks;
        },

        changeTaskStatus(task, oldStatus, newStatus) {
//Aceasta este o altă metodă a obiectului returnat de funcția exportată. Ea schimbă starea unei sarcini, dacă sarcina există în starea veche și dacă starea nouă este validă. Dacă schimbarea este reușită, ea scrie noile sarcini în fișier și returnează true. Dacă schimbarea nu este reușită, ea returnează false
            const tasks = readTasks();

            if (tasks[oldStatus] instanceof Array && tasks[newStatus] instanceof Array) {

                let index = tasks[oldStatus].findIndex(t => t === task);

                if (index) {

                    tasks[oldStatus].splice(index, 1);

                    tasks[newStatus].push(task);

                    writeFileSync(path, JSON.stringify(tasks));

                    return true;
                }
            }
            return false;
        }
    };
};