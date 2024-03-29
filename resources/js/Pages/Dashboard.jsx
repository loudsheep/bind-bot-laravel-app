import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
// import PrimaryButton from '@/Components/PrimaryButton';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import { useState, useEffect } from 'react';/
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import BindButton from '@/Components/BindButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Dashboard({ auth, authoredBindBoards, canCreateBindboards }) {
    const [showNewBindBoardModal, setShowNewBindBoardModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const onCloseNewBindBoardModal = () => setShowNewBindBoardModal(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('bindboard.store'), {
            onSuccess: () => onCloseNewBindBoardModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <Modal show={showNewBindBoardModal} onClose={onCloseNewBindBoardModal} maxWidth='md'>
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Create new awsome Bindboard
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal" onClick={onCloseNewBindBoardModal}>
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
                                <InputLabel htmlFor="description" value="Give it a description:" />
                                <TextInput id="description" type="text" name="description" value={data.description} className="mt-1 block w-full" autoComplete="username" onChange={(e) => setData('description', e.target.value)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create your awesome board</button>
                        </form>
                    </div>
                </div>
            </Modal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className='flex justify-between mb-10'>
                            <h1 className='font-bold text-xl'>Your BindBoards</h1>
                            <PrimaryButton className={!canCreateBindboards ? 'cursor-not-allowed' : ''} disabled={!canCreateBindboards} onClick={() => setShowNewBindBoardModal(true)}>Add new BindBoard</PrimaryButton>
                        </div>
                        <div className='flex flex-wrap justify-start'>
                            {authoredBindBoards.map((value, idx) => (
                                <a href={route('bindboard.show', value.hash)} key={idx} className="block w-64 mx-5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100" title={value.name}>
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis">{value.name}</h5>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
