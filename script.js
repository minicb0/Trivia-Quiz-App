//Question Data Base quizDB
const quizDB = [
    {
        question: "Q1 What Indian city is the capital of two states?",
        a: "Mumbai",
        b: "Chandigarh",
        c: "Kolkata",
        d: "Chennai",
        ans: "option2"
    },
    {
        question: "Q2 How many countries border India?",
        a: "6",
        b: "9",
        c: "2",
        d: "14",
        ans: "option1"
    },
    {
        question: "Q3 In which state is the main language Khasi?",
        a: "Mizoram",
        b: "Nagaland",
        c: "Meghalaya",
        d: "Tripura",
        ans: "option3"
    },
    {
        question: "Q4 In what state is the Elephant Falls located?",
        a: "Mizoram",
        b: "Orissa",
        c: "Manipur",
        d: "Meghalaya",
        ans: "option4"
    },
    {
        question: "Q5 Which of the following states is not located in the North?",
        a: "Jharkhand",
        b: "Jammu and Kashmir",
        c: "Himachal Pradesh",
        d: "Haryana",
        ans: "option1"
    },
    {
        question: "Q6 Who was the president of India in 2009?",
        a: "Indira Gandhi",
        b: "Govind Singh",
        c: "Pratibha Patil",
        d: "Jawaharlal Nehru",
        ans: "option3"
    },
    {
        question: "Q7 What is India’s smallest state by area?",
        a: "Puducherry",
        b: "Uttar Pradesh",
        c: "Goa",
        d: "Kerala",
        ans: "option3"
    },
    {
        question: "Q8 Which of these bodies of water does not border India?",
        a: "Arabian Sea",
        b: "Red Sea",
        c: "Bay of Bengal",
        d: "Indian Ocean",
        ans: "option2"
    },
    {
        question: "Q9 In what state is Bengaluru located?",
        a: "Chhattisgarh",
        b: "Kerala",
        c: "Bihar",
        d: "Karnataka",
        ans: "option4"
    },
    {
        question: "Q10 Which Indian president is nicknamed Missile Man?",
        a: "Sarvepalli Radhakrishnan",
        b: "Ram Nath Kovind",
        c: "Kocheril Raman Narayanan",
        d: "A.P.J. Abdul Kalam",
        ans: "option4"
    },
]

// declaring const to IDs and classes
const nameContainer = document.getElementById('name-container')
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');

const startbtn = document.getElementById('startbtn');
const prevbtn = document.getElementById('prevbtn');
const nextbtn = document.getElementById('nextbtn');
const restartbtn = document.getElementById('restartbtn');
const submitbtn = document.querySelector('#submitbtn');
const check = document.querySelector('#check');

const scoreCard = document.querySelector('#score-card');

const countdownTimer = document.querySelector("#timer")

const instructions = document.getElementById('instructions');
const alertQue = document.getElementById('alertQue');

const question = document.querySelector('#question');
const options = document.querySelector('#options');
const opt1 = document.querySelector('#opt1');
const opt2 = document.querySelector('#opt2');
const opt3 = document.querySelector('#opt3');
const opt4 = document.querySelector('#opt4');
const opt = document.getElementsByClassName('opt');

// initial counts
let questionCount = 0;
let score = 0;
let checkedAns;
let correctAns;
var yourName;
var totalTime = 120;

// at the start page
quizContainer.classList.add('hide');
scoreContainer.classList.add('hide');

// activate start button
startbtn.disabled = true;
check.addEventListener('change', () => {
    if (check.checked) {
        startbtn.disabled = false;
    } else {
        startbtn.disabled = true;
    }
})

// after clicking Start button
startbtn.addEventListener('click', () => {
    nameContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    yourName = document.getElementById("yourName").value;
    startTimer(totalTime);
    loadQuestion();
})

