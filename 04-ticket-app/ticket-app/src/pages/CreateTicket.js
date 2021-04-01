import React, { useContext, useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import useHideMenu from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';

const {Title, Text} = Typography;

const CreateTicket = () => {

    useHideMenu(true);

    const { socket } = useContext(SocketContext);
    const [lastTicket, setLastTicket] = useState(null);

    const newTicket = () => {
        socket.emit('request-ticket', null, (ticket) => {
            setLastTicket(ticket);
        });
    };

    return (
        <>
            <Row>
                <Col span={14} offset={6} align="center">
                    <Title title={3}>Press to add a new Ticket</Title>
                    <Button 
                        type="primary"
                        shape="round"
                        icon={<DownloadOutlined />}
                        size="large"
                        onClick={newTicket}
                    >
                        New Ticket
                    </Button>
                </Col>
            </Row>
            {
                lastTicket && (
                        <Row style={{marginTop: 100}}>
                            <Col span={14} offset={6} align="center">
                                <Text level={2}>
                                    Your number
                                </Text>
                                <br />
                                <Text type="success" style={{fontSize: 55}}>
                                    {lastTicket.number}
                                </Text>
                            </Col>
                        </Row>
                )
            }
        </>
    );
}

export default CreateTicket
