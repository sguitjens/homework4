// const quizQuestions = require('./questions');

let pageTitle = document.getElementById('action-title');
let startTimerButton = document.getElementById('start-timer');
let timeRemainingField = document.getElementById('time-remaining')
let displayHighScoresButton = document.getElementById('high-scores')
let timeDisplayInterval = 1000 // 1s in ms
let maxTimeout = 10000; // in ms
let questionDiv = document.createElement("div") // need to create this as a child of the current page
// let isAnswered = false;
/*
      var newDiv = document.createElement("div");

      // We then give this newDiv the text "A pleasure to meet you!".
      newDiv.textContent = "A pleasure to meet you!";

      // Now we use the ".appendChild" method to combine the two divs together on the page.
      targetDiv.appendChild(newDiv);
*/
let answerDiv = ''; // need to create this as a child of the current page

startTimerButton.addEventListener('click', () => {
  event.preventDefault();
  let t = maxTimeout/1000; // initial time
  // startTimer(t);
  askQuestions();
})

function startTimer(t) { // this works
  // this does the second countdown
  var countdown = setInterval(function() {
    t -= 1;
    timeRemainingField.textContent = t;
    console.log('TIME', t);
    if(t === 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

function stopTimer() { 
  clearInterval(countdown); // this won't work
}

function addTime(sec) { // untested
  t = sec * 1000;
  timeRemainingField.textContent += t;
}

function askQuestions() {
  let result = false;
  questions.forEach(question => {
    displayQuestion(question);
  })
  console.log('result', result);
  return result;
};


function displayQuestion(question) {
  // let result = false;
  isAnswered = false;
  let newDiv = document.createElement("div");
  pageTitle.textContent = question.title;
  pageTitle.appendChild(newDiv);
  question.choices.forEach(choice => {
    let choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    newDiv.appendChild(choiceButton);
    // choiceButton.addEventListener('click', () => {
    //   if(question.answer === choiceButton.textContent) {
    //     console.log("this is the correct answer");

    //   } else {
    //     console.log("WRONG!");
    //     result = false;
    //   }
    // });
  });
}

function answerQuestion() {

  //return true or false
}

displayHighScoresButton.addEventListener('click', () => {
  pageTitle.textContent = 'High Scores'
  startTimerButton.style.display = 'none';
  
});

function newFunction() {
  return document.getElementById('action-title');
}

// function quizRunner() {
//   quizQuestions.questions.forEach(question) {
//     answerDiv = clearPreviousAnswer;
//     questionDiv = question.title;

//   }
// }

function timeFormat(milliseconds) {
  let min = Math.floor(milliseconds / 60000);
  let sec = Math.floor(milliseconds - min * 60000) / 1000
  return min + ':' + sec;
}



// NOTES
// 60000ms/minute
// 