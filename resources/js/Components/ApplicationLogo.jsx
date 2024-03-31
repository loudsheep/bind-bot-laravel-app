export default function ApplicationLogo(props) {
    return (
        <h1 className='font-bold text-3xl inline-flex items-center justify-between text-font-main'>
            <img src="/binder_logo_transparent.png" alt="Binder logo" {...props} />
            <span className="ml-1">
                Bind-er
            </span>
        </h1>
    );
}
