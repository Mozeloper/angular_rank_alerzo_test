import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Overview from './components/Overview';
import Repositories from './components/Repositories';
import ArrowBack from "../assets/images/arrow_back.png";

export default function SingleUser() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = false;
        (async () => {
            mounted = true;
            setIsLoading(true);
            setShowError(false)
            if (mounted) {
                await axios.get(`https://rhubarb-cupcake-63391.herokuapp.com/user-overview/${location?.state?.login}`)
                    .then((res) => {
                        setIsLoading(false);
                        setData(res?.data?.data)
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setShowError(true);
                        setError(err?.response?.data?.code);
                        setData(null);
                    })
            }
        })();
        return () => {
            mounted = false;
        };
    }, [location?.state?.login]);

    return (
        <>
            {isLoading && (
                <div className='w-full flex items-center justify-center h-full'>
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            )}
            {!!!isLoading && data !== null && !showError && (
                <>
                    <div className='w-full flex flex-col items-center mt-6'>
                        <img
                            className="inline-block h-[120px] w-[120px] rounded-full ring-2 ring-white"
                            src={data?.avatar_url}
                            alt="avatar"
                        />
                        <div className='flex flex-col mt-2'>
                            <h3 className='text-[#0cd] text-base'>{data?.name}</h3>
                            <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-base text-center'>{data?.login}</h3>
                        </div>
                    </div>
                    <div className='w-full flex justify-center mt-8'>
                        <div className=''>
                            <div className='flex justify-center gap-16'>
                                <h3 onClick={() => setActiveTab("overview")} className={`${activeTab === "overview" ? "text-[#0cd] border-b-2 border-[#0cd]" : "text-[#27292c] dark:text-[#f4f4f4]"} text-base cursor-pointer`}>Overview</h3>
                                <h3 onClick={() => setActiveTab("repositories")} className={`${activeTab === "repositories" ? "text-[#0cd] border-b-2 border-[#0cd]" : "text-[#27292c] dark:text-[#f4f4f4]"} text-base cursor-pointer`}>Repositories</h3>
                            </div>
                        </div>
                    </div>
                    <div className='md:px-[10%] px-[5%] h-full w-full'>
                        <div className='flex items-center gap-3'>
                            <img
                                onClick={() => navigate("/")}
                                className="inline-block cursor-pointer rounded-full h-[20px] w-[20px] ring-2 ring-white"
                                src={ArrowBack}
                                alt="arrow"
                            />
                            <h3 className='text-3xl dark:text-white text-black font-extrabold'>
                                Profile Details
                            </h3>
                        </div>
                        {activeTab === "overview" && (
                            <Overview data={data} />
                        )}
                        {activeTab === "repositories" && (
                            <Repositories details={data} />
                        )}
                    </div>
                </>
            )}
            {!!!isLoading && data === null && showError && (
                <div className='mt-10 flex justify-center items-center h-full text-3xl dark:text-white text-black font-extrabold'>
                    {error}
                </div>
            )}
        </>
    )
}
