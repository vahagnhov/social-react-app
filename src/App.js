import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {withRouter} from "./helpers/functions/functions";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {Navigate} from "react-router-dom";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import ('./components/Profile/ProfileContainer'));
const Login = React.lazy(() => import ('./components/Login/Login'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized) return <Preloader/>

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/' element={<Navigate to='/profile'/> }/>
                        <Route path='/dialogs/:id' element={withSuspense(DialogsContainer)}/>
                        <Route path='/dialogs' element={withSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId' element={withSuspense(ProfileContainer)}/>
                        <Route path='/profile' element={withSuspense(ProfileContainer)}/>
                        <Route path='/users' element={<UsersContainer pageTitle='myTestPageTitle'/>}/>
                        <Route path='/login' element={withSuspense(Login)}/>
                        <Route path='*' element={<div>404 NOT FOUND</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});
const AppContainer = compose(
    connect(mapStateToProps, {initializeApp}),
    withRouter
)(App);

const MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;
