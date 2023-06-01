import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuestionComponent.css'; // Importando o arquivo CSS externo


class QuestionComponent extends React.Component {
  render() {
    const { question, alternatives, posicao, gabarito, handleAnswer } = this.props;

    return (
      <div>
        <p  className="question">{question}</p>
            {alternatives.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${posicao}`}
                  value={option}
                 onChange={() => handleAnswer(posicao, option)}
                  checked={gabarito === option}
                />
                <label>{option}</label>
              </div>
            ))}
      </div>
    );
  }
}

//https://mocki.io/v1/f249c8c6-555c-4370-913e-2fcb92e5939d
//https://mocki.io/v1/39f208e8-ef13-4fbd-ab6b-a5b89412445a - errado

const questions = [
    {
      question: "1º O que é Front-end?",
      options: ["a) Parte de um sistema que é oculta para o usuário.", "b) Parte de um sistema, é visível e interativa ao usuário.", "c) Parte lógica que recebe as regras de negócio", "d) Nenhuma das alternativas anteriores"],
      answer: "b) Parte de um sistema, é visível e interativa ao usuário."
    },
    {
      question: "2º O que é o React JS?",
      options: ["a) Uma poderosa biblioteca JavaScript.", "b) Uma linguagem de Programação.", "c) Um servidor de Cloud.", "d) Todas as respostas anteriores."],
      answer: "a) Uma poderosa biblioteca JavaScript."
    },
    {
      question: "3º Quais são as principais tecnologias do mundo Front-end?",
      options: ["a) Java, Golang e Python.", "b) AWS, Google Cloud e Azure.", "c) Kotlin, HTML e CSS.", "d) HTML, CSS e JavaScript."],
      answer: "d) HTML, CSS e JavaScript."
    },
    {
      question: "4º O que é HTML?",
      options: ["a) Linguagem de Programação.", "b) Linguagem de Escrita.", "c) Linguagem de Marcação de Hipertexto.", "d) Nenhuma das alternativas anteriores."],
      answer: "c) Linguagem de Marcação de Hipertexto."
    },
    {
      question: "5º Para o que é utilizado o CSS?",
      options: ["a) Fazer projetos.", "b) Fazer o código fonte do projeto.", "c) O corpo do texto do HTML.", "d)Estilizar os elementos escritos no HTML."],
      answer: "d)Estilizar os elementos escritos no HTML."
    },
    {
      question: "6º JavaScript é a mesma coisa de Java?",
      options: ["a) Verdadeiro.", "b) Falso."],
      answer: "b) Falso."
    },
    {
      question: "7º Qual dos Frameworks abaixo é utilizado pelas empresas Netflix, Airbnb, WhatsApp e Instagram?",
      options: ["a) React JS.", "b) Angular.", "c) Vue.js.", "d) Ember.js."],
      answer: "a) React JS."
    },
    {
      question: "8º Os documentos HTML podem ter extensões terminadas em .html ou .htm ?",
      options: ["a) Verdadeiro.", "b) Falso.",],
      answer: "a) Verdadeiro."
    },
    {
      question: "9º Quais são as três partes de um elemento HTML?",
      options: ["a) Tag, H1 e Fechamento. ", "b) H2, P e Tag.", "c) Tag de Abertura, Conteúdo e Tag de Fechamento.", "d) Todas as alternativas anteriores."],
      answer: "c) Tag de Abertura, Conteúdo e Tag de Fechamento."
    },
    {
      question: "10º Por qual empresa o React é mantido?",
      options: ["a) WhatsApp.", "b) Instagram.", "c) Netflix.", "d) Facebook."],
      answer: "d) Facebook."
    },
    // adicionar perguntas *
  ];
    
  function Quiz() {
    const [dados, setDados] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [finalizado, setFinalizado] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://mocki.io/v1/f249c8c6-555c-4370-913e-2fcb92e5939d');
          setDados(response.data);
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleAnswer = (questionIndex, answer) => {
      // verifica se a pergunta já foi respondida antes
      if (answers[questionIndex]) {
          return;
      }
  
      // armazena a resposta do usuário
      const newAnswers = { ...answers };
      newAnswers[questionIndex] = answer;
      setAnswers(newAnswers);
  
      // verifica se a resposta está correta e atualiza a pontuação
      if (answer === questions[questionIndex].answer) {
        setScore(score + 1);
      }
    };
  
    const isQuizComplete = () => {
      // verifica se todas as perguntas foram respondidas
      return Object.keys(answers).length === questions.length;
    };
    const clickQuizComplete = () => {
      setFinalizado(true);
    };
  
    return (
      <nav id="container">
            <React.Fragment>

          <div class="column1" >
  
          {dados.map((question, index) => (
            
          <div key={index}>
               <QuestionComponent question={question.question} alternatives={question.options} posicao={index} gabarito={answers[index]} handleAnswer={handleAnswer} />

           
          </div>
        ))}
        
  
  
          </div>
          <div class="column2" >
              <h3>Gabarito</h3>
          {dados.map((question, index) => (
            
            
            <div key={index}>
            {answers[index] && 
                       <p>Questão {index+1}<br />{answers[index].substring(0,2)}</p> 
            }
          </div>
        ))}
  
  
          </div>
          <div class="column3" >
          <button disabled={!isQuizComplete()} onClick={() => clickQuizComplete()}>Finalizar Questionário</button>
          {finalizado && <p>Pontuação: {score}/10</p>}
          </div>
          </React.Fragment>

      </nav>
       
  
  
    );
  }
  
  export default Quiz;
  