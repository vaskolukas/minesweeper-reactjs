import SquareMark from "./SquareMark";

function Square(props) {
    const square = props.square;

    let numberColor = 'text-black';

    if (!square.isRevealed) {
        return (
            <button className="border-[3px] border-t-white leading-none text-sm inline-flex items-center justify-center border-l-white border-b-gray-400 border-r-gray-400 w-5 h-5 bg-gray-200" onContextMenu={(e) => e.preventDefault()} onMouseUp={(e) => {props.squareClick(e, props.x, props.y)}}>
                {square.isMarked && '⚑'}
            </button>
        )
    }

    if (square.isNumber) {
        switch(square.number) {
            case 1:
                numberColor = 'text-blue-700';
                break;
            case 2:
                numberColor = 'text-green-600';
                break;
            case 3:
                numberColor = 'text-red-500';
                break;
            case 4:
                numberColor = 'text-red-700';
                break;
            default:
                numberColor = 'text-purple-700';
                break;
        }
    }

    let content = "";

    if (square.isMine) {
        content = '💣';
    } else if (square.isNumber) {
        content = square.number;
    }

    return (
        <div className={numberColor + (square.foundMine ? " bg-red-500" : ' bg-gray-200') + " relative border border-gray-400 w-5 h-5 inline-flex items-center justify-center font-bold"}>
            {content}
            {square.isRevealed && square.isMarked && (<SquareMark />)}

        </div>
    )
}

export default Square;