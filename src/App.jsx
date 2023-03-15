import { useState, useEffect } from 'react'
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';


function App() {
  const [tenzies, setTenzies] = useState(true)
  const [diesArr, setDiesArr] = useState(randArray())
  const [rolls, setRolls] = useState(0);

  //timer
  const [timer, setTimer] = useState(0);
  const [timercheck, setTimercheck] = useState(false);
  const [gun, setGun] = useState(false)
  const [confet, setConf] = useState(false);

  /* function randArray(){
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(Math.floor(Math.random() * 6) + 1)
    }
    return arr;
  } */

  function generateArr() {
    return ({key:nanoid(), randInt:Math.floor(Math.random() * 6) + 1, isHeld:false});
  };

  //set a timer to update
function timerUpdate() {
  setTimer(timer => timer + 1);
}

//timer check
useEffect(() => {
  let portInterval;
  if(timercheck) {
  portInterval = setInterval(() => timerUpdate(), 1000);
  }else{
    
    clearInterval(portInterval);
  }
  return () => clearInterval(portInterval);
},[timercheck])
  


  useEffect(() => {
    const isAllHeld = diesArr.every(die => die.isHeld === true);
    const firstValue = diesArr[0].randInt;
    const isAllequal = diesArr.every(die => die.randInt === firstValue);
    if (isAllequal && isAllHeld) {
      setTenzies(true);
      setTimercheck(false)
      setGun(true);
      setConf(true);
      console.log('updated array');
    }
   
  },[diesArr])

  function randArray(){
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(generateArr());
    }
    return arr;
  }

  function HandleClick(id){
    setDiesArr(prevArr => prevArr.map(single =>{
        if(single.key === id){
          return ({...single, isHeld:!single.isHeld});
        }
        return single
      })
    )
    console.log('new update: ', diesArr)
  }

  //render the dice arrays
  const diceSnippet = diesArr.map((dieface) =>{
    return (<Die key={dieface.key} logic={dieface.isHeld} 
      HandleClick={HandleClick} cid={dieface.key} figure={dieface.randInt}/>);
  })

  //start a new game
  function newGame(){
    setTenzies(false);
    setRolls(0);
    setTimer(0);
    setTimercheck(true)
    setConf(false);
   setDiesArr(prevDies => prevDies.map(single =>{
      //return ({...single, randInt:Math.floor(Math.random() * 6) + 1, isHeld: !single.isHeld});
      return(generateArr())
    })
    )
  }

  //rerender the dice
  function newReload() {
   setRolls(prevRolls => prevRolls + 1);
   setDiesArr(prevArr => prevArr.map(single =>{
    return (single.isHeld ? single : generateArr())
   } 
   ))
  }

  return (
    <div className="App">
     {confet && <Confetti/> }
      <span style={{ textAlign:'right', display:'block'}}>Rolls: {rolls}</span>
      <span style={{ textAlign:'left', display:'block'}}>Timer: {timer}</span>
      <h1 style={{textAlign:'center'}}>Tenzies Game</h1>
     {tenzies ? 
     <div className='grid-containero'>
     {gun && <h3 style={{textAlign:'center', margin:'auto', justifyContent:'center'}}>
      Congrats, You have Completed the game</h3>}
     </div>
    :
     <div className='grid-container'>
     {diceSnippet}
    </div>
    }

     
     {tenzies ?  <button className='dice-but' onClick={()=> newGame()}>New Game</button>
     :
     <button className='dice-but' onClick={()=> newReload()}>Roll Dice</button>
     }
    </div>
  )
}

export default App
