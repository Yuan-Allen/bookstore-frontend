import {useEffect, useRef, useState} from "react";
import {Badge, Card, Input, List, message} from "antd";
import "../css/chatWindow.css"

export const ChatWindow = () => {
    const socket = useRef(null);
    const [chatMessage, setChatMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
            let user = JSON.parse(sessionStorage.getItem('user'))
            if (user === null) {
                message.error("请登录");
            } else if (!socket.current) {
                socket.current = new WebSocket("ws://localhost:8080/chat");
                console.log("new socket");
                socket.current.onmessage = onMessage
                socket.current.onopen = () => {
                    sendJoin()
                }
            }

            console.log(socket);
            return () => {
                if (socket.current) {
                    socket.current.close();
                    console.log("close socket")
                }
            }
        }, []
    )

    const sendJoin = () => {
        console.log("send join");
        let user = JSON.parse(sessionStorage.getItem('user'))
        let joinMessage = {
            name: user.username,
            type: "join",
        }
        socket.current.send(JSON.stringify(joinMessage));
    }

    const onMessage = (evt) => {
        let line = "";
        /* Parse the message into a JavaScript object */
        let msg = JSON.parse(evt.data);
        if (msg.type === "chat") {
            setReceivedMessages((receivedMessages) => [...receivedMessages, {
                type: "chat",
                name: msg.name,
                message: msg.message
            }]);
        } else if (msg.type === "info") {
            line = "[ -- " + msg.info + " -- ]\n";
            setReceivedMessages((receivedMessages) => [...receivedMessages, {type: "info", info: line}]);
        } else if (msg.type === "users") {
            setUsers(users => {
                return msg.userlist
            })
            console.log("userlist:")
            console.log(msg.userlist);
            console.log(users)
        }
    }

    const sendMessage = () => {
        if (chatMessage.length === 0)
            return;
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user === null) {
            message.error("请登录");
            return;
        }
        let jsonMessage = {
            name: user.username,
            target: "",
            message: chatMessage,
            type: "chat",
        }
        jsonMessage = JSON.stringify(jsonMessage);
        console.log(jsonMessage);
        socket.current.send(jsonMessage);
        setChatMessage("");
    }

    return (
        <div className={"chatWindow"}>
            <List
                className={"messages"}
                bordered={true}
                dataSource={receivedMessages}
                renderItem={item => item.type === "chat" ? (
                    <List.Item>
                        <Badge.Ribbon text={item.name}
                                      color={item.name === JSON.parse(sessionStorage.getItem("user")).username ? "green" : "blue"}>
                            <Card size={"small"}
                                  bodyStyle={{marginLeft: 20, marginRight: 60}}
                                  style={{marginLeft: 20}}
                                  hoverable={true}
                            >
                                {item.message}
                            </Card>
                        </Badge.Ribbon>
                    </List.Item>
                ) : (
                    <List.Item>
                        <Card size={"small"}
                              bodyStyle={{marginLeft: 20, marginRight: 60}}
                              style={{marginLeft: 20}}
                              hoverable={true}
                        >
                            {item.info}
                        </Card>
                    </List.Item>
                )
                }
            />
            <List
                className={"userLists"}
                bordered={true}
                dataSource={users}
                renderItem={(item) => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />
            <Input className={"chatInput"} value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}
                   onPressEnter={sendMessage}/>
        </div>
    )
}