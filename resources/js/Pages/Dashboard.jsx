import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, authoredBindBoards }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className='flex justify-between mb-10'>
                            <h1 className='font-bold text-xl'>Your BindBoards</h1>
                            <PrimaryButton className=''>Add new BindBoard</PrimaryButton>
                        </div>
                        <div className='flex flex-wrap'>
                            {authoredBindBoards.map((value, idx) => (
                                <div key={idx} className=''>
                                    <a href={route('bindboard.show', value.hash)} className='text-blue-500'>
                                        {value.name}
                                    </a>
                                    <br />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
