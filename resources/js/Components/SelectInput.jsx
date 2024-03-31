import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ type = 'text', className = '', isFocused = false, children, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select {...props} className={'border-none bg-background-secondary caret-white text-font-main focus:border-primary focus:ring-indigo-500 rounded-md shadow-sm ' + className} ref={input}>
            {children}
        </select>
    );
});
