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
statusDiv.setAttribute("class", "row text-muted font-italic");
let choiceButtons = [];
let countdown = null;
let quizTime = 0;



startQuizButton.addEventListener('click', () => {
  event.preventDefault();
  let t = maxTimeout/1000; // initial time
  startTimer(t);
  askQuestions();
});

displayHighScoresButton.addEventListener('click', () => {
  // TODO: clear out the contents of the answer-div
  choiceButtons.forEach(element => {
    console.log('removing element', element);
    element.remove();
  });
  // TODO: put the initials and score into local storage
  pageTitle.textContent = 'High Scores'
  startQuizButton.style.display = 'none';
});

function startTimer(t) { // this works
  // this does the second countdown
  quizTime = t;
  countdown = setInterval(function() {
    quizTime -= 1;
    timeRemainingField.textContent = quizTime;
    console.log('TIME', quizTime);
    if(quizTime <= 0) {
      clearInterval(countdown);
      // TODO: end quiz
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
          
          // TODO: what happens if time goes negative?
          quizTime = quizTime < 0 ? 0 : quizTime;
          endQuiz(quizTime);
        }
      });
    }
  }
  // add the text to the buttons
  console.log('choice buttons array', choiceButtons);
  for(let i = 0; i < 4; ++i) {
    choiceButtons[i].textContent = questions[questionIndex].choices[i];
  };
  // TODO: add styling to all the divs
}

function endQuiz(score) {
  pageTitle.textContent = 'All Done!';
  // get rid of all the buttons!
  choiceButtons.forEach(element => {
    console.log('removing element', element);
    element.remove();
  });
  stopTimer();
  // TODO: create all the scoring elements
  // your final score is (score) - put inside class answer-div
  let scoreReport = document.createElement("div");
  scoreReport.textContent = "Your final score is " + score;
  answerDiv.appendChild(scoreReport)
  let enterInitials = document.createElement("form");
  // TODO: set attrubute of form to have action of saving to local storage
  enterInitials.innerHTML = "\<div class=\"form-group\"\>Enter your initials: <input type=\"text\" name=\"intials: \">\<\/div\>";
  // TODO: add submit button
  let submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "submit");
  enterInitials.appendChild(submitButton);
  answerDiv.appendChild(enterInitials);

/*
<form action="/action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form> 
*/
}

function timeFormat(milliseconds) {
  let min = Math.floor(milliseconds / 60000);
  let sec = Math.floor(milliseconds - min * 60000) / 1000
  return min + ':' + sec;
}
