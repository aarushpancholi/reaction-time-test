var main = document.getElementById("main");
var attemptNumber = localStorage.getItem("attempt") == null ? 0 : localStorage.getItem("attempt");
document.getElementById("attemptNo").innerHTML = "Attempt #" + attemptNumber;
var headerText = document.getElementById("header");
var time = 0;
var timeGreen;
var interval;
var running = false;


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
    for (var i = 1; i <= attemptNumber; i++) {
        console.log(localStorage.getItem(i));
    }
})

document.onkeypress = function (e) {
    e = e || window.event;
    if(e.keyCode == 32) {
        if(running == true) {
            clicked();
        } else if(running == "betweenRound") {
            console.log("here")
            round();
        } else if(running == "waiting") {
            tooFast();
        }
    } 
};

function clicked() {
    var reaction = stopTimer();
        console.log(reaction);
        headerText.innerHTML = reaction + " ms! Click to try again."
        localStorage.setItem(attemptNumber, reaction);
}

function tooFast() {
    headerText.innerHTML = "Too fast! Click to try again"
    clearTimeout(timeGreen);
    attemptNumber--;
    document.querySelector("body").style.backgroundColor = "red";
    running = "betweenRound";
}