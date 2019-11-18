// const quizQuestions = require('./questions');

let pageTitle = document.getElementById('action-title');
let startQuizButton = document.getElementById('start-timer');
let timeRemainingField = document.getElementById('time-remaining');
let displayHighScoresButton = document.getElementById('high-scores');
let quizArea = document.getElementById('quiz-area');
let timeDisplayInterval = 1000; // 1s in ms
let maxTimeout = 30000; // in ms
let questionDiv = document.createElement("div");
let questionIndex = 0;
let answerDiv = document.createElement("div");
answerDiv.setAttribute("class", "row answer-div");
answerDiv.setAttribute("style", "display: inline-block");
let statusDiv = document.createElement("div");  // HERE!!!!
statusDiv.setAttribute("class", "row text-muted font-italic mt-1 border-top"); // top border margin move it over
let choiceButtons = [];
let countdown = null;
let submitButton = document.createElement("input");
let quizTime = 0;
let scoreArray = [];



startQuizButton.addEventListener('click', () => {
  event.preventDefault();
  let t = maxTimeout/1000; // initial time
  startTimer(t);
  askQuestions();
});

displayHighScoresButton.addEventListener('click', () => {
  event.preventDefault();
  if(pageTitle.textContent != 'High Scores') {
    generateHighScores();
  }
})

function generateHighScores() {
  event.preventDefault();
  if (choiceButtons) {
    choiceButtons.forEach(element => {
    console.log('removing element', element);
    element.remove();
    });
  }

  pageTitle.textContent = 'High Scores'
  startQuizButton.style.display = 'none';
  // TODO: get the initials and scores from local storage
  // TODO: if there is an array in local storage called "highscores", then add to it
  if(localStorage.getItem('scoreArray')) {
    scoreArray = localStorage.getItem("scoreArray");
    console.log("GOT THE ARRAY FROM LOCAL STORAGE")
  }
  console.log('scoreArray = ', scoreArray);
  
  // create the score list elements
  let scoreList = document.createElement("ol");
  quizArea.appendChild(scoreList);
  for(let i = 0; i < scoreArray.length; ++i) {
    let userScore = document.createElement("li");
    userScore.textContent = scoreArray[i];
    scoreList.appendChild(userScore);
    console.log('LIST', scoreArray[i])
  }
  let buttonDiv = document.createElement("div");
  let btn = document.createElement("button");
  btn.textContent = "Go Back"
  btn.setAttribute("class", "btn btn-info");
  btn.setAttribute("style", "display: block; margin: 3px");
  btn.addEventListener('click', () => {
    // reset and start game again
    // remove all the children of qiuzArea;
    // reset score
  })
  buttonDiv.appendChild(btn);
  btn = document.createElement("button");
  btn.textContent = "Clear High Scores"
  btn.setAttribute("class", "btn btn-info");
  btn.setAttribute("style", "margin: 3px");
  btn.addEventListener('click', () => {
    localStorage.clear();
  })
  buttonDiv.appendChild(btn);
  quizArea.appendChild(buttonDiv);
};

function putInLocalStorage(initials, score) {
  if(!localStorage.getItem('scoreArray')) {
    localStorage.addItem('scoreArray', []);
  }
  scoreArray.append(initials + " - " + score);
  console.log('LOCAL STORAGE = ', localStorage.getItem('scoreArray'))
}

submitButton.addEventListener('click', () => {
  event.preventDefault();
  
  console.log('CLICKED SUBMIT', document.getElementById("initials").value);
  localStorage.setItem("scoreArray", document.getElementById("initials").value + " - " + localStorage.setItem("score", quizTime));
  // localStorage.setItem("score", quizTime);
  
  answerDiv.remove();
  statusDiv.remove();
  generateHighScores();
})

function startTimer(t) { // this works
  // this does the second countdown
  quizTime = t;
  countdown = setInterval(function() {
    quizTime -= 1;
    timeRemainingField.textContent = quizTime;
    console.log('TIME', quizTime);
    if(quizTime <= 0) {
      clearInterval(countdown);
      endQuiz(0);
    }
  }, 1000);
}

function stopTimer() { 
  clearInterval(countdown);
    // clearTimeout(myVar);
  // TODO: might need to also zero out the timer
}

function dockTime(sec) {
  quizTime -= sec;
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
  quizArea.appendChild(statusDiv);
  // the first time through, create the choice buttons with no text in them
  console.log('choice buttons length', choiceButtons.length);
  if(choiceButtons.length === 0) {
    for(let i = 0; i < 4; ++i){
      choiceButtons[i] = document.createElement("button");
      answerDiv.appendChild(choiceButtons[i]);
      choiceButtons[i].setAttribute("class", "btn btn-info")
      choiceButtons[i].setAttribute("style", "display: block; margin: 3px")
      choiceButtons[i].addEventListener('click', () => {
        event.preventDefault();
        if(questions[questionIndex].answer === choiceButtons[i].textContent) {
          console.log("this is the correct answer");
          statusDiv.textContent = "CORRECT!";
        } else {
          console.log("WRONG!");
          statusDiv.textContent = "WRONG!";
          dockTime(10);
        }
        questionIndex ++;
        if(questionIndex < questions.length) {
          displayQuestion(questionIndex);
        } else {
          console.log("END QUIZ");
          
          // TODO: don't let the display show negative time
          quizTime = quizTime < 0 ? 0 : quizTime;
          endQuiz(quizTime);
          // finalScore = quizTime;
        }
      });
    }
  }
  // add the text to the buttons
  console.log('choice buttons array', choiceButtons);
  for(let i = 0; i < 4; ++i) {
    choiceButtons[i].textContent = questions[questionIndex].choices[i];
  };
}

function endQuiz(score) {
  let scoreReport = document.createElement("div");
  let enterInitials = document.createElement("form");

  timeRemainingField.textContent = 0;
  pageTitle.textContent = 'All Done!';

  choiceButtons.forEach(element => {
    console.log('removing element', element);
    element.remove();
  });

  stopTimer();
  
  scoreReport.textContent = "Your final score is " + score;
  answerDiv.appendChild(scoreReport);
  
  enterInitials.innerHTML = "\<div class=\"form-group\"\>Enter your initials: <input id=\"initials\" type=\"text\" name=\"intials: \">\<\/div\>";
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "submit");
  submitButton.setAttribute("class", "btn btn-info");
  enterInitials.appendChild(submitButton);
  answerDiv.appendChild(enterInitials);
}

function timeFormat(milliseconds) {
  let min = Math.floor(milliseconds / 60000);
  let sec = Math.floor(milliseconds - min * 60000) / 1000
  return min + ':' + sec;
}
