import React from 'react';
import TypingChallenge from '../TypingChallenge/TypingChallenge';
import ChallengeDetailsCards from '../ChallengeeDetailsCard/ChallengeDetailsCards';
import './TypingChallengeContainer.css';

const TypingChallengeContainer=({selectedParagraph,timerStarted,timeRemaining,words,characters,wpm,testInfo,onInputChange})=>{
   return (
        <div className="typing-challenge-container">
            {/*Details*/}
            <div className="details-container" >
                {/*Words type Section*/}
                 <ChallengeDetailsCards cardName="Words" cardValue={words}/>
                {/*characters  Type*/}
                <ChallengeDetailsCards cardName="Characters" cardValue={characters}/>
                {/*Speed*/}
                <ChallengeDetailsCards cardName="Speed" cardValue={wpm}/>
            </div>

            {/*Challenge*/}
            <div className="typewriter-container">
                <TypingChallenge selectedParagraph={selectedParagraph} timerStarted={timerStarted} timeRemaining={timeRemaining} testInfo={testInfo}  onInputChange={onInputChange} />
            </div>
        </div>
   );
}

export default TypingChallengeContainer