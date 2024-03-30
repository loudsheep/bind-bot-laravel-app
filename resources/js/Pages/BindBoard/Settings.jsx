import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function BindBoardSettingsPage({ auth, bindboard, guild }) {
    const { data, setData, errors, patch, reset, processing, recentlySuccessful } = useForm({
        name: bindboard.name,
        description: bindboard.description,
        voice_channel: guild ? guild.selected_voice_channel : null,
    });

    const notifySuccess = (messsage) => toast.success(messsage, {
        position: "top-right", autoClose: 4000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        patch(route('bindboard.update', bindboard.hash));
    };

    if (recentlySuccessful) {
        notifySuccess();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{bindboard.name}</h2>}
        >
            <ToastContainer />
            <Head title={"Settings - " + bindboard.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className='w-full flex justify-between'>
                            <h1 className='font-semi-bold text-xl'>Settings of <span className='font-bold'>{bindboard.name}</span> bindboard</h1>
                            {(guild && !guild.verified) && (    
                                <a href="https://discord.com/oauth2/authorize?client_id=1221410587372818464">
                                    <PrimaryButton>Add our bot to your server</PrimaryButton>
                                </a>
                            )}
                        </div>
                        {bindboard.description && (
                            <div className='w-full flex justify-start'>
                                <h3>{bindboard.description}</h3>
                            </div>
                        )}

                        <div className='w-full mt-10 flex flex-wrap mx-auto'>
                            <form onSubmit={onSubmit} className='w-full'>
                                <div className='w-full flex flex-wrap'>
                                    <div className='flex-1 min-w-48 mx-1 mb-2'>
                                        <InputLabel htmlFor="name" value="Bindboard name:" />

                                        <TextInput
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full"
                                            autoComplete="guild-name"
                                        />

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className='flex-1 min-w-48 mx-1 mb-2'>
                                        <InputLabel htmlFor="name" value="Voice channel to play binds:" />

                                        <SelectInput id="voice_channel" onChange={(e) => setData('voice_channel', e.target.value)} className="mt-1 block w-full" value={data.voice_channel} disabled={!guild?.voice_channels}>
                                            <option value="" disabled selected={true}>Select voice channel</option>

                                            {guild?.voice_channels && (
                                                <>
                                                    {JSON.parse(guild.voice_channels).map((value, idx) => (
                                                        <option value={value.channelId} key={idx}>{value.name}</option>
                                                    ))}
                                                </>
                                            )}
                                        </SelectInput>

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                </div>
                                <div className='flex-1 min-w-48 mx-1 mb-2'>
                                    <InputLabel htmlFor="description" value="Bindboard description:" />

                                    <TextInput
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="guild-description"
                                    />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className='w-full flex flex-wrap mx-1'>
                                    <PrimaryButton className='' type="submit">Save</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    )
}
