// const quizQuestions = require('./questions');

let pageTitle = document.getElementById('action-title');
let startTimerButton = document.getElementById('start-timer');
let timeRemainingField = document.getElementById('time-remaining')
let displayHighScoresButton = document.getElementById('high-scores')
let timeDisplayInterval = 1000 // 1s in ms
let maxTimeout = 10000; // in ms
let questionDiv = document.createElement("div") // need to create this as a child of the current page
let questionIndex = 0;
// let isAnswered = false;

/*
      var newDiv = document.createElement("div");

      // We then give this newDiv the text "A pleasure to meet you!".
      newDiv.textContent = "A pleasure to meet you!";

      // Now we use the ".appendChild" method to combine the two divs together on the page.
      targetDiv.appendChild(newDiv);
*/
let answerDiv = document.createElement("div");
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
  if(questionIndex === questions.length - 1) {
    console.log("FINISHED");
    return;
  }
  displayQuestion(questionIndex);
};

      // // clean up answers
      // let test = answerDiv.children;
      // console.log(test);
      // for(let i = 0; i < test.length; ++i) {
      //   console.log('removing', test[i]);
      //   test[i].remove();
      // }
      // // test.forEach(function(child) {
      // //   child.remove();
      // // });

      // choiceButtons[0] = document.createElement("button");
// choiceButtons[0].setAttribute("style", "background-color: darkblue; color: white");
// answerDiv.appendChild(choiceButtons[0]);
// choiceButton.textContent = choice;


function displayQuestion(questionIndex) {
  pageTitle.textContent = questions[questionIndex].title;
  pageTitle.appendChild(answerDiv);
  // the first time through we create the choice buttons with nothing in them
  console.log('choice buttons length', choiceButtons.length);
  if(choiceButtons.length === 0) {
    for(let i = 0; i < 4; ++i){
      choiceButtons[i] = document.createElement("button");
      answerDiv.appendChild(choiceButtons[i]);
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
  console.log('choice buttons array', choiceButtons);
  for(let i = 0; i < 4; ++i) {
    choiceButtons[i].textContent = questions[questionIndex].choices[i];
  };


  // questions[questionIndex].choices.forEach(choice => {
  //   choiceButton.textContent = choice;
  //   choiceButton.addEventListener('click', () => {
  //     if(questions[questionIndex].answer === choiceButton.textContent) {
  //       console.log("this is the correct answer");
  //     } else {
  //       console.log("WRONG!");
  //     }
  //     questionIndex ++;
  //     if(questionIndex < questions.length) {
  //       displayQuestion(questionIndex);
  //     } else {
  //       console.log("END QUIZ");
  //       // TODO; call endQuiz function
  //     }
  //   });
  // });
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
