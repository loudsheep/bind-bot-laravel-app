export default function BindButton({ onClick, className, bindName }) {
    return (
        <button className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-3 min-w-full sm:min-w-64 mb-3 " + className} onClick={onClick}>
            <span className="material-symbols-outlined">
                graphic_eq
            </span>
            {bindName}
        </button>
    )
}
