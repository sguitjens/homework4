let startTimerButton = document.getElementById('start-timer');
let timeRemainingField = document.getElementById('time-remaining')
let timeDisplayInterval = 1000 // 1s in ms
let maxTimeout = 10000; // in ms

startTimerButton.addEventListener('click', () => {
  event.preventDefault();
  let t = maxTimeout/1000;
  console.log('INITIAL TIME', t)
  // this does the second countdown, but it doesn't stop
  setInterval(function() {
    t -= 1;
    timeRemainingField.innerHTML = t;
    console.log('TIME', t);
  }, 1000);  
})

function timeFormat(milliseconds) {
  let min = Math.floor(milliseconds / 60000);
  let sec = Math.floor(milliseconds - min * 60000) / 1000
  return min + ':' + sec;
}



// NOTES
// 60000ms/minute
// 