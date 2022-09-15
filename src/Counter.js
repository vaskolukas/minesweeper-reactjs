function Counter(props) {
    const emoji = props.loser ? '😵' : props.winner ? '😎' : "🙂";
    return (
        <div className={"border-4 border-t-gray-400 border-l-gray-400 border-b-white border-r-white p-1 flex"}>
            <div className={"flex justify-between w-full items-center"}>
                <div className={"font-kdam inline-flex p-px text-2xl leading-none bg-black text-red-500 font-bold border-2 border-t-gray-400 border-l-gray-400 border-b-white border-r-white"}>
                    {props.counter.toString().padStart(3,'0')}
                </div>
                <div>
                    <button onClick={props.regenerate} className={"border-2 text-xl h-[30px] w-[30px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white inline-flex leading-none items-center justify-center"}>
                        {emoji}
                    </button>
                </div>
                <div className={"font-kdam inline-flex p-px text-2xl leading-none bg-black text-red-500 font-bold border-2 border-t-gray-400 border-l-gray-400 border-b-white border-r-white"}>
                    {props.timer > 999 ? '???' : props.timer.toString().padStart(3,'0')}
                </div>
            </div>
        </div>
    )
}

export default Counter;