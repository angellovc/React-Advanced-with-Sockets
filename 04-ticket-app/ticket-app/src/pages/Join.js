import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import useHideMenu from '../hooks/useHideMenu';
import getUserStorage from '../helpers/getUserStorage';

const {Title, Text} = Typography;

const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 9,
    },
};

const tailLayout = {
    wrapperCol: {
      offset: 5,
      span: 9,
    },
};

const Join = () => {

    useHideMenu(false);

    const history = useHistory();
    const [user] = useState(getUserStorage());

    const onFinish = ({agent, desk}) => {
        localStorage.setItem('agent', agent);
        localStorage.setItem('desk', desk);

      history.push('/desktop');
    };
      
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    if (user.agent && user.desk) {
        return <Redirect to="/desktop" />
    }
      
    return (
        <>
            <Title level={2}>Join</Title>
            <Text>Type in your name and desk number</Text>
            <Divider />
            <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item
                label="Name agent"
                name="agent"
                rules={[
                    {
                    required: true,
                    message: 'Please input your Name',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
        
                <Form.Item
                label="Desk"
                name="desk"
                rules={[
                    {
                    required: true,
                    message: 'Please input your desk number',
                    },
                ]}
                >
                <InputNumber min={1} max={99} />
                </Form.Item>  
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" shape="round">
                        <SaveOutlined />
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Join
