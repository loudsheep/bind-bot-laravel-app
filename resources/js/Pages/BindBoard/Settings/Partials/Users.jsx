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



export default function UsersPartial({ auth, participants }) {
    const handleRemove = (id) => {
        if (confirm("Are you sure to remove this user? They will lose access to this BindBoard")) {
            router.delete(route('participant.destroy', id));
        }
    };

    return (
        <>
            <div className='w-full flex justify-between'>
                <h1 className='font-semi-bold text-xl'>User menagement</h1>
            </div>
            <div className='w-full flex justify-start text-icon text-sm'>
                <h3>Users and their permissions</h3>
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
                                    <button disabled={value.user.name == auth.user.name} onClick={() => handleDelete(value.id)} className="font-medium text-blue-600 disabled:text-gray-500 hover:underline disabled:hover:no-underline">Permissions: {value.permissions}
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
        </>
    )
}
