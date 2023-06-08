import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import {BrowserRouter, Route, Routes} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Videolist from './components/Videos/Videolist';
import Videoform from './components/Videos/Videoform';
import {Footer} from './components/Footer/Footer'
import {Home} from './components/Home'
import { Navbar } from './components/Navbar/Navbar';
import {ToastContainer} from 'react-toastify'

import 'bootswatch/dist/lux/bootstrap.min.css'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Navbar/>
  <div className="container p-4">
  <Routes>
    <Route path='/' Component={Home} />
    <Route path='/videos' Component={Videolist} />
    <Route path='/new-video' Component={Videoform} />
    <Route path='/update/:id' Component={Videoform} />
  </Routes>
  <ToastContainer />
  <Footer/>
  </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
