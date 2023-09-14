        // JavaScript for å vise ett spørsmål om gangen
        let currentQuestion = 1;
        const totalQuestions = 10;

        function nextQuestion() {
            const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
            const selectedOption = currentQuestionElement.querySelector('input:checked');

            if (selectedOption) {
                // Skjul gjeldende spørsmål
                currentQuestionElement.style.display = 'none';
                currentQuestion++;

                if (currentQuestion <= totalQuestions) {
                    // Vis neste spørsmål
                    document.getElementById(`question${currentQuestion}`).style.display = 'block';
                }

                // Skjul "Beregn resultat" knappen hvis vi ikke er på siste spørsmål
                if (currentQuestion > totalQuestions) {
                    document.getElementById('calculateButton').style.display = 'block';
                }
            } else {
                alert('Vennligst svar på spørsmålet før du går videre.');
            }
        }

        function calculateResult() {
            // Implementer resultatberegning som tidligere
            const questions = document.querySelectorAll('.question');
            let totalScore = 0;

            questions.forEach((question, index) => {
                const selectedOption = question.querySelector('input:checked');
                if (selectedOption) {
                    totalScore += parseInt(selectedOption.value);
                }
            });

            const maxScore = totalQuestions * 4;
            const agreementPercentage = (totalScore / maxScore) * 100;

            const resultElement = document.getElementById('result');
            resultElement.textContent = `Du er ${agreementPercentage.toFixed(2)}% enig.`;

            // Skjul "Neste spørsmål" knappen og vis resultatet
            document.getElementById('calculateButton').style.display = 'none';
            resultElement.style.display = 'block';
        }

        // Vis det første spørsmålet ved oppstart
        document.getElementById('question1').style.display = 'block';