// load questions
function loadQuestion() {
    let questionData = quizDB[questionCount];
    question.innerHTML = questionData.question;
    opt1.innerHTML = questionData.a;
    opt2.innerHTML = questionData.b;
    opt3.innerHTML = questionData.c;
    opt4.innerHTML = questionData.d;
    opt.checked = false;

    //prev and next button disabled at first and last question
    if (questionCount === 0) {
        alertQue.classList.remove('hide');
        alertQue.innerHTML = "This is First question of the Quiz. Kindly select any option and click on Next to save the selected option."
        prevbtn.disabled = true;
        nextbtn.disabled = false;
    } else if (questionCount === quizDB.length - 1) {
        alertQue.classList.remove('hide');
        alertQue.innerHTML = "This is Last question of the Quiz. Kindly select any option and click on Submit to save the selected option and view the Score Board."
        prevbtn.disabled = false;
        nextbtn.disabled = true;
    } else {
        alertQue.classList.add('hide');
        prevbtn.disabled = false;
        nextbtn.disabled = false;
    }
}

//prev button question load
prevbtn.addEventListener('click', () => {
    questionCount--;
    loadQuestion();

    //Unchecking all radio buttons for prev question
    for (var i = 0; i < opt.length; i++) {
        opt[i].checked = false;
    }
})

nextbtn.addEventListener('click', () => {

    //nect button question load
    questionCount++;
    loadQuestion();

    //score counting
    correctAns = quizDB[questionCount - 1].ans;
    for (let i = 0; i < opt.length; i++) {
        if (opt[i].checked) {
            checkedAns = opt[i].value;
        }
    }
    if (checkedAns === correctAns) {
        score++;
    }

    //color coding of green when attempting the question
    for (let i = 0; i < opt.length; i++) {
        if (opt[i].checked) {
            document.getElementById('q' + (questionCount - 1)).classList.add("green");
        }
    }

    //Unchecking all radio buttons for next question
    for (var i = 0; i < opt.length; i++) {
        opt[i].checked = false;
    }
})

// clcicking on submit button, shows score
submitbtn.addEventListener('click', () => {

    //score counting
    for (let i = 0; i < opt.length; i++) {
        if (opt[i].checked) {
            checkedAns = opt[i].value;
        }
    }
    if (checkedAns === quizDB[quizDB.length - 1].ans) {
        score++;
    }

    // show the score board
    quizContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreCard.innerHTML = "Hello " + yourName + "! Congratulations🎉! You have successfully finished the quiz! <br><br> You have scored <strong>" + score + " marks out of " + quizDB.length + "</strong> <br><br><br> To reattempt the Quiz, click on Restart. ";
})

// clicking on Restart, page reload
restartbtn.addEventListener('click', () => {
    location.reload();
})

//question navigator
for (let j = 0; j < quizDB.length; j++) {
    document.querySelector('#q' + j).addEventListener('click', () => {
        questionCount = j;

        //Unchecking all radio buttons for current question
        for (var i = 0; i < opt.length; i++) {
            opt[i].checked = false;
        }
        loadQuestion();
    })
}

//countdown Timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        let seconds = time % 60
        let minutes = Math.floor(time / 60);
        time--;

        //shows 09 instead 9 seconds and minutes
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        //clear interval after time reaches 0
        if (time <= 0) {
            clearInterval(counter);
        }

        countdownTimer.innerHTML = "Total Time Left - " + minutes + ":" + seconds;

        //show the scoreboard once time is over
        if (time == 0) {
            quizContainer.classList.add('hide');
            scoreContainer.classList.remove('hide');
            scoreCard.innerHTML = "Hello " + yourName + " !<strong> You went out of time! So the quiz was automatically submitted.</strong><br>Congratulations🎉! You have successfully finished the quiz!  <br><br> You have scored <strong>" + score + " marks out of " + quizDB.length + "</strong> <br><br><br> To reattempt the Quiz, click on Restart. ";
        }
    }
}
