import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Typography, List, Card, Tag, Divider} from 'antd';
import useHideMenu from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import getLastestTickets from '../helpers/getLastestTickets';

const {Title, Text} = Typography;

const Queue = () => {

    useHideMenu(true);
    const {socket} = useContext(SocketContext);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        socket.on('ticket-assigned', (tickets) => {
            setTickets(tickets);
        });

        return () => {
            socket.off('ticket-assigned')
        }

    }, [socket])

    useEffect(() => {
        getLastestTickets().then(setTickets);
    }, []);

    return (
        <>
            <Title level={1}>Attending the Ticket</Title>
            <Row>
                <Col span={12}>
                    <List
                        dataSource={tickets.slice(0, 3)}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    style={{width: 300, marginTop: 16}}
                                    actions={[
                                        <Tag color="volcano">{item.agent}</Tag>,
                                        <Tag color="magenta">Desk: {item.desk}</Tag>
                                    ]}
                                >
                                    <Title>No. {item.number}</Title>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <Divider> History </Divider>
                    <List
                        align="center"
                        dataSource={tickets.slice(3)}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta 
                                    title={`Ticket No. ${item.number}`}
                                    description={
                                        <>
                                            <Text type="secondary">In the desk: </Text>
                                            <Tag color="magenta">{item.desk}</Tag>
                                            <Text type="secondary">Agent: </Text>
                                            <Tag color="volcano">{item.agent}</Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Queue;