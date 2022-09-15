function SquareMark() {
    return (
        <span className={"text-red-500 absolute inline-flex inset-0"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </span>
    )
}

export default SquareMark;