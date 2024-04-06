const dynamicStyle = (active) => {
    if (active) return "text-white bg-blue-700 hover:bg-blue-800 cursor-pointer ";
    return "text-gray-300 bg-gray-400 cursor-not-allowed ";
};

export default function BindButton({ onClickMain, onClickDelete = () => { }, className, bindName, showDeleteButton = false, active = true }) {
    const clickMain = () => {
        if (active) onClickMain();
    }

    const clickDelete = () => {
        if (active) onClickDelete();
    };

    return (
        <div className={" focus:outline-none font-medium rounded-lg text-sm  text-center inline-flex justify-between items-center min-w-full sm:min-w-64 " + dynamicStyle(active) + className} disabled={true}>
            <div className="inline-flex items-center py-2.5 pl-5 whitespace-nowrap overflow-hidden text-ellipsis mr-1" style={{ flex: "9" }} onClick={clickMain}>
                <span className="material-symbols-outlined">
                    graphic_eq
                </span>
                {bindName}
            </div>
            {showDeleteButton && (
                <button className={"h-full rounded-r-lg flex justify-center items-center px-1 " + dynamicStyle(active)} style={{ flex: "1" }} onClick={clickDelete}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            )}
        </div>
    )
}
