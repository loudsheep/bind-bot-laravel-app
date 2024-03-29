export default function BindButton({ onClickMain, onClickDelete = () => {console.log("DEL");}, className, bindName, showDeleteButton = false }) {
    return (
        <div className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex justify-between items-center me-3 min-w-full sm:min-w-64 mb-3 cursor-pointer" + className}>
            <div className="inline-flex items-center py-2.5 pl-5 whitespace-nowrap overflow-hidden text-ellipsis mr-1" style={{flex: "9"}} onClick={onClickMain}>
                <span className="material-symbols-outlined">
                    graphic_eq
                </span>
                {bindName}
            </div>
            {showDeleteButton && (
                <button className="bg-blue-800 hover:bg-blue-700 h-full rounded-r-lg flex justify-center items-center px-1" style={{flex: "1"}} onClick={onClickDelete}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            )}
        </div>
    )
}
