import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';
import axios from 'axios';
import { useState } from 'react';


export default function GeneralSettings({ bindboard, guild, notifySuccess, notifyFailure }) {
    const [voiceChannels, setVoiceChannels] = useState(JSON.parse(guild.voice_channels));
    const { data, setData, errors, patch, reset, processing } = useForm({
        name: bindboard.name,
        description: bindboard.description,
        voice_channel: guild ? guild.selected_voice_channel : null,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        patch(route('bindboard.update', bindboard.hash), {
            onSuccess: () => notifySuccess("Settings updated!"),
        });
    };

    const reloadChannels = () => {
        axios.post(route('guild.reload', bindboard.hash)).then(res => {
            let data = res.data;
            if (data.status == 200) notifySuccess(data.message);
            else notifyFailure(data.message);

            console.log(data, JSON.parse(data.data));
            setVoiceChannels(JSON.parse(data.data));
        }).catch(reason => {
            console.log(reason);
            let status = reason.response.status;
            if (status == 429) notifyFailure(reason.response.message);
        });
    };

    return (
        <div className="">
            <div className='flex flex-col justify-between items-center pb-3 text-font-main border-b border-background-secondary'>
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
            </div>

            <div className='w-full mt-5 flex flex-wrap mx-auto'>
                <form onSubmit={onSubmit} className='w-full'>
                    <div className='w-full flex flex-wrap items-end'>
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
                            <InputLabel htmlFor="name" className='flex items-center' disabled={!guild?.voice_channels}>
                                Voice channel to play binds:
                                <span class={"material-symbols-outlined text-green-400 scale-[.9] " + (guild?.voice_channels ? "cursor-pointer hover:text-font-main" : "text-background-secondary")} onClick={reloadChannels}>
                                    cached
                                </span>
                            </InputLabel>

                            <SelectInput id="voice_channel" onChange={(e) => setData('voice_channel', e.target.value)} className="mt-1 block w-full" value={data.voice_channel} disabled={!voiceChannels}>
                                <option value="" disabled selected={true}>Select voice channel</option>

                                {voiceChannels && (
                                    <>
                                        {voiceChannels.map((value, idx) => (
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
    )
}
