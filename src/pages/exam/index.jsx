import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Exam() {
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60 * 30); // 30 min
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  // 20 simple demo questions
  const questions = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    question: `Q${i + 1}: What is ${i + 1} + ${i + 1}?`,
    options: [
      `${i + 1}`,
      `${i + 2}`,
      `${i + i}`,
      `${i + 1 + i + 1}`,
    ],
    correct: `${i + 1 + i + 1}`,
  }));

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && started) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [started, timeLeft]);

  const handleStart = () => {
    setStarted(true);
    setStartTime(new Date());
    setCurrentQuestion(0);
  };

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    let count = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        count += 1;
      }
    });
    setScore(count);
    setShowResult(true);
    setStarted(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progress = Math.round(
    ((currentQuestion + 1) / questions.length) * 100
  );

  return (
    <div className="container my-5">
      <h1 className={`${styles.title} text-center py-2`}> React Final Exam</h1>

      <div className="mb-3 p-3 row ">
        <div className='col-md-4'>
        <div className={`${styles.sectionBg} h-100 p-3 rounded-3`}>
        <p>Student Name:</p><p className="text-white"> Zien Mohamed</p>
        <p>Student ID:</p><p className="text-white"> STD12345</p>
        <p>Instructor:</p><p className="text-white"> Dr. Yassin Mohamed</p>
</div>
        
        
        </div>
        <div className= 'col-md-4'>
        <div className={`${styles.sectionBg} h-100 p-3 rounded-3`}>
        <p>Total Questions: </p><p className="text-white">{questions.length}</p> 
        <p>Duration: </p><p className="text-white">30 minutes </p>
        <p className="bg-white p-2  rounded-2">{startTime && `Started at: ${startTime.toLocaleTimeString()}`} </p>
        </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
    <div className=" h-100 d-flex justify-content-center align-items-center w-100 border-5 border rounded-3">
    {!started && !showResult && !reviewMode && (
       
        
       <button className={`${styles.cssbuttons}  `} onClick={handleStart}>
         Start Exam
         <div class={styles.icon}>
           <svg
             height="24"
             width="24"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path d="M0 0h24v24H0z" fill="none"></path>
             <path
               d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
               fill="currentColor"
             ></path>
           </svg>
         </div>
       </button>
       
       
       
     )}
    </div>
        </div>

      
      </div>

    

      {!started && showResult && !reviewMode && (
        <button className="btn btn-secondary" onClick={() => {
          setReviewMode(true);
          setCurrentQuestion(0);
        }}>
          Exam Review
        </button>
      )}

      {started && (
        <>
          

          <div className="mb-3">
            <div className="progress">
              <div
                className="progress-bar "
                role="progressbar"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            <p>
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="m-4  container bg-light rounded-1 shadow">
            <h5 className={`${styles.qTitle} p-2 rounded-1`}>{questions[currentQuestion].question}</h5>
            {questions[currentQuestion].options.map((opt, idx) => (
              <div className={`${ styles.answers}form-check m-3`} key={idx}>
                <input
                  className="form-check-input m-2"
                  type="radio"
                  name={`q${questions[currentQuestion].id}`}
                  value={opt}
                  checked={
                    answers[questions[currentQuestion].id] === opt
                  }
                  onChange={() =>
                    handleOptionChange(questions[currentQuestion].id, opt)
                  }
                />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between">
          <button className={styles.nextBtn}  onClick={() => setCurrentQuestion(currentQuestion + 1)}>
             
                <span>Previous</span>
              </button>

            {currentQuestion < questions.length - 1 ? (
             
              
              <button className={styles.nextBtn}  onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                <span>Next</span>
                <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  ></path>
                </svg>
              </button>
              
            ) : (
             
              <button className={`${styles.cssbuttons}  `} onClick={handleSubmit}>
              Submit Exam
              <div class={styles.icon}>
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            )}
          </div>
        </>
      )}

      {reviewMode && (
        <>
          <div className="mb-3">
            <div className="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            <p>
              Reviewing Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="mb-4">
            <h5 className={`${styles.qTitle} p-3 rounded-1`}>{questions[currentQuestion].question}</h5>
            <p className="alert alert-warning">
              <strong>Your Answer: </strong>
              <span className={answers[questions[currentQuestion].id] === questions[currentQuestion].correct ? "alert-success text-success" : "alert-danger text-danger"}>
                {answers[questions[currentQuestion].id] || "No Answer"}
              </span>
            </p>
            <p className="alert alert-success">
              <strong>Correct Answer: </strong>
              <span className="text-success ">{questions[currentQuestion].correct}</span>
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <button
              className={styles.nextBtn}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
            >
           <span>Previous</span>   
            </button>

            <button
              className={styles.nextBtn}
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={currentQuestion >= questions.length - 1}
            >
             <span>Next</span> 
              <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  ></path>
                </svg>
            </button>
          </div>
        </>
      )}

      {showResult && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> Exam Result</h5>
              </div>
              <div className="modal-body">
                <p>
                  You scored <strong>{score}</strong> out of{" "}
                  <strong>{questions.length}</strong>!
                </p>
                <p>{score >= 10 ? " Congratulations! You passed!" : " Sorry! You did not pass."}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowResult(false);
                    setReviewMode(true);
                    setCurrentQuestion(0);
                  }}
                >
                  Review Exam
                </button>
                <a href="/" className="btn btn-primary">
                  Back to Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
