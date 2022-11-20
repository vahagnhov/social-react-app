import React, {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {withSuspense} from "../hoc/withSuspense";
import UsersContainer from "../components/Users/UsersContainer";
import PageNotFound from "../errors/PageNotFound";

const DialogsContainer = React.lazy(() => import('../components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import ('../components/Profile/ProfileContainer'));
const Login = React.lazy(() => import ('../components/Login/Login'));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedLogin = withSuspense(Login);
const UsersContainerComponent = () => <UsersContainer pageTitle='TotalUsersCount'/>;
const HomePage = () => <Navigate to='/profile'/>;
const NotFoundErrorPage = () => <PageNotFound/>;

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/dialogs/:id',
        component: SuspendedDialogs
    },
    {
        path: '/dialogs',
        component: SuspendedDialogs
    },
    {
        path: '/profile/:userId',
        component: SuspendedProfile
    },
    {
        path: '/profile',
        component: SuspendedProfile
    },
    {
        path: '/users',
        component: UsersContainerComponent
    },
    {
        path: '/login',
        component: SuspendedLogin
    },
    {
        path: '*',
        component: NotFoundErrorPage
    }
];

export const AppRouter: FC = () => {

    const Routers = routes.map(({path, component: Component}) => (
        <Route key={path} path={path} element={<Component/>}/>
    ));

    return (
        <Routes>
            {Routers}
        </Routes>
    );
};

export default AppRouter;