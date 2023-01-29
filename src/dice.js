


export default function Dice(props){
    return(
        <div
         className={`dice ${props.isHeld?"dice-clicked":""}`}
         onClick={()=>props.holdDice(props.id)}
         >
            <p>{props.number}</p>
        </div>
    )
}