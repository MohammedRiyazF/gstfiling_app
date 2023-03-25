import React from'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Gstfiling from './pages/gstfiling'
import Login from './pages/login.jsx'
import Layout from './pages/layout'
import Home from './pages/home'
import Downloads from './pages/downloads'
import Gstcmp02form from './modules/returns/components/gstcmp02form'
import Gstcmp08form from './modules/returns/components/gstcmp08form'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/download' element={<Downloads />} />
            <Route path='/dashboard/index' element={<Dashboard/>} />
            <Route path='/returns/gst_cmp_08/index' element={<Gstcmp08form/>} />
            <Route path='/returns/gst_cmp_02/index' element={<Gstcmp02form/>} />
            <Route path='/gstfiling' element={<Gstfiling/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}