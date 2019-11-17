// const quizQuestions = require('./questions');

let pageTitle = document.getElementById('action-title');
let startQuizButton = document.getElementById('start-timer');
let timeRemainingField = document.getElementById('time-remaining');
let displayHighScoresButton = document.getElementById('high-scores');
let quizArea = document.getElementById('quiz-area');
let timeDisplayInterval = 1000; // 1s in ms
let maxTimeout = 10000; // in ms
let questionDiv = document.createElement("div");
let questionIndex = 0;
let answerDiv = document.createElement("div");
answerDiv.setAttribute("class", "row");
answerDiv.setAttribute("style", "color:red; display: inline-block");
let choiceButtons = [];
let countdown = null;



startQuizButton.addEventListener('click', () => {
  event.preventDefault();
  let t = maxTimeout/1000; // initial time
  // startTimer(t);
  askQuestions();
})

function startTimer(t) { // this works
  // this does the second countdown
  countdown = setInterval(function() {
    t -= 1;
    timeRemainingField.textContent = t;
    console.log('TIME', t);
    if(t === 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

function stopTimer() { 
  clearInterval(countdown);
}

function addTime(sec) { // untested
  t = sec * 1000;
  timeRemainingField.textContent += t;
}

function askQuestions() {
  console.log('askQuestions function, questionIndex =', questionIndex);
  startQuizButton.style.display = 'none';
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
      choiceButtons[i].setAttribute("class", "btn btn-info")
      choiceButtons[i].setAttribute("style", "display: block; margin: 3px")
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
          endQuiz();
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
  // hide all the buttons!
  choiceButtons.forEach(element => {
    console.log('removing element', element);
    element.remove();
  });
  // create all the scoring elements
  // your final score is (score)
  // enter initials with an input field
  // submit button
  let newDiv = document.createElement("div");
  // document.appendChild(newDiv);
  // newDiv
}

displayHighScoresButton.addEventListener('click', () => {
  pageTitle.textContent = 'High Scores'
  startQuizButton.style.display = 'none';
});

function timeFormat(milliseconds) {
  let min = Math.floor(milliseconds / 60000);
  let sec = Math.floor(milliseconds - min * 60000) / 1000
  return min + ':' + sec;
}
