import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DangerButton from '@/Components/DangerButton';

export default function Invite({ auth, invite, bindboard }) {
    return (
        <GuestLayout>
            <Head title="Invitation" />

            <div className='w-full text-icon'>
                <h1 className='text-2xl border-background-secondary border-b-2 '>
                    You have been invited to join <span className='font-bold text-font-main'>{bindboard.name}</span> bindboard
                </h1>

                <p className='mt-10'>
                    If you accept you'll be able to use all of the Binds in this Bindboard.
                </p>

                <p className='text-xs mt-5'>
                    Creator and admins of {bindboard.name} will see this info:
                    <ul className='ml-5 list-disc'>
                        <li>Your name</li>
                        <li>Your profile picture</li>
                    </ul>
                </p>

                <div className='w-full flex mt-10 flex-wrap'>
                    <a href={route('dashboard')} className='flex-1 mx-1 mt-3'>
                        <DangerButton className='w-full text-nowrap'>Go Back</DangerButton>
                    </a>
                    <a href={route('invite.accept', invite.hash)} className='flex-1 mx-1 mt-3'>
                        <PrimaryButton className='w-full text-nowrap'>Join me</PrimaryButton>
                    </a>
                </div>

            </div>
        </GuestLayout>
    )
}
