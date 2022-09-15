import Square from "./Square";

function Board(props) {
    return (
        <div className="border-4 border-t-gray-400 border-l-gray-400 border-b-white border-r-white inline-flex flex-col mt-2">
            {props.board.map((row,i) => {
                return (
                    <div key={'row_' + i} className="flex">
                        {row.map((square, j) => {
                            return (
                                <Square key={'square_' + i + '-' + j} x={i} y={j} square={square} squareClick={props.squareClick} />
                            )}
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Board;