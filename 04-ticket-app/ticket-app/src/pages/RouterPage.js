import React, { useContext } from 'react'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import Join from './Join';
import Queue from './Queue';
import Desktop from './Desktop';
import CreateTicket from './CreateTicket';
import { UiContext } from '../context/UiContext';


const { Sider, Content } = Layout;
const RouterPage = () => {

    const {menuStatus} = useContext(UiContext);

    return (
        <Router>
            <Layout style={{height: "100vh"}}>
                <Sider collapsedWidth="0" breakpoint="md" hidden={menuStatus}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/join">
                                Join
                            </Link>    
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/queue">
                                Tikets Queue
                            </Link>    
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to="/create-ticket">
                                Create Ticket
                            </Link>    
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path="/join" component={Join} />
                            <Route path="/queue" component={Queue} />
                            <Route path="/create-ticket" component={CreateTicket} />
                            <Route path="/desktop" component={Desktop} />
                            <Redirect to="/join" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default RouterPage
