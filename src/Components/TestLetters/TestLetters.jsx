import React from 'react';
import './TestLetters.css'

const TestLetter=({individualletterinfo})=>{
    const {status}=individualletterinfo;

    const statusClass={
        correct:"test-letter-correct",
        incorrect:"test-letter-incorrect",
        notAttempted:"test-letter-not-attempted"
    }[status]

    return (
        <span className={`test-letter ${statusClass}`}>{individualletterinfo.testLetter}</span>
    );
}

export default TestLetter;