import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GeneralSettings from './Partials/General';
import Invites from './Partials/Invites';
import UsersPartial from './Partials/Users';


export default function BindBoardSettingsPage({ auth, bindboard, guild, invites, participants }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight"><a href={route('bindboard.show', bindboard.hash)}>{bindboard.name}</a></h2>}
        >
            <ToastContainer />
            <Head title={"Settings - " + bindboard.name} />

            <div className="py-12 text-font-main">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <GeneralSettings bindboard={bindboard} guild={guild}></GeneralSettings>

                    <Invites bindboard={bindboard} invites={invites}></Invites>
                    
                    <UsersPartial auth={auth} participants={participants}></UsersPartial>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
