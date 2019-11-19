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
let statusDiv = document.createElement("div");
statusDiv.setAttribute("class", "row text-muted font-italic mt-1 border-top");
let choiceButtons = [];
let countdown = null;
let submitButton = document.createElement("input");
let quizTime = 0;
let finalScore = 0;



startQuizButton.addEventListener('click', () => {
  event.preventDefault();
  let t = maxTimeout/1000; // initial time
  startTimer(t);
  askQuestions();
});

displayHighScoresButton.addEventListener('click', () => {
  event.preventDefault();
  if(pageTitle.textContent != 'High Scores') {
    highScoresElements();
  }
});

submitButton.addEventListener('click', () => {
  event.preventDefault();
  
  // TODO: do some validation on the scores before putting in storage
  let userScore = document.getElementById("initials").value + " - " + finalScore;
  if(!localStorage.getItem('scoreArray')) {
    let scores = [userScore];
    localStorage.setItem('scoreArray', JSON.stringify(scores));
  } else {
    let scores = JSON.parse(localStorage.getItem('scoreArray'));
    scores.push(userScore);
    localStorage.setItem('scoreArray', JSON.stringify(scores));
  }
  
  answerDiv.remove();
  statusDiv.remove();
  highScoresElements();
});

function highScoresElements() {
  event.preventDefault();
  if (choiceButtons) {
    choiceButtons.forEach(element => {
    element.remove();
    });
  };

  pageTitle.textContent = 'High Scores'
  startQuizButton.style.visibility = "hidden";
  if(localStorage.getItem('scoreArray')) {
  };
  
  // create the score list elements
  let scoreList = document.createElement("ol");
  scoreList.setAttribute("id", "scores-list");
  quizArea.appendChild(scoreList);
  let scores = JSON.parse(localStorage.getItem('scoreArray'));
  // list the scores
  // TODO: sort the scores
  scores.forEach((item) => {
    let userScore = document.createElement("li");
    userScore.textContent = item;
    scoreList.appendChild(userScore);
  })
  let buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("id", "score-list-buttons")
  let btn = document.createElement("button");
  btn.textContent = "Go Back"
  btn.setAttribute("class", "btn btn-info");
  btn.setAttribute("style", "display: block; margin: 3px");
  btn.addEventListener('click', () => {
    let list = document.getElementById("scores-list");
    console.log(list);
    list.remove();
    let scoreButtons = document.getElementById("score-list-buttons");
    scoreButtons.remove();
    resetGame();
  });
  buttonDiv.appendChild(btn);
  btn = document.createElement("button");
  btn.textContent = "Clear High Scores"
  btn.setAttribute("class", "btn btn-info");
  btn.setAttribute("style", "margin: 3px");
  btn.addEventListener('click', () => {
    localStorage.clear();
  });
  buttonDiv.appendChild(btn);
  quizArea.appendChild(buttonDiv);
};

function updateScoreList() {
  for(let i = 0; i < scoreArray.length; ++i) {
    let userScore = document.createElement("li");
    userScore.textContent = scoreArray[i];
    scoreList.appendChild(userScore);
  };
};

function putInLocalStorage(initials, score) {
  if(!localStorage.getItem('scoreArray')) {
    localStorage.addItem('scoreArray', []);
  };
  scoreArray.push(initials + " - " + score);
};

function startTimer(t) { // this works
  // this does the second countdown
  quizTime = t;
  countdown = setInterval(function() {
    quizTime -= 1;
    timeRemainingField.textContent = quizTime;
    if(quizTime <= 0) {
      clearInterval(countdown);
      endQuiz(0);
    };
  }, 1000);
};

function stopTimer() { 
  clearInterval(countdown);
  // TODO: might need to also zero out the timer
};

function dockTime(sec) {
  quizTime -= sec;
};

function resetGame() {
  startQuizButton.style.visibility = "visible"
  pageTitle.textContent = "Coding Quiz Challenge"
  questionIndex = 0;
}

function askQuestions() {
  startQuizButton.style.visibility = "hidden";
  if(questionIndex === questions.length - 1) {
    return;
  };
  displayQuestion(questionIndex);
};

function displayQuestion(questionIndex) {
  pageTitle.textContent = questions[questionIndex].title;
  quizArea.appendChild(answerDiv);
  quizArea.appendChild(statusDiv);
  // the first time through, create the choice buttons with no text in them
  if(choiceButtons.length === 0) {
    for(let i = 0; i < 4; ++i){
      choiceButtons[i] = document.createElement("button");
      answerDiv.appendChild(choiceButtons[i]);
      choiceButtons[i].setAttribute("class", "btn btn-info")
      choiceButtons[i].setAttribute("style", "display: block; margin: 3px")
      choiceButtons[i].addEventListener('click', () => {
        event.preventDefault();
        if(questions[questionIndex].answer === choiceButtons[i].textContent) {
          statusDiv.textContent = "CORRECT!";
        } else {
          statusDiv.textContent = "WRONG!";
          dockTime(10);
        };
        questionIndex ++;
        if(questionIndex < questions.length) {
          displayQuestion(questionIndex);
        } else {
          
          quizTime = quizTime < 0 ? 0 : quizTime;
          endQuiz(quizTime);
          finalScore = quizTime;
        };
      });
    };
  };
  // add the text to the buttons
  for(let i = 0; i < 4; ++i) {
    choiceButtons[i].textContent = questions[questionIndex].choices[i];
  };
}

function endQuiz(score) {
  let scoreReport = document.createElement("div");
  let enterInitials = document.createElement("form");

  stopTimer();
  timeRemainingField.textContent = 0;
  pageTitle.textContent = 'All Done!';

  choiceButtons.forEach(element => {
    element.remove();
  });
  
  scoreReport.textContent = "Your final score is " + score;
  answerDiv.appendChild(scoreReport);
  
  enterInitials.innerHTML = "\<div class=\"form-group\"\>Enter your initials: <input id=\"initials\" type=\"text\" name=\"intials: \">\<\/div\>";
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "submit");
  submitButton.setAttribute("class", "btn btn-success");
  enterInitials.appendChild(submitButton);
  answerDiv.appendChild(enterInitials);
}

function timeFormat(milliseconds) {
  let min = Math.floor(milliseconds / 60000);
  let sec = Math.floor(milliseconds - min * 60000) / 1000
  return min + ':' + sec;
}
