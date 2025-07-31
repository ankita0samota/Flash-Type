import React from 'react';
import TestLetter from '../TestLetters/TestLetters';
import './TypingChallenge.css';

const TypingChallenge=({timerStarted,timeRemaining,testInfo,onInputChange})=>{
    return (
        <div className="typing-challenge">
            <div className="time-container">
                <p className="timer">
                    00:
                    {timeRemaining>10?timeRemaining:`0${timeRemaining}`}
                </p>
                <p className="timer-info">
                    {!timerStarted && "Start typing to Start the test"}
                </p>
            </div>
            <div className="textarea-container">
              <div className="textarea-left">
                  <div className="textarea test-paragraph">
                  {/* {selectedParagraph} */}
                  {
                      testInfo.map((individualletterinfo,index)=>{
                          return <TestLetter key={index} individualletterinfo={individualletterinfo}/>
                      })
                  }
                  </div>
              </div>  
              <div className="textarea-right">
                  <textarea onChange={(e)=>onInputChange(e.target.value)} className='textarea' placeholder='Start typing here'>
                    
                  </textarea>
              </div>
            </div>
        </div>
    );
}

export default TypingChallenge;