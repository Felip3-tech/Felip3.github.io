document.addEventListener("DOMContentLoaded", function () {
  let currentQuestion = 0;
  let score = 0;

  const questionText = document.getElementById("question-text");
  const questionImg = document.getElementById("question-img");
  const optionsList = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const resultDiv = document.getElementById("result");
  const scoreSpan = document.getElementById("score");
  const totalSpan = document.getElementById("total");
  const saveBtn = document.getElementById("save-btn");
  const saveStatus = document.getElementById("save-status");

  function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionImg.src = q.image;
    optionsList.innerHTML = "";

    q.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label>
          <input type="radio" name="option" value="${index}" />
          ${option}
        </label>
      `;
      optionsList.appendChild(li);
    });
  }

  nextBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) return alert("Selecciona una opción");

    const answer = parseInt(selected.value);
    if (answer === questions[currentQuestion].answer) {
      score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    document.getElementById("quiz").style.display = "none";
    resultDiv.style.display = "block";
    scoreSpan.textContent = score;
    totalSpan.textContent = questions.length;
  }

  saveBtn.addEventListener("click", () => {
    const result = {
      date: new Date().toLocaleString(),
      score: score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100) + "%"
    };

    let history = JSON.parse(localStorage.getItem("quizResults")) || [];
    history.push(result);
    localStorage.setItem("quizResults", JSON.stringify(history));

    saveStatus.textContent = "Resultado guardado correctamente.";
    saveStatus.style.color = "green";
  });

  loadQuestion();

  window.getSavedResults = function () {
    return JSON.parse(localStorage.getItem("quizResults")) || [];
  };
});   