import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GeneralSettings from './Partials/General';
import Invites from './Partials/Invites';
import UsersPartial from './Partials/Users';


export default function BindBoardSettingsPage({ auth, bindboard, guild }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight"><a href={route('bindboard.show', bindboard.hash)}>{bindboard.name}</a></h2>}
        >
            <ToastContainer />
            <Head title={"Settings - " + bindboard.name} />

            <div className="py-12 text-font-main">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-background border border-background-secondary overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className='w-full flex justify-between'>
                            <h1 className='text-xl text-icon'>General settings of <span className='font-bold text-font-main'>{bindboard.name}</span> bindboard</h1>
                            {(!guild || (guild && !guild.verified)) && (
                                <a href={route('bindboard.bot', bindboard.hash)}>
                                    <PrimaryButton>Add our bot to your server</PrimaryButton>
                                </a>
                            )}
                        </div>
                        {bindboard.description && (
                            <div className='w-full flex justify-start text-icon text-sm'>
                                <h3>{bindboard.description}</h3>
                            </div>
                        )}

                        <GeneralSettings bindboard={bindboard} guild={guild}></GeneralSettings>
                    </div>

                    <div className="bg-background border border-background-secondary overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <Invites bindboard={bindboard}></Invites>
                    </div>

                    <div className="bg-background border border-background-secondary overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <UsersPartial></UsersPartial>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    )
}
