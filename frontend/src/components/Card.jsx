export default function Card(props) {
    return (
        <div className={`p-8 w-[20.6rem] h-[17.8rem] rounded-lg ${props.mode === "light" ? "bg-stone-100 text-[#0f0f0f]" : "bg-[#2f2f2f] text-white"}`}>
            <h4 className="text-[1.4rem] mb-6">Course Name</h4>
            <p className="mb-5">Instructor: </p>
            <p className="mb-5">Time: </p>
            <p>Students enrolled: </p>
        </div>
    )
}
