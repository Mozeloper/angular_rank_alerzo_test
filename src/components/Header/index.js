import React from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from "react-dark-mode-toggle";
import Logo from "../../assets/images/logo.svg";

export default function Header({ setDarkToggle, darkToggle }) {
    const navigate = useNavigate();

    return (
        <header className='w-full h-[82px] bg-BACKGROUND_WHITE dark:bg-BACKGROUND_DARK transition-all flex justify-between items-center md:px-[10%] px-[5%] text-red-600'>
            <img src={Logo} alt="logo" className='cursor-pointer' onClick={() => navigate("/")} />
            <DarkModeToggle className='outline-none' onChange={() => setDarkToggle(darkToggle === 'dark' ? 'light' : 'dark')} checked={darkToggle === "dark" ? false : true} size={40} />
        </header>
    )
}