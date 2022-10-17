import React from 'react'

export default function Overview({ data }) {
    return (
        <>
            <div className='mt-4 dark:bg-BACKGROUND_DARK p-8 w-full flex gap-2 flex-wrap rounded-lg'>
                <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Followers</h3>
                    <h3 className='text-[#0cd] text-base mt-16'>{data?.followers ?? "Nil"}</h3>
                </div>
                <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Repositories</h3>
                    <h3 className='text-[#0cd] text-base mt-16'>{data?.public_repos ?? "Nil"}</h3>
                </div>
                <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Company</h3>
                    <h3 className='text-[#0cd] text-base mt-16'>{data?.company ?? "Nil"}</h3>
                </div>
                <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Location</h3>
                    <h3 className='text-[#0cd] text-base mt-16'>{data?.location ?? "Nil"}</h3>
                </div>
                <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Gist</h3>
                    <h3 className='text-[#0cd] text-base mt-16'>{data?.public_gists ?? "Nil"}</h3>
                </div>
                <div className='shadow-lg dark:bg-[#27292c] w-[250px] rounded-lg p-6 hover:scale-105 cursor-pointer'>
                    <h3 className='text-[#27292c] dark:text-[#f4f4f4] text-sm border-b border-BORDER_COLOR w-[40%]'>Following</h3>
                    <h3 className='text-[#0cd] text-base mt-16'>{data?.following ?? "Nil"}</h3>
                </div>
            </div>
        </>
    )
}
