//states
import { useState, useEffect } from "react";

//styles
import styles from "../styles/Quiz.module.css";

export default function Quiz() {
    //questions
    const questions = [
        {
          text: 'Qual é o idioma mais falado do mundo ?',
    
          answers: [
            {answer: 'Português', correct: false},
    
            {answer: 'Inglês', correct: true},
    
            {answer: 'Japonês', correct: false},
    
            {answer: 'Mandarim', correct: false}
          ],
        }, 
    
        {
          text: 'Quantos dias são necessários para a Terra orbitar o sol ?',
    
          answers: [
            {answer: '7', correct: false},
    
            {answer: '30', correct: false},
    
            {answer: '365', correct: true},
    
            {answer: '1', correct: false}
          ],
        },
    
        {
          text: 'Qual é o menor país do mundo ?',
    
          answers: [
            {answer: 'Rússia', correct: false},
    
            {answer: 'Vaticano', correct: true},
    
            {answer: 'Nauru', correct: false},
    
            {answer: 'Liechtenstein', correct: false}
          ],
        },

        {
            text: 'Um casal tem 6 filhos homens, cada irmão tem 1 irmã. Quantas pessoas há na família ?',
      
            answers: [
              {answer: '9', correct: false},
      
              {answer: '7', correct: true},
      
              {answer: '12', correct: false},

              {answer: '8', correct: false}
            ],
          },

          {
            text: '10 + 10 + 10 x 10 = ?',
      
            answers: [
              {answer: '300', correct: false},
      
              {answer: '40', correct: false},
      
              {answer: '120', correct: true},
      
              {answer: '160', correct: false}
            ],
          },

          {
            text: 'Em quantos graus a água começa a evaporar ?',
      
            answers: [
              {answer: '20°C', correct: false},
      
              {answer: '50°C', correct: false},
      
              {answer: '100°C', correct: false},
      
              {answer: '32°C', correct: true}
            ],
          },

          {
            text: 'Nosso corpo prefere massa magra ou massa gorda ?',
      
            answers: [
              {answer: 'Massa magra', correct: false},
      
              {answer: 'Massa gorda', correct: true},
            ],
          },

          {
            text: 'A guerra fria foi: ',
      
            answers: [
              {answer: 'Brasil x Estados Unidos', correct: false},
      
              {answer: 'Estados Unidos x União Soviética', correct: true},
      
              {answer: 'Rússia x Estados Unidos', correct: false},
      
              {answer: 'Brasil x Rússia', correct: false}
            ],
          },

          {
            text: '"Penso, logo existo". Frase do filósofo... ',
      
            answers: [
              {answer: 'René Descartes', correct: true},
      
              {answer: 'Plateus', correct: false},
      
              {answer: 'Galileu', correct: false},
      
              {answer: 'Sócrates', correct: false}
            ],
          },

          {
            text: '"Deve-se temer mais o amor de uma mulher do que o ódio de um homem.". Frase do filósofo...',
      
            answers: [
              {answer: 'Sócrates', correct: true},
      
              {answer: 'Platão', correct: false},
      
              {answer: 'Aristóteles', correct: false},
      
              {answer: 'René Descartes', correct: false}
            ],
          }
      ];

    //hooks
    const [question, setQuestion] = useState(questions);

    const [id, setID] = useState(0);

    const [timer, setTimer] = useState(30);

    const [score, setScore] = useState(0);

    let timeID: any;

    useEffect(() => {
        timeID = setTimeout(() => { setTimer(timer - 1)}, 1000);
    })

    //next question, try again and finish quiz
    const handleNextQuestion = (correct: boolean) => {
        if(id >= 9) {
            setID(9);
        } else {
            setID(id + 1);
        }

        //verify question
        if(correct === true) {
            setScore(score + 1);
        } else {
            setScore(score);
        }

        clearTimeout(timeID);
    }  

    const handleTryAgain = () => {
        location.reload()
    }

    const handleFinishQuiz = () => {
        setTimer(-1);

        clearTimeout(timeID);
    }

    return (
        timer >= 0 ? (
            <section className={styles.Container}>
                <article className={styles.Question}>
                    <p>
                        {id + 1} - {question[id].text}
                    </p>

                    {timer > 0 ? (
                      <span> {timer} </span>
                    ) : (
                      <h1>TIMEOUT!</h1>
                    )}
                </article>

                <article className={styles.Answers}>
                    {question[id].answers.map((answerOptions, key) => (
                        <div key={key}>
                            {
                                id === 9 
                                        ? 
                                    <button
                                            onClick={() => handleFinishQuiz()}>
                                        {answerOptions.answer}
                                    </button> 
                                        :
                                    <button
                                        key={key}
                                            onClick={() => handleNextQuestion(answerOptions.correct)}>
                                        {answerOptions.answer}
                                    </button>
                            }
                        </div>  
                    ))}
                </article>

                <footer>
                    Website created by 
                        <a href="https://www.instagram.com/iamryaan011/">@iamryaan011</a>
                </footer>
            </section>
        ) : (
            <section className={styles.TryAgain}>
                <span> {score < 10 && score > 0 ? score + 1 : score} de {question.length} </span>

                <button onClick={handleTryAgain}>Try Again</button>

                <footer>
                    Website created by 
                        <a href="https://www.instagram.com/iamryaan011/">@iamryaan011</a>
                </footer>
            </section>
        )
    )
  }
  