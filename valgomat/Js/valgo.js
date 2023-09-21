        // Definerer en liste med spørsmål og svaralternativer
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
                question: "Spørsmål 2: Hva er din mening om klimaendringer?",
                options: [
                    { text: "Meget uenig", value: 1 },
                    { text: "Uenig", value: 2 },
                    { text: "Nøytral", value: 3 },
                    { text: "Enig", value: 4 },
                    { text: "Meget enig", value: 5 },
                ],
            },
            {
                question: "Spørsmål 3: Hva er din mening om klimaendringer?",
                options: [
                    { text: "Meget uenig", value: 1 },
                    { text: "Uenig", value: 2 },
                    { text: "Nøytral", value: 3 },
                    { text: "Enig", value: 4 },
                    { text: "Meget enig", value: 5 },
                ],
            },
            {
                question: "Spørsmål 4: Hva er din mening om klimaendringer?",
                options: [
                    { text: "Meget uenig", value: 1 },
                    { text: "Uenig", value: 2 },
                    { text: "Nøytral", value: 3 },
                    { text: "Enig", value: 4 },
                    { text: "Meget enig", value: 5 },
                ],
            },
            {
                question: "Spørsmål 5: Hva er din mening om klimaendringer?",
                options: [
                    { text: "Meget uenig", value: 1 },
                    { text: "Uenig", value: 2 },
                    { text: "Nøytral", value: 3 },
                    { text: "Enig", value: 4 },
                    { text: "Meget enig", value: 5 },
                ],
            },
        ];

        // Henter referanser til HTML-elementer
        const quizForm = document.getElementById("quiz-form");
        const quizQuestions = document.getElementById("quiz-questions");
        const resultDiv = document.getElementById("result");
        const startButton = document.getElementById("start-button");
        const nextButton = document.getElementById("next-button");
        let currentQuestionIndex = 0;

        // Funksjon for å vise et spørsmål basert på indeksen
        function showQuestion(index) {
          // Henter det aktuelle spørsmålet fra spørsmålslisten (questions)
            const question = questions[index];
          
          // Oppretter et DOM-element for spørsmålet ved hjelp av createQuestionElement-funksjonen
            const questionElement = createQuestionElement(question, index);
          // Tømmer innholdet i quizQuestions-elementet for å fjerne tidligere spørsmål
            quizQuestions.innerHTML = "";
          
          // Legger til det nye spørsmålet (questionElement) i quizQuestions-elementet for å vise det på skjermen
            quizQuestions.appendChild(questionElement);
        }

        // Funksjon som beregner resultatet basert på brukerens svar
        function calculateResult() {
          // klargjører en variabel for total poengsum
            let totalScore = 0;
          
          // Går gjennom alle spørsmål i listen (questions)
            for (let i = 0; i < questions.length; i++) {
              // Henter det valgte alternativet for hvert spørsmål ved hjelp av querySelector
                const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
              
              // Sjekker om et alternativ ble valgt for dette spørsmålet
                if (selectedOption) {
                  // Legger til poengene fra det valgte alternativet til total poengsum
                    totalScore += parseInt(selectedOption.value);
                }
            }
            const maxpossiblescore = questions.length * 5;
          
          // Beregner prosentandelen av total poengsum i forhold til det maksimale poengsummen
            const percentage = (totalScore / maxpossiblescore) * 100;
          console.log(percentage)
          // Oppdaterer resultatdiven med en tekst som viser brukerens enighet med Pensjonistpartiet
            resultDiv.textContent = `Du er ${(percentage * questions.length).toFixed(2)}% enig med Pensjonistpartiet`;
        }

        // Legger til en eventlistener for å starte valgomaten når knappen trykkes
        startButton.addEventListener("click", function () {
          // Skjuler startknappen ved å endre stilen til "none"
            startButton.style.display = "none";
          
          // Viser neste knapp ved å endre stilen til "block"
            nextButton.style.display = "block";
          
          // Viser det første spørsmålet ved å kalle showQuestion-funksjonen med indeksen for gjeldende spørsmål
            showQuestion(currentQuestionIndex);
          
          // Viser spørsmålsskjemaet ved å endre stilen til "block"
            quizForm.style.display = "block";
        });

          // Legger til en eventlistener for å håndtere innsending av skjemaet (navigering til neste spørsmål)
         quizForm.addEventListener("submit", function (e) {
          // Forhindrer standard oppførsel, som å sende skjemaet og laste siden på nytt
          e.preventDefault();

          // Øker indeksen for gjeldende spørsmål
          currentQuestionIndex++;

          // Sjekker om det er flere spørsmål igjen i listen (questions)
          if (currentQuestionIndex < questions.length) {
              // Viser det neste spørsmålet
              showQuestion(currentQuestionIndex);

              // Deaktiverer neste knapp midlertidig for å hindre flere klikk før brukeren har svart på spørsmålet
              nextButton.disabled = true;
          } else {
              // Skjuler spørsmålsskjemaet
              quizQuestions.style.display = "none";

              // Skjuler også neste knapp
              nextButton.style.display = "none";

              // Viser resultat
              resultDiv.style.display = "block";

              // Beregner resultatet når alle spørsmål er besvart ved bruk av calculateResult funksjonen
              calculateResult();
        }
    });

        // Legger til en hendelselytter for å aktivere "Neste" -knappen når et alternativ velges
        quizForm.addEventListener("change", function () {
            nextButton.disabled = false;
        });

        // Funksjon for å opprette HTML-elementet for et spørsmål
        function createQuestionElement(questionObj, index) {
            const questionElement = document.createElement("div");
            questionElement.innerHTML = `
                <p>${questionObj.question}</p>
                <div class="radio-container">
                    ${questionObj.options
                        .map(
                            (option, optionIndex) =>
                                `<div class="radio-option">
                                    <label for="q${index}o${optionIndex}">${option.text}</label>
                                    <input type="radio" name="q${index}" value="${option.value}" id="q${index}o${optionIndex}">
                                </div>`
                        )
                        .join("")}
                </div>
            `;
            return questionElement;
        }

// Skjuler valgomat-skjemaet og "Neste" -knappen som standard
quizForm.style.display = "none";
nextButton.style.display = "none";

