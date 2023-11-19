let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;


function ssTimer() {
    if (!isRunning) {
        timer = setInterval(updateTimer, 100);
        isRunning = true;
    }
    else {
      clearInterval(timer);
      isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

document.getElementById('ssBtn').addEventListener('click', ssTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);