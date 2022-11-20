import React, {ComponentType, FC} from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {withRouter} from "./utils/functions/functions";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import AppRouter from "./routes";


type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    catchAllUnhandledErrors(e: PromiseRejectionEvent) {
        alert('Some error occurred');
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {

        if (!this.props.initialized) return <Preloader/>

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <AppRouter/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});
const AppContainer = compose<ComponentType>(
    connect(mapStateToProps, {initializeApp}),
    withRouter
)(App);

const MainApp: FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;
