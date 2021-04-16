import React, {useState} from 'react';

// pobranie pytañ z pliku JSON
import questions from '../questions.json';
import Questions from "./questions";
import Answers from "./answers";
import Results from "./results";
import Actions from "./actions";

const styles = {
   display: 'flex',
   justifyContent: 'center'
} as React.CSSProperties;

const QuizComponent = (props: any) => {


//Stworzenie niezbêdnych hook;ów

   const [currentIndex, setIndex] = useState(0);
   const [currentQuestion, setQuestion] = useState(questions[currentIndex]);
   const [currentPoints, setPoints] = useState(0);
   const [allowToChoose, changePermission] = useState(true);
   const [markedAnswer, markAnswer] = useState({key: -1, variant: ''});


// przejœcie do kolejnego pytania

   const handleNextQuestion = () => {
       const nextValue = currentIndex + 1;
if (nextValue > questions.length - 1) {
           setIndex(questions.length - 1);
           return;
       }
       setIndex(nextValue);
       setQuestion(questions[nextValue]);
       changePermission(true);
       markAnswer({key: -1, variant: ''});
   };

// przejœcie do poprzedniego pytania

   const handlePrevQuestion = () => {
       const prevValue = currentIndex - 1;
       if (prevValue < 0) {
           setIndex(0);
           return;
       }
       setIndex(prevValue);
       setQuestion(questions[prevValue]);
       changePermission(true);
       markAnswer({key: -1, variant: ''});
   };


//sprawdzenie poprawnej odpowiedzi


   const handleCheckAnswer = (chosenOption: string, key: number) => {
       if (!allowToChoose) {
           return;
       }
       if (currentQuestion.correct_answer === chosenOption) {
           const points = currentPoints + 1;
           setPoints(points);
           changePermission(false);
markAnswer({key, variant: 'bg-success'})
       } else {
           changePermission(false);
           markAnswer({key, variant: 'bg-danger'})
       }
   };

// wyœwietlenie zawartoœci

   return (
<div style={styles}>
       <div className="containter">
           <Questions
   className="col-12"
   currentQuestion={currentQuestion.question}
   currentIndex={currentIndex + 1}
   allQuestions={questions.length}
>
</Questions>
<Answers className="col-12"
        checkAnswer={handleCheckAnswer}
        currentAnswers={currentQuestion.answers}
        markedAnswer={markedAnswer}
/>
<Results points={currentPoints}/>
<Actions
   disablePrev={currentIndex > 0}
   disableNext={currentIndex !== questions.length - 1}  
   prev={handlePrevQuestion}
   next={handleNextQuestion}
/>
</div>
</div>
   )
};


export default QuizComponent;