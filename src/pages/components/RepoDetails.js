import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBack from "../../assets/images/arrow_back.png";

export default function RepoDetails() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const queryParams = new URLSearchParams(window.location.search)
    const repo_name = queryParams.get("repo_name");
    const login = queryParams.get("login");

    useEffect(() => {
        let mounted = false;
        (async () => {
            mounted = true;
            setIsLoading(true);
            if (mounted) {
                await axios.get(`https://rhubarb-cupcake-63391.herokuapp.com/user-overview/repos?repo_name=${repo_name}&login=${login}`)
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
    }, [repo_name, login]);

    return (
        <>
            <div className='w-full flex flex-col items-center mt-6'>
                <img
                    className="inline-block h-[120px] w-[120px] rounded-full ring-2 ring-white"
                    src="https://img.icons8.com/3d-fluency/100/000000/github.png"
                    alt=""
                />
                <div className='flex flex-col mt-2'>
                    <h3 className='text-[#0cd] text-base text-center'>{login}</h3>
                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-base text-center'>{repo_name}</h3>
                </div>
            </div>
            <div className='md:px-[10%] px-[5%] h-full w-full'>
                <div className='flex items-center gap-3'>
                    <img
                        onClick={() => navigate(-1)}
                        className="inline-block cursor-pointer rounded-full h-[20px] w-[20px] ring-2 ring-white"
                        src={ArrowBack}
                        alt="arrow"
                    />
                    <h3 className='text-3xl dark:text-white text-black font-extrabold'>
                        Repository Details
                    </h3>
                </div>
                {isLoading && (
                    <div className='w-full flex items-center justify-center h-full'>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                )}
                {!!!isLoading && (
                    <div className='mt-4 dark:bg-BACKGROUND_DARK p-8 w-full flex gap-2 flex-wrap rounded-lg'>
                        <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                            <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Language</h3>
                            <h3 className='text-[#0cd] text-base mt-16'>{data?.language ?? "Nil"}</h3>
                        </div>
                        <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                            <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Open Issues</h3>
                            <h3 className='text-[#0cd] text-base mt-16'>{data?.open_issues ?? "Nil"}</h3>
                        </div>
                        <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                            <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Forks</h3>
                            <h3 className='text-[#0cd] text-base mt-16'>{data?.forks ?? "Nil"}</h3>
                        </div>
                        <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                            <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Watchers</h3>
                            <h3 className='text-[#0cd] text-base mt-16'>{data?.watchers ?? "Nil"}</h3>
                        </div>

                    </div>
                )}
            </div>
        </>
    )
}
