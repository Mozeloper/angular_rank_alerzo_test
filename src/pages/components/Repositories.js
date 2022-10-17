import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Repositories({ details }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = false;
        (async () => {
            mounted = true;
            setIsLoading(true);
            if (mounted) {
                await axios.get(`https://rhubarb-cupcake-63391.herokuapp.com/user-overview/${details?.login}/repos`)
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
    }, [details?.login]);

    return (
        <>
            <div className='mt-4 w-full overflow-x-auto overflow-hidden no-scrollbar'>
                {isLoading && (
                    <div className='w-full flex items-center justify-center h-full'>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                )}
                <table className="w-full dark:bg-BACKGROUND_DARK bg-BACKGROUND_WHITE rounded-lg">
                    {!!!isLoading && (
                        <>
                            <thead className='border-b border-BORDER_COLOR'>
                                <tr>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Repositories</td>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Language</td>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Open Issues</td>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Forks</td>
                                    <td className="text-[#27292c] dark:text-[#f4f4f4] text-xs text-left px-8 py-4 whitespace-nowrap">Watchers</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map(((list) => {
                                    return (
                                        <tr key={list?.id}>
                                            <td className='flex gap-4 px-8 py-4'>
                                                <div onClick={() => navigate(`/user/repo?repo_name=${list?.name}&login=${details?.login}`)} className='cursor-pointer flex flex-col gap-2'>
                                                    <h3 className='text-[#0cd] text-xs'>{list?.name}</h3>
                                                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-xs'>{list?.description}</h3>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-[#27292c] dark:text-[#f4f4f4] text-xs whitespace-nowrap">{list?.language}</td>
                                            <td className="px-8 py-4 text-[#27292c] dark:text-[#f4f4f4] text-xs whitespace-nowrap">{list?.open_issues}</td>
                                            <td className="px-8 py-4 text-[#27292c] dark:text-[#f4f4f4] text-xs whitespace-nowrap">{list?.forks}</td>
                                            <td className="px-8 py-4 text-[#27292c] dark:text-[#f4f4f4] text-xs whitespace-nowrap">{list?.watchers}</td>
                                        </tr>
                                    )
                                }))}
                            </tbody>
                        </>
                    )}
                </table>
            </div>
        </>
    )
}
