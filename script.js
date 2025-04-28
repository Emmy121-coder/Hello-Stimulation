function initLock() {
    startTimer(5 * 60); // 5 minutes countdown
    playAlarm();
    triggerVibration();
    preventBackNavigation();
    requestFullscreen();
}

function requestFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.mozRequestFullScreen) { /* Firefox */
        el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { /* IE/Edge */
        el.msRequestFullscreen();
    }
}

function playAlarm() {
    const alarm = document.getElementById('alarm');
    alarm.play().catch(() => {
        console.log("Alarm sound auto-play may be blocked.");
    });
}

function triggerVibration() {
    if (navigator.vibrate) {
        setInterval(() => {
            navigator.vibrate([500, 500, 500]);
        }, 3000); // Vibrate every 3 seconds
    }
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerDisplay = document.getElementById('timer');
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}

function unlockDevice() {
    alert("This was a simulation. Your device is safe!");
    window.location.href = "https://www.google.com"; // Redirect to safe page
}

function preventBackNavigation() {
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function (event) {
        history.pushState(null, document.title, location.href);
        alert("You cannot go back! Your device is locked!");
    });
}