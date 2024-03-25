import UploadNewBindModal from '@/Components/Modals/UploadNewBindModal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, bindboard }) {
    const [showNewBindModal, setShowNewBindModal] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{bindboard.name}</h2>}
        >
            <Head title="Dashboard" />
            {showNewBindModal && (
                <UploadNewBindModal onClose={() => setShowNewBindModal(false)} bindBoardHash={bindboard.hash}></UploadNewBindModal>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className='flex justify-between mb-10'>
                            <h1 className='font-semi-bold text-xl'>Binds of <span className='font-bold'>{bindboard.name}</span> bindboard</h1>
                            <PrimaryButton className='' onClick={() => setShowNewBindModal(true)}>Add new Bind</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
