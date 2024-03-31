import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function BindBoardBotPage({ auth, bindboard, guild, botUrl }) {
    const { data, setData, errors, patch, reset, processing, recentlySuccessful } = useForm({
        name: bindboard.name,
        description: bindboard.description,
        voice_channel: guild ? guild.selected_voice_channel : null,
    });

    const notifySuccess = (messsage) => toast.success(messsage, {
        position: "top-right", autoClose: 4000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        patch(route('bindboard.update', bindboard.hash));
    };

    if (recentlySuccessful) {
        notifySuccess();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">{bindboard.name}</h2>}
        >
            <ToastContainer />
            <Head title={"Bot - " + bindboard.name} />

            <div className="py-12 text-font-main">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-background border border-background-secondary overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className='w-full flex justify-center'>
                            <h1 className='font-semi-bold text-2xl'>Add our bot to your server</h1>
                        </div>

                        <div className='w-full flex justify-center pt-4'>
                            <a href={botUrl} target='_blank'>
                                <div className='border bg-background-secondary border-background-secondary py-2 px-10 rounded-md'>
                                    <div class="relative flex items-center">
                                        <img class="w-10 h-10 rounded-full" src="/binder_logo_transparent.png" alt="" />
                                        <span class="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-[2.5px] border-background rounded-full"></span>
                                        <span className='text-xl ml-3'>Bind-er</span>
                                        <div className='text-xs ml-2 mt-0.5 px-[2px] py-[1px] bg-primary rounded-sm'>BOT</div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className='w-full mt-5'>
                            <h1 className='font-semi-bold text-lg text-center'>After you do that just execute <span className='bg-background-secondary p-0.5 rounded-sm'>/verify</span> command on your server</h1>
                            <h1 className='font-semi-bold text-icon text-sm text-center'>And paste the verification code into it:</h1>
                        </div>

                        <div className='w-full flex justify-center pt-4'>
                            <div className='border bg-background-secondary border-background-secondary py-2 px-10 rounded-md'>
                                <div class="relative flex items-center">
                                    {guild.verification_code}
                                </div>
                            </div>
                        </div>

                        <div className='w-full mt-5 py-4'>
                            <h1 className='font-semi-bold text-icon text-sm text-center'>After successful verification you'll be able to use your Binds on voice channels.</h1>
                        </div>

                        <a href={route('bindboard.show', bindboard.hash)}>
                            <PrimaryButton>Back to BindBoard</PrimaryButton>
                        </a>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    )
}
