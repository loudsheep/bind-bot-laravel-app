export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-icon bg-background p-1 outline-none text-indigo-600 shadow-sm ' +
                className
            }
        />
    );
}
