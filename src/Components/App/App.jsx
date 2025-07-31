import React from 'react';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';
import "./App.css";
import Footer from '../Footer/Footer';
import Challenge from '../Challenge/Challenge';
import {SAMPLE_PARAGRAPHS} from './../../data/sampleparagraph';

const TotalTime=60;

const serviceUrl="http://metaphorpsum.com/paragraphs/1/8";

const defaultState={
    selectedParagraph:"",
    timerStarted:false,
    testInfo:[],
    timeRemaining:TotalTime,
    words:0,
    characters:0,
    wpm:0,
}



class App extends React.Component{
    state=defaultState;

    fetchNewParagraphfallback=()=>{
        const data=SAMPLE_PARAGRAPHS[
            Math.floor(Math.random()*SAMPLE_PARAGRAPHS.length)
        ];

        const selectedParagraphArray=data.split("");
        const testInfo=selectedParagraphArray.map(selectedLetter=>{
            return {
                testLetter:selectedLetter,
                status:"notAttempted",
            };
        });
        this.setState({...defaultState,testInfo,selectedParagraph:data})
    

    }

    fetchNewParagraph=()=>{
        fetch(serviceUrl)
        .then(response=>response.text())
        .then(data =>{
            const selectedParagraphArray=data.split("");
            const testInfo=selectedParagraphArray.map(selectedLetter=>{
                return {
                    testLetter:selectedLetter,
                    status:"notAttempted",
                };
            });
            this.setState({...defaultState,testInfo,selectedParagraph:data})
        })
    }

    componentDidMount(){
      this.fetchNewParagraphfallback();
    }

    startTimer=()=>{
        this.setState({timerStarted:true});
        const timer=setInterval(()=>{
                if(this.state.timeRemaining>0){
                    //change the wpm
                    const timeSpent=TotalTime-this.state.timeRemaining;
                    const wpm=timeSpent>0?(this.state.words/timeSpent)*TotalTime:0;

                    this.setState({
                         timeRemaining:this.state.timeRemaining-1,
                         wpm:parseInt(wpm),
                        });
                }else{
                    clearInterval(timer);
                }
        },1000)
    }
     
    startAgain=()=>this.fetchNewParagraphfallback();

    handleuserinput=(inputvalue)=>{
        if(!this.state.timerStarted)this.startTimer();

        /*
        Algorithm
        1.Handle the undeflow case -all the characters should be shown as not attempted
        2.Handle the overflow case - early exit
        3.Handle the backspace
                     -Mark the {index+1} element as not Attepted 
                     don't forget to check overflow case here (index+1 ->out og bound,when index === length-1)
        4.update the status in the test info
          -Find out the last character in the input value and  its index
          -check if the character at same index in testinfo(state) matches
          -yes ->"correct"
          -no ->"incorrect"
        5.Irrespective of the state,characters,words and speed(wpm) can be updated
         */
        const characters=inputvalue.length;
        const words=inputvalue.split(" ").length;
        const index=characters-1;

        if(index<0){
             this.setState({
                 testInfo:[
                     {
                         testLetter:this.state.testInfo[0].testLetter,
                         status:"notAttempted"
                     },
                     ...this.state.testInfo.slice(1)
                 ],
                 characters,
                 words,
             })

             return;
        }

        if(index>this.state.selectedParagraph.length){
            this.setState({characters,words});
            return
        }

        //Make a copy of testInfo
        const testInfo=this.state.testInfo;
        if(!(index === this.state.selectedParagraph.length-1)){
            testInfo[index+1].status="notAttempted";
        }


        //check for the correct typed letter
        const iscorrect=inputvalue[index]===testInfo[index].testLetter;

        //update the testInfo
        testInfo[index].status=iscorrect?"correct":"incorrect";

        //update the state
         this.setState({
             words,
             testInfo,
             characters
         })
    }

    render(){
         return (
            <div className="app">
                {/*Nav Section */}
                 <Nav/>
                {/*Landing page */}
                 <Landing/>
                {/*Challenge Section */}
                <Challenge
                 selectedParagraph={this.state.selectedParagraph}
                 words={this.state.words}
                 characters={this.state.characters}
                 wpm={this.state.wpm}
                 timeRemaining={this.state.timeRemaining}
                 timerStarted={this.state.timerStarted}
                 testInfo={this.state.testInfo}
                 onInputChange={this.handleuserinput}
                 startAgain={this.startAgain}
                />

                {/*Footer */}
                <Footer/>
            </div>
        )

    }
}

export default App;