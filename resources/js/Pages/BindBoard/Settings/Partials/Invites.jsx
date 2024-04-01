import PrimaryButton from '@/Components/PrimaryButton';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';


export default function Invites({ bindboard, invites }) {
    const [showNewInviteModal, setShowNewInviteModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        active_for: 7,
        max_users: null,
    });

    const onCloseNewInviteModal = () => setShowNewInviteModal(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('invite.store', bindboard.hash), {
            onSuccess: () => onCloseNewInviteModal(),
        });
    };

    const handleDelete = (hash) => {
        router.delete(route('invite.destroy', hash));
    };

    return (
        <>
            <Modal show={showNewInviteModal} onClose={onCloseNewInviteModal} maxWidth='md'>
                <div className="relative rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-background-secondary rounded-t">
                        <h3 className="text-xl font-semibold text-font-main">
                            Create new invitation to your bindboard
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal" onClick={onCloseNewInviteModal}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="active_for" value="Active for(days):" />
                                <TextInput id="active_for" type="number" name="active_for" min={1} max={30} value={data.active_for} required={true} className="mt-1 block w-full" autoComplete="active_for" onChange={(e) => setData('active_for', e.target.value)} />
                                <InputError message={errors.active_for} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="max_users" value="Max users (0 or empty for unlimited):" />
                                <TextInput id="max_users" type="number" name="max_users" value={data.max_users} max={30} className="mt-1 block w-full" autoComplete="max_users" onChange={(e) => setData('max_users', e.target.value)} />
                                <InputError message={errors.max_users} className="mt-2" />
                            </div>
                            <PrimaryButton className='w-full text-center'>
                                Create Invitation
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </Modal>

            <div className='w-full flex justify-between'>
                <h1 className='font-semi-bold text-xl'>Invitations</h1>
                <PrimaryButton onClick={() => setShowNewInviteModal(true)}>Invite</PrimaryButton>
            </div>
            <div className='w-full flex justify-start text-icon text-sm'>
                <h3>Active invitations</h3>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border border-background-secondary">
                <table className="w-full text-sm text-left rtl:text-right text-icon">
                    <thead className="text-xs text-icon uppercase dark:bg-background">
                        <tr className=''>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Link
                            </th>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Active Until
                            </th>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Used
                            </th>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Created
                            </th>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invites.map((value, idx) => (
                            <tr className="bg-background border-t border-background-secondary" key={idx}>
                                <th scope="row" className="px-6 py-4 font-medium text-icon whitespace-nowrap">
                                    <a href={route('invite.show', value.hash)} target='_black'>
                                        {route('invite.show', value.hash)}
                                    </a>
                                </th>
                                <td className="px-6 py-4">
                                    {new Date(value.active_until).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    {value.users_used + (value.max_users ? "/" + value.max_users : "")}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(value.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(value.hash)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                    {/* <a href={route('invite.destroy', value.hash)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a> */}
                                </td>
                            </tr>
                        ))}
                        {/* <tr className="odd:bg-background even:bg-gray-800 border-t border-background-secondary">
                            <th scope="row" className="px-6 py-4 font-medium text-icon whitespace-nowrap">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>

        </>
    )
}
