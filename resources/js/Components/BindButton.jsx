export default function BindButton({ onClick, className, bindName, showDeleteButton = false }) {
    return (
        <div className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm pl-5 text-center inline-flex justify-between items-center me-3 min-w-full sm:min-w-64 mb-3 cursor-pointer " + className} onClick={onClick}>
            <div className="inline-flex items-center my-2.5">
                <span className="material-symbols-outlined">
                    graphic_eq
                </span>
                {bindName}
            </div>
            {showDeleteButton && (
                <button className="bg-blue-800 hover:bg-blue-700 h-full rounded-r-lg flex justify-center items-center px-1">
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            )}
        </div>
    )
}
