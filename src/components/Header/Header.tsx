import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/selectors/auth-selectors";
import {logout} from '../../redux/reducers/auth-reducer';
import {Link} from 'react-router-dom';
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';

type MapPropsType = {}

export const Header: FC<MapPropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch<any>(logout());
    }

    const {Header} = Layout;

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
                    </Menu>
                </Col>

                {isAuth
                    ? <> <Col span={1}>
                        <Avatar alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Col>
                        <Col span={5}>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>}
            </Row>
        </Header>
    );
}