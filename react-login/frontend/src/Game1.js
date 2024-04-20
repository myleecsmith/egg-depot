import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import sound from './SurfnTurf.wav';
import sidebarButtonImg from './images/sidebar_button.png';
import soundOn from './images/sound_on2.png';
import soundOff from './images/sound_off2.png';
let timer;
const questions = [{question: "Which of the following is NOT a habitat that ducks live in?", options: ["Wetlands", "Grasslands", "Deserts", "Rivers"], answer: "Deserts"}, 
                   {question: "How long can ducks live on average?", options: ["10-20 years", "20-30 years", "30-40 years", "40-50 years"], answer: "10-20 years"}, 
                   {question: "Which of the following is NOT a food that ducks eat?", options: ["Fish", "Insects", "Seeds", "Raw meat"], answer: "Raw meat"}, 
                   {question: "Which type of duck will feed on land and in shallow surface waters?", options: ["Diving ducks", "Dabbling ducks", "Striding ducks", "Flight-inclined ducks"], answer: "Dabbling ducks"}, 
                   {question: "Which type of duck will feed underwater?", options: ["Striding ducks", "Diving ducks", "Flight-inclined ducks", "Dabbling ducks"], answer: "Diving ducks"}, 
                   {question: "How fast can ducks fly on average?", options: ["20-40 mph", "40-60 mph", "60-80 mph", "80-100 mph"], answer: "40-60 mph"}, 
                   {question: "During what time of year do ducks migrate for the winter?", options: ["May-September", "January-May", "August-December", "December-April"], answer: "August-December"}, 
                   {question: "How many species of ducks are there?", options: ["50", "90", "120", "180"], answer: "120"},
                   {question: "What is the name for a baby duck?", options: ["Duckling", "Gosling", "Cygnet", "Pullet"], answer: "Duckling"},
                   {question: "What is the most common species of domestic duck?", options: ["Mallard", "Pekin", "Muscovy", "Khaki Campbell"], answer: "Pekin"},
                   {question: "What substance produced by ducks helps waterproof their feathers?", options: ["Wax", "Oil", "Silk", "Gel"], answer: "Oil"},
                   {question: "Which continent is home to the most species of ducks?", options: ["Asia", "Europe", "North America", "Africa"], answer: "North America"},
                   {question: "What is the term for a group of ducks flying together?", options: ["Flock", "Herd", "Gaggle", "Pod"], answer: "Flock"},
                   {question: "What is the world's heaviest species of duck?", options: ["Mallard", "Muscovy Duck", "Eider Duck", "Canvasback"], answer: "Eider Duck"},
                   {question: "What is the term for the sound a duck makes?", options: ["Cluck", "Quack", "Honk", "Coo"], answer: "Quack"},
                   {question: "What is the term for a female duck?", options: ["Drake", "Hen", "Tom", "Gander"], answer: "Hen"},
                   {question: "Where do most ducks live during the winter months?", options: ["Marshes", "Forests", "Fields", "Wetlands"], answer: "Wetlands"},
                   {question: "What is the primary diet of most duck species?", options: ["Insects", "Grains", "Fish", "Berries"], answer: "Grains"},
                   {question: "Which type of duck is known for diving underwater to catch fish?", options: ["Mallard", "Wood Duck", "Canvasback", "Muscovy Duck"], answer: "Canvasback"},
                   {question: "What is the main reason ducks migrate?", options: ["To Find Mates", "To Escape Predators", "To Find Food", "To Lay Eggs"], answer: "To Find Food"},
                   {question: "What do ducks do during molting season?", options: ["Hibernate", "Migrate", "Shed Feathers", "Build Nests"], answer: "Shed Feathers"},
                   {question: "Which duck species is known for its ability to perch in trees?", options: ["Mallard", "Wood Duck", "Pintail", "Teal"], answer: "Wood Duck"},
                   {question: "What is the primary reason ducks are attracted to wetlands?", options: ["Nesting", "Feeding", "Migrating", "Resting"], answer: "Feeding"}
                  ];

let answeredQuestions = 0;
let score = 0;
let streak = 0;
let index;
let usedQuestions = [];
let timeLeft = 10; // 10 seconds

const clearTimer = () => {
  clearInterval(timer);
};

