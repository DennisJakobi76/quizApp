const questionsCount = document.getElementById("all-questions-count");
const questionCounter = document.getElementById("question-counter");
const questionContainer = document.getElementById("questions-container");
const answerContainer1 = document.getElementById("answer1");
const answerContainer2 = document.getElementById("answer2");
const answerContainer3 = document.getElementById("answer3");
const answerContainer4 = document.getElementById("answer4");

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
    question = questions[currentQuestion];
    questionContainer.innerHTML = question.question;
    answerContainer1.innerHTML = question.answer_1;
    answerContainer2.innerHTML = question.answer_2;
    answerContainer3.innerHTML = question.answer_3;
    answerContainer4.innerHTML = question.answer_4;
}

function answer(answerText) {
    question = questions[currentQuestion];
    let correct = answerText.includes(question.right_answer);

    if (correct) {
        document.getElementById(`ans-card-${question.right_answer}`).classList.add("correct-answer");
    } else {
        document.getElementById(`ans-card-${answerText.slice(-1)}`).classList.add("wrong-answer");
    }
}

function lastQuestion() {
    resetAnswers();
    if (currentQuestion == 0) {
        currentQuestion = questions.length - 1;
    } else {
        currentQuestion--;
    }

    showQuestion();
}

function nextQuestion() {
    resetAnswers();
    if (currentQuestion == questions.length - 1) {
        currentQuestion = 0;
    } else {
        currentQuestion++;
    }

    showQuestion();
}

function resetAnswers() {
    let answers = document.getElementsByClassName("selectable");

    for (let i = 0; 0 < answers.length; i++) {
        if (answers[i].classList.contains("correct-answer")) {
            answers[i].classList.remove("correct-answer");
        }

        if (answers[i].classList.contains("wrong-answer")) {
            answers[i].classList.remove("wrong-answer");
        }

        if (i == 3) {
            break;
        }
    }
}
