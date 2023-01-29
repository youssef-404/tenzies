import React from "react";
import Dice from "./dice";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  function generateNewDie(){
    return  {
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
  }
  function allNewDice(){
    const newDice=[]
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  
  const [dice,setDice] =React.useState(allNewDice)
  const [tenzies,setTenzies] =React.useState(false)
  const [rolls,setRolls]=React.useState(0)
  const [bestScore,setBestScore] =React.useState(localStorage.getItem("bestScore")||"")

  const diceElements=dice.map(number=>{
    return(
      <Dice
      key={number.id} 
      id={number.id} 
      number={number.value}
      isHeld={number.isHeld}
      holdDice={holdDice}
      />
    )
  })


  function rollDice() {
    if(tenzies){
      setDice(allNewDice())
      setTenzies(false)
      if(rolls<bestScore || bestScore===""){
        setBestScore(rolls)
      }
      setRolls(0)
    }else{
      setDice(oldDice=>oldDice.map(oldDie=>{
        return !oldDie.isHeld?generateNewDie():oldDie
      }))
      setRolls(prevRoll=>prevRoll+1)
    }
}

  function holdDice(id){
    setDice(oldDice=>oldDice.map(oldDie=>{
      return oldDie.id===id?{...oldDie,isHeld:!oldDie.isHeld}:oldDie
    }))
  }

  React.useEffect(()=>{
    localStorage.setItem("bestScore",bestScore)
  },[bestScore])

  React.useEffect(()=>{
    const value=dice[0].value
    for (let i = 0; i < dice.length; i++) {
      if(!dice[i].isHeld){
        return
      }
      if(dice[i].value!==value){
        return
      }

    }
    setTenzies(true)
  },[dice])

  return (
    <div className="app">
      {tenzies &&
        <Confetti/>
      }
      <div className="info">
        <div>
          <p>Best Score</p>
          <p>{bestScore}</p>
        </div>
    
        <div>
          <p>Number of rolls</p>
          <p>{rolls}</p>
        </div>
      </div>

      <div className="game-caontaier">
        <div className="text">
          <h1 className="title">Tenzies</h1>
          <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="dice-container">
          {diceElements}
        </div>
        <button onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
     </div>
    </div>
  );
}


