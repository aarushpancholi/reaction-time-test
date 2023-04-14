const main = document.getElementById("main");
let attemptNumber = localStorage.getItem("attempt") == null ? 0 : localStorage.getItem("attempt");
document.getElementById("attemptNo").innerHTML = "Attempt #" + attemptNumber;
const headerText = document.getElementById("header");
let time = 0;
let timeGreen;
let interval;
let running = false;
const date = new Date();


main.addEventListener("click", function () {
    if (headerText.innerHTML == "Click!") {
        clicked();
    } else if (headerText.innerHTML == "Click anywhere when the background turns green") {
        tooFast();
    } else {
        round();
    }
});


function round() {
    attemptNumber++;
    localStorage.setItem("attempt", attemptNumber);
    document.getElementById("attemptNo").innerHTML = "Attempt #" + attemptNumber;
    clearTimeout(timeGreen);

    headerText.innerHTML = "Click anywhere when the background turns green";
    running = 'waiting'
    document.querySelector("body").style.backgroundColor = "rgba(71, 133, 203, 1)";

    var timeTillGreen = Math.random() * 4 + 2;

    timeGreen = setTimeout(() => {
        document.querySelector("body").style.backgroundColor = "rgba(0, 249, 84, 1)";
        headerText.innerHTML = "Click!";
        startTimer();
        running = true;
    }, timeTillGreen * 1000)
}

function startTimer() {
    time = 0;
    interval = setInterval(() => { time += 10 }, 10)
}

function stopTimer() {
    clearInterval(interval);
    running = "betweenRound";
    return time;
}

document.getElementById("viewPast").addEventListener("click", function () {
    var tableAP = createAP();
    for (var i = attemptNumber; i >= 1; i--) {
        var tr = document.createElement("tr");
        tableAP.appendChild(tr);

        var column1 = document.createElement("td");
        var column2 = document.createElement("td");
        var column3 = document.createElement("td");

        column1.innerHTML = i;
        column2.innerHTML = localStorage.getItem(i) + " ms";
        column3.innerHTML = localStorage.getItem(i + "d");

        tr.appendChild(column1);
        tr.appendChild(column2);
        tr.appendChild(column3);
    }
})

document.onkeypress = function (e) {
    e = e || window.event;
    if (e.code.toLowerCase() == "space") {
        if (running == true) {
            clicked();
        } else if (running == "betweenRound") {
            console.log("here")
            round();
        } else if (running == "waiting") {
            tooFast();
        }
    } else if(e.code.toLowerCase() == "escape") {
        destroyAP();
    }
};

function clicked() {
    var reaction = stopTimer();
    console.log(reaction);
    headerText.innerHTML = reaction + " ms! Click to try again."
    localStorage.setItem(attemptNumber, reaction);
    localStorage.setItem(attemptNumber + "d", date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
}

function tooFast() {
    headerText.innerHTML = "Too fast! Click to try again"
    clearTimeout(timeGreen);
    attemptNumber--;
    document.querySelector("body").style.backgroundColor = "red";
    running = "betweenRound";
}

function createAP() {
    var body = document.querySelector("body");
    var white = document.createElement("div");
    var black = document.createElement("div");
    body.appendChild(white);
    body.appendChild(black);
    white.classList.add("whiteBack");
    black.classList.add("blackBack");

    var headW = document.createElement("h1");
    white.appendChild(headW);
    headW.innerHTML = "Attempts";
    headW.classList.add("headW");

    var tbBack = document.createElement("div");
    white.appendChild(tbBack);
    tbBack.style.height = "30vh";
    tbBack.style.overflow = "auto";

    var table = document.createElement("table");
    table.classList.add("aTable");
    tbBack.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var row1 = document.createElement("th");
    var row2 = document.createElement("th");
    var row3 = document.createElement("th");
    row1.innerHTML = "No.";
    row2.innerHTML = "Time";
    row3.innerHTML = "Date";
    tr.appendChild(row1);
    tr.appendChild(row2);
    tr.appendChild(row3);

    black.addEventListener("click", function () {
        destroyAP();
    })

    var tb = document.createElement("tbody");
    table.appendChild(tb);
    return tb;
}

function destroyAP() {
    document.getElementsByClassName("whiteBack")[0].remove();
    document.getElementsByClassName("blackBack")[0].remove();
}


