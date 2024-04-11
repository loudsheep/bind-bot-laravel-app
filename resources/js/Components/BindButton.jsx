import Modal from '@/Components/Modal';
import { useState, useEffect } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';
import DangerButton from './DangerButton';
import { router } from '@inertiajs/react';


export default function BindButton({ className, permissions, canPlayBindUsingBot, bind, notifySuccess, notifyFailure }) {
    const [showPlayBindModal, setShowPlayBindModal] = useState(false);
    const [audio, setAudio] = useState(null);
    const [playing, setPlaying] = useState(false);

    const onClosePlayBindModal = () => {
        setShowPlayBindModal(false);
        setPlaying(false);
    };

    const openPlayModal = () => {
        setShowPlayBindModal(true);
        setAudio(new Audio(route('bind.file', bind.bind_path)));
    };

    const playAudio = () => {
        setPlaying(true);

        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    };

    const playOnServer = () => {
        if (!audio || !bind) return;

        axios.post(route('bind.play', bind.bind_path)).then(res => {
            let data = res.data;
            if (data.status == 200) notifySuccess(data.message);
            else if (data.status == 500) notifyFailure(data.message);
            else notifyFailure(data.message);
        }).catch(reason => {
            let status = reason.response.status;
            if (status == 429) notifyFailure("Slow down there. You're being rate limited");
        });
    };

    const clickDelete = () => {
        if(confirm("Yuo sure?")) {
            router.delete(route('bind.destroy', bind.bind_path), {
                onSuccess: () => {
                    notifySuccess("Deleted");
                    onClosePlayBindModal();
                },
            });
        }
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

    if (bind?.active) {
        return (
            <div className={"focus:outline-none font-medium rounded-lg text-sm  text-center inline-flex justify-between items-center min-w-full sm:min-w-64 text-white bg-blue-700 hover:bg-blue-800 cursor-pointer " + className}>

                <Modal show={showPlayBindModal && bind !== null} onClose={onClosePlayBindModal} maxWidth='md' >
                    <div className="relative bg-background border border-background-secondary rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b border-background-secondary rounded-t">
                            <h3 className="text-xl font-bold text-font-main">
                                {bind?.name}
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal" onClick={onClosePlayBindModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            {bind != null && (
                                <div className='w-full flex justify-center items-center mb-5'>
                                    <audio controls={true}>
                                        <source src={route('bind.file', bind.bind_path)} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}

                            <div className='w-full flex'>
                                <SecondaryButton className='flex-1 justify-center mr-1' onClick={playAudio}>Play here</SecondaryButton>
                                <SecondaryButton className={'flex-1 justify-center ml-1 ' + (permissions.PLAY_BIND_ON_SERVER && canPlayBindUsingBot ? '' : 'cursor-not-allowed')} disabled={!(permissions.PLAY_BIND_ON_SERVER && canPlayBindUsingBot)} onClick={playOnServer}>Play on server</SecondaryButton>
                            </div>

                            {permissions.DELETE_BIND && (
                                <div className='w-full flex'>
                                    <DangerButton className='flex-1 justify-center mt-2' onClick={clickDelete}>Delete</DangerButton>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>

                <div className="inline-flex items-center py-2.5 pl-2.5 whitespace-nowrap overflow-hidden text-ellipsis mr-1" style={{ flex: "9" }} onClick={openPlayModal}>
                    <span className="material-symbols-outlined mr-1">
                        graphic_eq
                    </span>
                    {bind?.name}
                </div>
                {(permissions.DELETE_BIND) && (
                    <button className="h-full rounded-r-lg flex justify-center items-center px-1 text-white bg-blue-700 hover:bg-blue-800 cursor-pointer" style={{ flex: "1" }}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={"focus:outline-none font-medium rounded-lg text-sm  text-center inline-flex justify-between items-center min-w-full sm:min-w-64 text-gray-300 bg-gray-400 cursor-not-allowed " + className}>
            <div className="inline-flex items-center py-2.5 pl-2.5 whitespace-nowrap overflow-hidden text-ellipsis mr-1" style={{ flex: "9" }}>
                <span className="material-symbols-outlined mr-1">
                    graphic_eq
                </span>
                {bind?.name}
            </div>
            {permissions.DELETE_BIND && (
                <button className="h-full rounded-r-lg flex justify-center items-center px-1 text-gray-300 bg-gray-400 cursor-not-allowed" style={{ flex: "1" }} onClick={clickDelete}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            )}
        </div>
    );
}
