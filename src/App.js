import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Contributors from './pages/Contributors';
import Header from './components/Header'
import SingleUser from './pages/SingleUser';
import { ThemeContext } from './components/themeContext';
import RepoDetails from './pages/components/RepoDetails';

export default function App() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className='dark:bg-[#27292c] transition-all w-full min-h-screen h-full'>
      <Header setDarkToggle={setTheme} darkToggle={theme} />
      <Routes>
        <Route path='/' element={<Contributors />} />
        <Route path='/user/:userId' element={<SingleUser />} />
        <Route path='/user/repo' element={<RepoDetails />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  )
}
