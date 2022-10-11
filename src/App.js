import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Dialogs from "./components/Dialogs/Dialogs";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/dialogs' element={<Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
                        <Route path='/dialogs/:id' element={<Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
                        <Route path='/profile' element={<Profile posts={props.posts}/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
