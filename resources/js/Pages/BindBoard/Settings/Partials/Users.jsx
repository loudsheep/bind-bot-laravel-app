import PrimaryButton from '@/Components/PrimaryButton';
import 'react-toastify/dist/ReactToastify.css';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';


export default function UsersPartial({ auth, participants, permissions, notifySuccess, notifyFailure }) {
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);
    const { data, setData, patch, processing, errors, reset } = useForm({
        participant_id: null,
        user_name: null,
        permissions: 0,
    });

    const onClosePermissionsModal = () => setShowPermissionsModal(false);

    const openPermissionsModal = (participant) => {
        setShowPermissionsModal(true);
        setData({
            participant_id: participant.id,
            user_name: participant.user.name,
            permissions: participant.permissions,
        });
        console.log(data);
    };

    const togglePermission = (number, checked) => {
        if ((data.permissions & number) > 0) {
            setData('permissions', data.permissions - number);
        } else {
            setData('permissions', data.permissions + number);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route('participant.update', data.participant_id), {
            onSuccess: () => {onClosePermissionsModal(); notifySuccess("Saved")},
            onError: () => notifyFailure("Error occured"),
        });
    };

    const handleRemove = (id) => {
        if (confirm("Are you sure to remove this user? They will lose access to this BindBoard")) {
            router.delete(route('participant.destroy', id), {
                onSuccess: () => notifySuccess("User removed"),
                onError: () => notifyFailure("Error occured"),
            });
        }
    };

    return (
        <div className="mt-20">
            <Modal show={showPermissionsModal} onClose={onClosePermissionsModal} maxWidth='md'>
                <div className="relative rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-background-secondary rounded-t">
                        <h3 className="text-xl font-semibold text-icon">
                            Modify <span className='text-font-main'>{data.user_name}</span> permissions
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal" onClick={onClosePermissionsModal}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={submit}>
                            {Object.keys(permissions).map((key, idx) => (
                                <div key={idx}>
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={(data.permissions & permissions[key]) > 0}
                                            onChange={(e) => togglePermission(permissions[key], e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-icon">{key}</span>
                                    </label>
                                </div>
                            ))}
                            <PrimaryButton className='w-full text-center'>
                                Save
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </Modal>

            <div className='flex flex-col justify-between items-center pb-3 text-font-main border-b border-background-secondary'>
                <div className='w-full flex justify-between'>
                    <h1 className='font-semi-bold text-xl'>User menagement</h1>
                </div>
                <div className='w-full flex justify-start text-icon text-sm'>
                    <h3>Users and their permissions</h3>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border border-background-secondary">
                <table className="w-full text-sm text-left rtl:text-right text-icon">
                    <thead className="text-xs text-icon uppercase dark:bg-background">
                        <tr className=''>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Permissions
                            </th>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Joined
                            </th>
                            <th scope="col" className="px-6 py-3 text-font-main">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((value, idx) => (
                            <tr className="bg-background border-t border-background-secondary" key={idx}>
                                <th scope="row" className="px-6 py-4 font-medium text-icon whitespace-nowrap">
                                    {value.user.name}
                                </th>
                                <td className="px-6 py-4">
                                    <button disabled={value.user.name == auth.user.name} onClick={() => openPermissionsModal(value)} className="font-medium text-blue-600 disabled:text-gray-500 hover:underline disabled:hover:no-underline">Permissions: {value.permissions}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(value.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <button disabled={value.user.name == auth.user.name} onClick={() => handleRemove(value.id)} className="font-medium text-red-600 disabled:text-gray-500 hover:underline disabled:hover:no-underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
