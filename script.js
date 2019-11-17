// const quizQuestions = require('./questions');

let pageTitle = document.getElementById('action-title');
let startTimerButton = document.getElementById('start-timer');
let timeRemainingField = document.getElementById('time-remaining');
let displayHighScoresButton = document.getElementById('high-scores');
let quizArea = document.getElementById('quiz-area');
let timeDisplayInterval = 1000 // 1s in ms
let maxTimeout = 10000; // in ms
let questionDiv = document.createElement("div") // need to create this as a child of the current page
let questionIndex = 0;
let answerDiv = document.createElement("div");
answerDiv.setAttribute("class", "row");
answerDiv.setAttribute("style", "color:red; border: 1px solid blue;");
let choiceButtons = [];



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
  console.log('askQuestions function, questionIndex =', questionIndex);
  startTimerButton.style.display = 'none';
  if(questionIndex === questions.length - 1) {
    console.log("FINISHED");
    return;
  }
  displayQuestion(questionIndex);
};

function displayQuestion(questionIndex) {
  pageTitle.textContent = questions[questionIndex].title;
  quizArea.appendChild(answerDiv);
  // the first time through we create the choice buttons with no text in them
  console.log('choice buttons length', choiceButtons.length);
  if(choiceButtons.length === 0) {
    for(let i = 0; i < 4; ++i){
      choiceButtons[i] = document.createElement("button");
      answerDiv.appendChild(choiceButtons[i]);
      choiceButtons[i].setAttribute("class", "btn btn-dark")
      choiceButtons[i].setAttribute("style", "background-color: darkblue; color: white");
      choiceButtons[i].addEventListener('click', () => {
        if(questions[questionIndex].answer === choiceButtons[i].textContent) {
          console.log("this is the correct answer");
        } else {
          console.log("WRONG!");
        }
        questionIndex ++;
        if(questionIndex < questions.length) {
          displayQuestion(questionIndex);
        } else {
          console.log("END QUIZ");
          // TODO; call endQuiz function
        }
      });
    }
  }
  // then we add the text
  console.log('choice buttons array', choiceButtons);
  for(let i = 0; i < 4; ++i) {
    choiceButtons[i].textContent = questions[questionIndex].choices[i];
  };
  // TODO: add styling to all the divs
}

function endQuiz() {
  pageTitle.textContent = 'All Done!';
  let newDiv = document.createElement("div");
  document.appendChild(newDiv);
  newDiv
}

displayHighScoresButton.addEventListener('click', () => {
  pageTitle.textContent = 'High Scores'
  startTimerButton.style.display = 'none';
});

function timeFormat(milliseconds) {
  let min = Math.floor(milliseconds / 60000);
  let sec = Math.floor(milliseconds - min * 60000) / 1000
  return min + ':' + sec;
}
