import React, {ComponentType, FC} from "react";
import 'antd/dist/reset.css';
import './App.css';
import {BrowserRouter, Link} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {withRouter} from "./utils/functions/functions";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import AppRouter from "./routes";
import {Header} from "./components/Header/Header";
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

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

        return (<Layout>
                <Header/>
                <NavbarContainer/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Developers</Breadcrumb.Item>
                        <Breadcrumb.Item>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline" style={{height: '100%'}}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                                    <Menu.Item key="2"> <Link to="/dialogs">Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="3"><Link to="/developers">Developers</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <AppRouter/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>©2023 Created by Vahagn</Footer>
            </Layout>
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
