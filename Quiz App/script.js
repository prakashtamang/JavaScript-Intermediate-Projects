const questions = [
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "JavaScript", "CSS", "PHP"],
    answer: 2,
  },

  {
    question: "Which keyword declares a variable in JavaScript?",
    options: ["var", "int", "string", "float"],
    answer: 0,
  },

  {
    question: "Which HTML tag creates a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },

  {
    question: "Which method writes output to the browser console?",
    options: ["print()", "console.log()", "write()", "echo()"],
    answer: 1,
  },

  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    answer: 2,
  },

  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: 0,
  },
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const questionNo = document.getElementById("questionNo");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

let currentQuestion = 0;

const userAnswers = new Array(questions.length).fill(null);

loadQuestion();

function loadQuestion() {
  const q = questions[currentQuestion];

  questionNo.textContent = currentQuestion + 1;
  questionEl.textContent = q.question;

  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");

    btn.textContent = option;

    if (userAnswers[currentQuestion] !== null) {
      btn.disabled = true;

      if (index === q.answer) {
        btn.classList.add("correct");
      }

      if (index === userAnswers[currentQuestion] && index !== q.answer) {
        btn.classList.add("wrong");
      }
    } else {
      btn.addEventListener("click", () => selectAnswer(index));
    }

    optionsEl.appendChild(btn);
  });

  prevBtn.disabled = currentQuestion === 0;

  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "Finish" : "Next";
}

function selectAnswer(selected) {
  userAnswers[currentQuestion] = selected;

  loadQuestion();
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

function showResult() {
  quiz.classList.add("hidden");

  result.classList.remove("hidden");

  let score = 0;

  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].answer) {
      score++;
    }
  });

  const accuracy = ((score / questions.length) * 100).toFixed(2);

  result.innerHTML = `

<h2>Quiz Completed 🎉</h2>

<p><strong>Score:</strong> ${score} / ${questions.length}</p>

<p><strong>Correct Answers:</strong> ${score}</p>

<p><strong>Wrong Answers:</strong> ${questions.length - score}</p>

<p><strong>Accuracy:</strong> ${accuracy}%</p>

<button onclick="location.reload()">Play Again</button>

`;
}
