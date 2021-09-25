import React from 'react';
import {Layout} from 'antd';
import {OrderList} from "../components/OrderList";
import "../css/home.css"
import {HeaderInfo} from "../components/HeaderInfo";
import {withRouter} from "react-router-dom";
import ManageSideBar from "../components/ManageSideBar";

const {Header, Content, Footer} = Layout;

class OrderManageView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <HeaderInfo/>
                </Header>
                <Layout>
                    <ManageSideBar/>
                    <Content style={{padding: '16px 50px'}}>
                        <div className="home-content">
                            <OrderList manage={true}/>
                        </div>
                    </Content>
                </Layout>
                <Footer>nothing more</Footer>
            </Layout>
        )
    }
}

export default withRouter(OrderManageView);