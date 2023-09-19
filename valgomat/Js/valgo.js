    // Definerer spørsmål og svaralternativer
    const questions = [
        {
            question: "Spørsmål 1: Hva er din mening om klimaendringer?",
            options: [
                { text: "Meget uenig", value: 1 },
                { text: "Uenig", value: 2 },
                { text: "Nøytral", value: 3 },
                { text: "Enig", value: 4 },
                { text: "Meget enig", value: 5 },
            ],
        },
        {
            question: "Spørsmål 1: Hva er din mening om klimaendringer?",
            options: [
                { text: "Meget uenig", value: 1 },
                { text: "Uenig", value: 2 },
                { text: "Nøytral", value: 3 },
                { text: "Enig", value: 4 },
                { text: "Meget enig", value: 5 },
            ],
        },
        {
            question: "Spørsmål 1: Hva er din mening om klimaendringer?",
            options: [
                { text: "Meget uenig", value: 1 },
                { text: "Uenig", value: 2 },
                { text: "Nøytral", value: 3 },
                { text: "Enig", value: 4 },
                { text: "Meget enig", value: 5 },
            ],
        },
        {
            question: "Spørsmål 1: Hva er din mening om klimaendringer?",
            options: [
                { text: "Meget uenig", value: 1 },
                { text: "Uenig", value: 2 },
                { text: "Nøytral", value: 3 },
                { text: "Enig", value: 4 },
                { text: "Meget enig", value: 5 },
            ],
        },
    ];

    const quizForm = document.getElementById("quiz-form");
    const quizQuestions = document.getElementById("quiz-questions");
    const resultDiv = document.getElementById("result");
    const startButton = document.getElementById("start-button");
    const nextButton = document.getElementById("next-button");
    let currentQuestionIndex = 0;

    // Viser et spørsmål basert på indeksen
    function showQuestion(index) {
        const question = questions[index];
        const questionElement = createQuestionElement(question, index);
        quizQuestions.innerHTML = ""; // Tømmer forrige spørsmål
        quizQuestions.appendChild(questionElement);
    }

    // Beregner resultatet basert på svarene
    function calculateResult() {
        let totalScore = 0;
        for (let i = 0; i < questions.length; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption) {
                totalScore += parseInt(selectedOption.value);
            }
        }
        const percentage = (totalScore / (questions.length * 5)) * 100;
        resultDiv.textContent = `Du er ${percentage.toFixed(2)}% enig med Pensjonistpartiet`;
    }

    // Legger til Eventistener for knapper og skjemaer
    startButton.addEventListener("click", function () {
        startButton.style.display = "none"; // Skjuler startknappen
        nextButton.style.display = "block"; // Viser neste knapp
        showQuestion(currentQuestionIndex); // Viser det første spørsmålet
        quizForm.style.display = "block"; // Viser skjemaet for spørsmål
    });

    quizForm.addEventListener("submit", function (e) {
        e.preventDefault();
        currentQuestionIndex++; // Går til neste spørsmål
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex); // Viser neste spørsmål
            nextButton.disabled = true; // Deaktiverer neste-knappen igjen
        } else {
            calculateResult(); // Beregner resultatet når alle spørsmålene er besvart
            quizQuestions.style.display = "none"; // Skjuler spørsmålene
            nextButton.style.display = "none"; // Skjuler neste-knappen
            resultDiv.style.display = "block"; // Viser resultatet
        }
    });

    // Aktiverer "Neste" knappen når et alternativ er valgt
    quizForm.addEventListener("change", function () {
        nextButton.disabled = false;
    });

    // Genererer spørsmålselementer
    function createQuestionElement(questionObj, index) {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
            <p>${questionObj.question}</p>
            <div style="display: flex; flex-direction: row;">
                ${questionObj.options
                    .map(
                        (option, optionIndex) =>
                            `<input type="radio" name="q${index}" value="${option.value}" id="q${index}o${optionIndex}">
                            <label for="q${index}o${optionIndex}">${option.text}</label>`
                    )
                    .join("")}
            </div>
        `;
        return questionElement;
    }

    // Skjuler spørsmålskjemaet og "Neste" knappen i begynnelsen
    quizForm.style.display = "none";
    nextButton.style.display = "none";