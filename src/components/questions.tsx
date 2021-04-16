import React from 'react';

const Question = (props: any) => {

   return (
       <div>
           <p>Questions: {props.currentIndex}/{props.allQuestions}</p>
           <p>{props.currentQuestions}</p>
       </div>
   )
};

export default Question;