const questionsCount = document.getElementById("all-questions-count");
const questionCounter = document.getElementById("question-counter");
const questionContainer = document.getElementById("questions-container");
const answerContainer1 = document.getElementById("answer1");
const answerContainer2 = document.getElementById("answer2");
const answerContainer3 = document.getElementById("answer3");
const answerContainer4 = document.getElementById("answer4");
const progressBar = document.getElementById("prog-bar");
const btnNext = document.getElementById("next-question-btn");
let correctAnswersCounter = 0;
let percent = 0;
let AUDIO_START = new Audio("./assets/sounds/Startsound.m4a");
let AUDIO_END = new Audio("./assets/sounds/Endesound.m4a");
let AUDIO_SUCCESS = new Audio("./assets/sounds/Richtig.m4a");
let AUDIO_FAIL = new Audio("./assets/sounds/Nö.m4a");

let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3,
    },
    {
        "question": "Was bedeutet das HTML-Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3,
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2,
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1,
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a = title {...}",
        "right_answer": 1,
    },
    {
        "question": "Wie definiert man in Javascript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4,
    },
];

let currentQuestion = 0;
let question = questions[currentQuestion];

function init() {
    questionsCount.innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    questionCounter.innerHTML = currentQuestion + 1;

    if (currentQuestion >= questions.length) {
        toggleDnone();
        showEndScore();
    } else {
        question = questions[currentQuestion];
        questionContainer.innerHTML = question.question;
        answerContainer1.innerHTML = question.answer_1;
        answerContainer2.innerHTML = question.answer_2;
        answerContainer3.innerHTML = question.answer_3;
        answerContainer4.innerHTML = question.answer_4;
    }
}

function toggleDnone() {
    document.getElementById("end-screen").classList.toggle("d_none");
    document.getElementById("question-div").classList.toggle("d_none");
}

function startQuiz() {
    document.getElementById("start-screen").classList.toggle("d_none");
    document.getElementById("question-div").classList.toggle("d_none");
    AUDIO_START.play();
}

function restartQuiz() {
    toggleDnone();
    currentQuestion = 0;
    correctAnswersCounter = 0;
    percent = 0;
    progressBar.style = `width: ${percent}%`;
    init();
}

function answer(answerText) {
    question = questions[currentQuestion];
    let correct = answerText.includes(question.right_answer);

    if (correct) {
        document.getElementById(`ans-card-${question.right_answer}`).classList.add("correct-answer");
        AUDIO_SUCCESS.play();
        if (correctAnswersCounter < questions.length) {
            correctAnswersCounter++;
        }
    } else {
        document.getElementById(`ans-card-${answerText.slice(-1)}`).classList.add("wrong-answer");
        AUDIO_FAIL.play();
    }

    let answers = document.getElementsByClassName("selectable");

    for (let i = 0; 0 < answers.length; i++) {
        answers[i].style = `pointer-events: none`;

        if (i == 3) {
            break;
        }
    }
    btnNext.disabled = false;
}

function setProgressBarValue() {
    percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    progressBar.style = `width: ${percent}%`;
}

function showEndScore() {
    document.getElementById("score-count").innerHTML = `${correctAnswersCounter} / ${questions.length}`;
    AUDIO_END.play();
}

function nextQuestion() {
    resetAnswers();
    setProgressBarValue();
    currentQuestion++;
    showQuestion();
    btnNext.disabled = true;
}

function resetAnswers() {
    let answers = document.getElementsByClassName("selectable");

    for (let i = 0; 0 < answers.length; i++) {
        answers[i].classList.remove("correct-answer");
        answers[i].classList.remove("wrong-answer");
        answers[i].style = ``;

        if (i == 3) {
            break;
        }
    }
}
