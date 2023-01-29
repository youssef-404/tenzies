import React from "react";
import Dice from "./dice";
import {nanoid} from "nanoid"

export default function App() {

  function allNewDice(){
    const newDice=[]
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value:Math.ceil(Math.random()*6),
        isHeld:false,
        id:nanoid()
      })
    }
    return newDice
  }

  const [dice,setDice] =React.useState(allNewDice)

  const diceElements=dice.map(number=>{
    return(
      <Dice
      key={number.id} 
      number={number.value}
      isHeld={number.isHeld}
      />
    )
  })

  function rollDice() {
    setDice(allNewDice())
}

  return (
    <div className="app">
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice}>Roll</button>
    </div>
  );
}


