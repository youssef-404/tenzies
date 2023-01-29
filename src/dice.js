


export default function Dice(props){
    return(
        <div
         className={
            `dice 
            ${props.isHeld?"dice-clicked":""} 
            dice_${props.number}`
        }
         onClick={()=>props.holdDice(props.id)}
         >
        </div>
    )
}