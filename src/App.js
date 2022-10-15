import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Dialogs from "./components/Dialogs/Dialogs";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route, Routes} from "react-router-dom";

const App = (props) => {
    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar state={props.state.sidebar}/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/dialogs' element={<Dialogs state={props.state.dialogsPage} dispatch={props.dispatch}/>}/>
                        <Route path='/dialogs/:id' element={<Dialogs state={props.state.dialogsPage} dispatch={props.dispatch}/>}/>
                        <Route path='/profile' element={<Profile state={props.state.profilePage} dispatch={props.dispatch}/>}/>
                    </Routes>
                </div>
            </div>
    );
}

export default App;
