


export default function Dice(props){
    return(
        <div
         className={`dice ${props.isHeld?"dice-clicked":""}`}
         >
            <p>{props.number}</p>
        </div>
    )
}