import React from "react";
import {HeaderInfo} from "../components/HeaderInfo";
import {Layout} from "antd";
import SideBar from "../components/SideBar";
import {ChatWindow} from "../components/ChatWindow";

const {Header, Content, Footer} = Layout;

const ChatView = () => {
    return (
        <Layout>
            <Header className="header">
                <HeaderInfo/>
            </Header>
            <Layout>
                <SideBar/>
                <Content style={{padding: '16px 50px'}}>
                    <div className="home-content">
                        <ChatWindow/>
                    </div>
                </Content>
            </Layout>
            <Footer>nothing more</Footer>
        </Layout>
    )
}

export default ChatView;