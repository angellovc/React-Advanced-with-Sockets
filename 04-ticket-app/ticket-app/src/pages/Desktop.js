import React, {useContext, useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import useHideMenu from '../hooks/useHideMenu';
import getUserStorage from '../helpers/getUserStorage';
import { SocketContext } from '../context/SocketContext';

const {Title, Text} = Typography;

const Desktop = () => {

    const [user] = useState(getUserStorage());
    const {socket} = useContext(SocketContext);
    const [ticket, setTicket] = useState(null);
    const history = useHistory();

    useHideMenu(false);

    const exit = () => {
        localStorage.clear();
        history.replace('/join');
    };

    const nextTicket = () => {
        socket.emit('assign-next-ticket', user, (ticket) => {
            if (ticket === null)
                alert("There are not tickets in the queue");
            setTicket(ticket);
        });
    };

    if (!user.agent || !user.desk) {
        return <Redirect to="/join" />
    }

    return (
        <>
            <Row>
                <Col span={16}>
                    <Title level={2}>{user.agent}</Title>
                    <Text>You are working on the Desk: </Text>
                    <Text type="success">{user.desk}</Text>
                </Col>
                <Col span={8} align="right">
                    <Button shape="round" type="danger" onClick={exit}>
                        <CloseCircleOutlined />
                        Exit
                    </Button>
                </Col>
            </Row>
            <Divider/>
            {
                ticket?
                (
                    <Row>
                        <Col span={16}>
                            <Text>You are attending the ticket: </Text>
                            <Text
                                style={{fontSize: 30}}
                                type="danger"
                            >{ticket.number}</Text>
                        </Col>
                        <Col span={8} align="right">
                            <Button
                                onClick={nextTicket}
                                type="primary"
                            >
                                <RightOutlined />
                                Next
                            </Button>
                        </Col>
                    </Row>
                ):
                (
                <>
                    <Row style={{marginBottom: 15}}>
                        <Col span={24} align="center">
                            You don't have any ticket assigned yet
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} align="center">
                            <Button
                                onClick={nextTicket}
                                type="primary"
                                shape="round"
                            >
                                <RightOutlined />
                                Assign Ticket
                            </Button>
                        </Col>
                    </Row>
                </>
                )
            }
        </>
    );
}

export default Desktop
