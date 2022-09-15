import './App.css';
import Board from './Board';
import {useState} from "react";
import Counter from "./Counter";

function App() {
    const [size] = useState(9);
    const [numMines] = useState(10);
    const [board, setBoard] = useState([]);
    const [started, setStarted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(numMines);
    const [loser, setLoser] = useState(false);
    const [winner, setWinner] = useState(false);
    const [intervalID, setIntervalID] = useState(0);

    const startTimer = () => {
        if (!intervalID) {
            setIntervalID(setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000));
        }
    }

    const stopTimer = () => {
        if (intervalID) {
            clearInterval(intervalID);
            setIntervalID(0);
        }
    }

    const generateBoard = () => {
        let board = [];

        for (let i = 0; i < size; i++) {
            let temp = [];

            for (let j = 0; j < size; j++) {
                temp.push({
                    isMine: false,
                    isNumber: false,
                    isBlank: true,
                    isMarked: false,
                    isRevealed: false,
                    foundMine: false,
                    number: 0
                })
            }

            board.push(temp);
        }

        return board;
    }

    const generateMines = (board) => {
        for (let i = 0; i < numMines; i++) {
            while (true) {
                const x = Math.floor(Math.random() * (size - 1));
                const y = Math.floor(Math.random() * (size - 1));

                if (board[x][y].isMine) {
                    continue;
                }

                board[x][y].isMine = true;
                board[x][y].isBlank = false;

                break;
            }
        }
    }

    const generateNumbers = (board) => {
        const min = 0;
        const max = board.length - 1;

        for (let i = 0; i < board.length; i++) {
            let row = board[i];

            for (let j = 0; j < row.length; j++) {
                let square = row[j];

                if (!square.isMine) {
                    continue;
                }

                if (i - 1 >= min && j - 1 >= min) {
                    increaseSquareNumber(board,i-1,j-1);
                }

                if (i - 1 >= min) {
                    increaseSquareNumber(board,i-1,j);
                }

                if (i - 1 >= min && j + 1 <= max) {
                    increaseSquareNumber(board,i-1,j+1);
                }

                if (j - 1 >= min) {
                    increaseSquareNumber(board,i,j-1);
                }

                if (j + 1 <= max) {
                    increaseSquareNumber(board,i,j+1);
                }

                if (i + 1 <= max && j - 1 >= min) {
                    increaseSquareNumber(board,i+1,j-1);
                }

                if (i + 1 <= max) {
                    increaseSquareNumber(board,i+1,j);
                }

                if (i + 1 <= max && j + 1 <= max) {
                    increaseSquareNumber(board,i+1,j+1);
                }
            }
        }
    }

    const increaseSquareNumber = (board, i, j) => {
        if (!board[i][j].isMine) {
            board[i][j].isNumber = true;
            board[i][j].isBlank = false;
            board[i][j].number++;
        }
    }

    const regenerate = () => {
        stopTimer();
        setStarted(false);
        setTimer(0);
        setCounter(numMines);
        setWinner(false);
        setLoser(false);

        const temp = generateBoard();
        generateMines(temp);
        generateNumbers(temp);

        setBoard(temp);
    }

    const handleRevealSquare = (x,y) => {
        const tempBoard = [...board];
        const tempSquare = tempBoard[x][y];

        if (tempSquare.isMine) {
            tempSquare.foundMine = true;
            setBoard(tempBoard);
            busted();
            return;
        }

        if (tempSquare.isMarked) {
            return;
        }

        if (tempSquare.isBlank) {
            revealNearbyBlankSquares(tempBoard,x,y);
        }

        tempSquare.isRevealed = true;
        setBoard(tempBoard);
    }

    const busted = () => {
        stopTimer();
        setLoser( true);
        revealAllMines();
    }

    const revealAllMines = () => {
        const tempBoard = [...board];

        for (let i = 0; i < tempBoard.length; i++) {
            for (let j = 0; j < tempBoard[i].length; j++) {
                if (tempBoard[i][j].isMine) {
                    tempBoard[i][j].isRevealed = true;
                }
            }
        }

        setBoard(tempBoard);
    }

    const revealNearbyBlankSquares = (tempBoard, x, y) => {
        const min = 0;
        const max = tempBoard.length - 1;

        if (x - 1 >= min && y - 1 >= min) {
            revealBlankSquare(tempBoard,x-1, y-1);
        }

        if (x - 1 >= min) {
            revealBlankSquare(tempBoard,x-1, y);
        }

        if (x - 1 >= min && y + 1 <= max) {
            revealBlankSquare(tempBoard,x-1, y+1);
        }

        if (y - 1 >= min) {
            revealBlankSquare(tempBoard,x, y-1);
        }

        if (y + 1 <= max) {
            revealBlankSquare(tempBoard,x, y+1);
        }

        if (x + 1 <= max && y - 1 >= min) {
            revealBlankSquare(tempBoard,x+1, y-1);
        }

        if (x + 1 <= max) {
            revealBlankSquare(tempBoard,x+1, y);
        }

        if (x + 1 <= max && y + 1 <= max) {
            revealBlankSquare(tempBoard,x+1, y+1);
        }
    }

    const revealBlankSquare = (tempBoard,x,y) => {
        if (!tempBoard[x][y].isRevealed && !tempBoard[x][y].isMine && !tempBoard[x][y].isMarked) {
            tempBoard[x][y].isRevealed = true;

            if (tempBoard[x][y].isBlank) {
                revealNearbyBlankSquares(tempBoard,x,y);
            }
        }
    }

    const handleSquareClick = (event, x, y) => {
        if (winner || loser) {
            return;
        }

        if (event.button === 2) {
            handleMarkSquare(x,y);
        } else {
            handleRevealSquare(x,y)
        }

        if (!started) {
            setStarted(true);
            startTimer();
        }
    }

    const handleMarkSquare = (x,y) => {
        const tempBoard = [...board];
        const tempSquare = tempBoard[x][y];

        if (tempSquare.isRevealed) {
            return;
        }

        const tempCounter = tempSquare.isMarked ? counter + 1 : counter - 1;

        setCounter(tempCounter);

        tempSquare.isMarked = !tempSquare.isMarked;
        setBoard(tempBoard);
    }

    useState(() => {
        regenerate();
    },[])

    return (
        <div className={"h-full flex justify-center items-center"}>
            <div className={"w-max border-4 border-b-gray-400 border-r-gray-400 border-t-white border-l-white bg-gray-200 p-2"}>
                <Counter regenerate={regenerate} timer={timer} counter={counter} loser={loser} winner={winner} />
                <Board board={board} squareClick={handleSquareClick}/>
            </div>
        </div>

    );
}

export default App;
