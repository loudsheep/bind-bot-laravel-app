import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import BindButton from '@/Components/BindButton';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Show({ auth, bindboard, binds, permissions, canAddMoreBinds, canPlayBindUsingBot }) {
    const [showNewBindModal, setShowNewBindModal] = useState(false);
    const [showPlayBindModal, setShowPlayBindModal] = useState(false);
    const [bindToPlay, setBindToPlay] = useState(null);
    const [audio, setAudio] = useState(null);
    const [playing, setPlaying] = useState(false);
    const notifySuccess = (messsage) => toast.success(messsage, {
        position: "top-right", autoClose: 4000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", transition: Bounce,
    });
    const notifyFailure = (messsage) => toast.error(messsage, {
        position: "top-right", autoClose: 4000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", transition: Bounce,
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        bind: '',
    });

    const onCloseNewBindModal = () => {
        setShowNewBindModal(false);
        reset("name", "bind");
    }
    const onClosePlayBindModal = () => {
        setShowPlayBindModal(false);
        setPlaying(false);
    };

    const openPlayModal = (bind) => {
        setShowPlayBindModal(true);
        setBindToPlay(bind);
        setAudio(new Audio(route('bind.file', bind.bind_path)));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('bind.create', bindboard.hash), {
            onSuccess: () => {
                onCloseNewBindModal();
            },
        });
    };

    const playAudio = () => {
        setPlaying(true);

        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    };

    const playOnServer = () => {
        if (!audio || !bindToPlay) return;

        axios.post(route('bind.play', bindToPlay.bind_path)).then(res => {
            let data = res.data;

            if (data.status == 200) notifySuccess(data.message);
            else if (data.status == 500) notifyFailure(data.message);
            else notifyFailure(data.message);
        }).catch(reason => {
            let status = reason.response.status;
            if (status == 429) notifyFailure("Slow down there. You're being rate limited");
        });
    };

    useEffect(() => {
        if (audio) {
            playing ? audio.play() : audio.pause();
        }
    }, [playing]);

    useEffect(() => {
        if (!audio) return;
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">{bindboard.name}</h2>}
        >
            <ToastContainer />
            <Head title={"Bindboard - " + bindboard.name} />
            <Modal show={showNewBindModal} onClose={onCloseNewBindModal} maxWidth='md'>
                <div className="relative bg-background border border-background-secondary rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-background-secondary rounded-t">
                        <h3 className="text-xl font-semibold text-font-main">
                            Upload your new Bind
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal" onClick={onCloseNewBindModal}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Name it:" />
                                <TextInput id="name" type="text" name="name" value={data.name} required={true} className="mt-1 block w-full" autoComplete="username" isFocused={true} onChange={(e) => setData('name', e.target.value)} />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                {/* <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload MP3 file:</label> */}
                                <InputLabel htmlFor="file_input" value="Upload MP3 file:" />
                                <input className="block w-full text-sm text-font-main cursor-pointer focus:outline-none" id="file_input" type="file" accept=".mp3" required={true} onChange={(e) => setData('bind', e.target.files[0])} />
                                {errors.bind && (
                                    <p className='text-sm text-red-600 '>
                                        {errors.bind}
                                    </p>
                                )}
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create your awesome Bind</button>
                        </form>
                    </div>
                </div>
            </Modal>

            <Modal show={showPlayBindModal && bindToPlay !== null} onClose={onClosePlayBindModal} maxWidth='md' >
                <div className="relative bg-background border border-background-secondary rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-background-secondary rounded-t">
                        <h3 className="text-xl font-bold text-font-main">
                            {bindToPlay?.name}
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal" onClick={onClosePlayBindModal}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        {bindToPlay != null && (
                            <div className='w-full flex justify-center items-center mb-5'>
                                <audio controls={true}>
                                    <source src={route('bind.file', bindToPlay.bind_path)} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )}

                        <div className='w-full flex'>
                            <SecondaryButton className='flex-1 justify-center mr-1' onClick={playAudio}>Play here</SecondaryButton>
                            <SecondaryButton className={'flex-1 justify-center ml-1 ' + (permissions.PLAY_BIND_ON_SERVER && canPlayBindUsingBot ? '' : 'cursor-not-allowed')} disabled={!(permissions.PLAY_BIND_ON_SERVER && canPlayBindUsingBot)} onClick={playOnServer}>Play on server</SecondaryButton>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="py-12 text-font-main">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-background border border-background-secondary overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className='w-full flex justify-between'>
                            <h1 className='font-semi-bold text-xl'>Binds of <span className='font-bold'>{bindboard.name}</span> bindboard</h1>
                            <div className='flex'>
                                {permissions.CREATE_BIND && (
                                    <PrimaryButton className={permissions.CREATE_BIND && canAddMoreBinds ? '' : 'cursor-not-allowed'} onClick={() => setShowNewBindModal(true)} disabled={!(permissions.CREATE_BIND > 0 && canAddMoreBinds)}>Add new Bind</PrimaryButton>
                                )}
                                {permissions.ADMIN && (
                                    <a href={route('bindboard.edit', bindboard.hash)} className='mx-2'>
                                        <button className="h-full rounded-lg hover:bg-background-secondary flex justify-center items-center px-1">
                                            <span class="material-symbols-outlined text-icon">
                                                settings
                                            </span>
                                        </button>
                                    </a>
                                )}
                            </div>
                        </div>
                        {bindboard.description && (
                            <div className='w-full flex justify-start'>
                                <h3>{bindboard.description}</h3>
                            </div>
                        )}
                        <div className='mt-10 flex flex-wrap mx-auto'>
                            {binds.map((value, idx) => (
                                <BindButton title={value.name} bindName={value.name} key={idx} onClickMain={() => openPlayModal(value)} showDeleteButton={true} active={value.active == 1}></BindButton>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
