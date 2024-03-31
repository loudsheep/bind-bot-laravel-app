import PrimaryButton from '@/Components/PrimaryButton';
import 'react-toastify/dist/ReactToastify.css';

export default function Invites({ bindboard }) {
    return (
        <>
            <div className='w-full flex justify-between'>
                <h1 className='font-semi-bold text-xl'>Invitations</h1>
                <a href={route('bindboard.bot', bindboard.hash)}>
                    <PrimaryButton>Invite</PrimaryButton>
                </a>
            </div>
            <div className='w-full flex justify-start text-icon text-sm'>
                <h3>Active invitations</h3>
            </div>
        </>
    )
}
