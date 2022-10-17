import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Contributors() {
    const [data, setData] = useState([])
    const [orderBy, setOrderBy] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const options = [
        {
            label: "Contributions",
            value: "num_contributions",
        },
        {
            label: "Popularity",
            value: "num_followers",
        },
        {
            label: "Repositories",
            value: "num_public_repos",
        },
        {
            label: "Gists",
            value: "num_gists",
        },
    ];

    useEffect(() => {
        let mounted = false;
        (async () => {
            mounted = true;
            setIsLoading(true);
            if (mounted) {
                await axios.get(`https://rhubarb-cupcake-63391.herokuapp.com/user-overview?order_by=${orderBy}`)
                    .then((res) => {
                        setIsLoading(false);
                        setData(res?.data?.data)
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        console.log(err)
                    })
            }
        })();
        return () => {
            mounted = false;
        };
    }, [orderBy]);

    return (
        <div className='md:px-[10%] px-[5%]'>
            <div className='bg-BACKGROUND_WHITE dark:bg-BACKGROUND_DARK overflow-y-auto overflow-hidden w-full h-[calc(100vh-130px)] mt-10 rounded-lg shadow-lg'>
                <div className='border-b border-BORDER_COLOR h-[91px] flex justify-between items-center w-full px-6'>
                    <h3 className='text-TEXT_COLOR_RED md:text-xl text-base font-extrabold hidden md:block'>
                        All Contributors
                    </h3>
                    <div className='flex gap-4'>
                        <div className='bg-white rounded-lg p-2 flex gap-4 items-center'>
                            <p className='text-[#3C3F43] md:text-sm text-xs'>Sort By:</p>
                            <Dropdown options={options} onChange={({ value }) => setOrderBy(value)} value={orderBy} placeholder="Select an option" />
                        </div>
                    </div>
                </div>
                {isLoading && (
                    <div className='w-full flex items-center justify-center h-full'>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                )}
                {!!!isLoading && (
                    <div className='mt-4 w-full mb-10 overflow-x-auto overflow-hidden no-scrollbar'>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Profile</td>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Contributions</td>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Followers</td>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Repositories</td>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Gists</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map(((list) => {
                                    return (
                                        <tr key={list?.id}>
                                            <td className='flex gap-4 px-8 py-4' onClick={() => navigate(`/user/${list?.id}`, { state: list })}>
                                                <img
                                                    className="cursor-pointer h-[2.5rem] w-[2.5rem] rounded-full ring-2 ring-white"
                                                    src={list?.avatar_url}
                                                    alt="avatar_url"
                                                />
                                                <div className='cursor-pointer flex flex-col gap-2'>
                                                    <h3 className='text-[#0cd] text-xs'>{list?.name}</h3>
                                                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-xs'>{list?.login}</h3>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-[#27292c] dark:text-[#f4f4f4] text-xs whitespace-nowrap">{list?.num_contributions}</td>
                                            <td className="px-8 py-4 text-[#27292c] dark:text-[#f4f4f4] text-xs whitespace-nowrap">{list?.num_followers}</td>
                                            <td className="px-8 py-4 text-[#27292c] dark:text-[#f4f4f4] text-xs whitespace-nowrap">{list?.num_public_repos}</td>
                                            <td className="px-8 py-4 text-[#27292c] dark:text-[#f4f4f4] text-xs whitespace-nowrap">{list?.num_gists}</td>
                                        </tr>
                                    )
                                }))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