function DuckTrivia() {
    const [currentQuestion, setCurrentQuestion] = useState(Math.floor(Math.random() * questions.length));
    
    const displayQuestion = () => {
      clearInterval(timer);
      timer = 10;
      startTimer();
      usedQuestions.push(currentQuestion);
      return (
        <div>
          <div id="bubble">
            <h2 id="question">{questions[currentQuestion].question}</h2>
          </div>
          <div id="button-container">
          {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button option-${index}`} // Assign dynamic class names
                onClick={() => checkAnswer(option)}
                id={`option-${index}`}
              >
                {option}
              </button>
            ))}
          </div>
    
          <div id="score">Score: {score}</div>
          <div id="timer"></div>
          <div id="judge1"></div>
          <div id="judge2"></div>
          <div id="judge3"></div>
          <div id="judge4"></div>
          <div className={'play-again'}>
            <button id="play-again" hidden onClick={() => restartGame()} >Play Again!</button>
          </div>
        </div>
      );
    };    

    const [isOpen, setIsOpen] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    
    useEffect(() => {
      const isAudioPlayingStr = localStorage.getItem('isAudioPlaying');
      const isAudioPlaying = isAudioPlayingStr === 'true';
      setIsAudioPlaying(isAudioPlaying);
    }, []);
  
    useEffect(() => {
      localStorage.setItem('isAudioPlaying', isAudioPlaying.toString());
    }, [isAudioPlaying]);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    const toggleAudio = () => {
      setIsAudioPlaying(!isAudioPlaying);
    };

    const checkAnswer = (selectedOption) => {
        const correctAnswer = questions[currentQuestion].answer;
        clearInterval(timer);
        
        if (selectedOption === correctAnswer) {
          document.getElementById(`option-${questions[currentQuestion].options.indexOf(selectedOption)}`).classList.add('correct');
          streak++;
          score += (timeLeft + 1) * streak;
          // alert("Correct!");
        } else {
          document.getElementById(`option-${questions[currentQuestion].options.indexOf(selectedOption)}`).classList.add('incorrect');
          streak = 0;
          // alert("Incorrect. The correct answer is: " + correctAnswer);
        }
        setTimeout(() => {
          document.getElementById(`option-${questions[currentQuestion].options.indexOf(selectedOption)}`).classList.remove('correct'); 
          document.getElementById(`option-${questions[currentQuestion].options.indexOf(selectedOption)}`).classList.remove('incorrect');
          nextQuestion()}, 2000);  
    };

    const nextQuestion = () => {
        answeredQuestions++;
        if (answeredQuestions == 10) {
          gameOver();
        }
        console.log(`Total questions answered: ${answeredQuestions}`);
        timeLeft = 10;
        do {
          index = Math.floor(Math.random() * questions.length);
          if (usedQuestions.length === questions.length) {
            usedQuestions = [];
          }
        } while (usedQuestions.includes(index));

        setCurrentQuestion(index);
    };

    const startTimer = () => {
      timer = setInterval(() => {
          document.getElementById("timer").textContent = `Time left: ${timeLeft} seconds`;
          timeLeft--;
  
          if (timeLeft < 0) {
              clearInterval(timer);
              nextQuestion();
          }
      }, 1000);
  };

    const gameOver = () => {
      // clear game elements
      clearInterval(timer);
      document.getElementById('question').style.display = 'none';
      document.getElementById('bubble').style.display = 'none';
      document.getElementById('option-0').style.display = 'none';
      document.getElementById('option-1').style.display = 'none';
      document.getElementById('option-2').style.display = 'none';
      document.getElementById('option-3').style.display = 'none';
      document.getElementById('timer').style.display = 'none';
      document.getElementById('play-again').textContent = 'Play again!';
      document.getElementById('play-again').style.display = 'inline-block';

      document.getElementById('judge1').style.display = 'block';
      document.getElementById('judge2').style.display = 'block';
      document.getElementById('judge3').style.display = 'block';
      document.getElementById('judge4').style.display = 'block';

      // show judges scores
      document.getElementById('judge1').textContent = `Rating: ${parseFloat(((Math.random()*4)+(score/50)-2).toFixed(1))}`;
      document.getElementById('judge2').textContent = `Rating: ${parseFloat(((Math.random()*4)+(score/50)-2).toFixed(1))}`;
      document.getElementById('judge3').textContent = `Rating: ${parseFloat(((Math.random()*4)+(score/50)-2).toFixed(1))}`;
      document.getElementById('judge4').textContent = `Rating: ${parseFloat(((Math.random()*4)+(score/50)-2).toFixed(1))}`;
    }

    const restartGame = () => {
      nextQuestion();
      score = 0;
      streak = 0;
      answeredQuestions = 0;
      usedQuestions = [];

      document.getElementById('question').style.display = 'block';
      document.getElementById('bubble').style.display = 'block';
      document.getElementById('option-0').style.display = 'inline-block';
      document.getElementById('option-1').style.display = 'inline-block';
      document.getElementById('option-2').style.display = 'inline-block';
      document.getElementById('option-3').style.display = 'inline-block';
      document.getElementById('timer').style.display = 'block';
      document.getElementById('play-again').style.display = 'none';

      // hide judges
      document.getElementById('judge1').style.display = 'none';
      document.getElementById('judge2').style.display = 'none';
      document.getElementById('judge3').style.display = 'none';
      document.getElementById('judge4').style.display = 'none';

      displayQuestion();
    }

    return (
      <div className="Game1-bg">
        <div className="mainContainer">
          {/* Adding audio element for WelcomeSounds */}
          {isAudioPlaying && (
            <audio autoPlay loop>
              <source src={sound} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          )}
          {/* Button to toggle audio */}
          <div className='audioContainer'>
            <li onClick={toggleAudio}>
              {isAudioPlaying ? <img src={soundOn} height={35}/> : <img src={soundOff} height={35}/>}
            </li>
          </div>
          <div className="surfboard">
            <img src={require('./images/surfboard.png')} alt="surfboard" height={350} />
          </div>
          <div className="Duck_Sprite_g">
            <img src={require('./images/duck_sprite1.gif')} alt="ducky" height={300} />
          </div>
          {/* Sidebar button */}
          <div className="Sidebarbtn">
            <img src={sidebarButtonImg} alt="sidebar button" height={100} onClick={toggleSidebar} />
          </div>
          <div className="right-rectangle"></div>
          {/* Sidebar component */}
          <Sidebar isOpen={isOpen} toggle={toggleSidebar} toggleAudio={toggleAudio} isAudioPlaying={isAudioPlaying} clearTimer={clearTimer} />
          {/* Main content */}
          <div className={'titleContainer'}>
            {/* Integrating displayQuestion */}
            <div id="game-bg">
              <main>
                {displayQuestion()}
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }  

export default DuckTrivia;