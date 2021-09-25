import React from 'react';
import {Layout} from 'antd';
import SideBar from "../components/SideBar";
import {Cart} from "../components/Cart";
import "../css/home.css"
import {HeaderInfo} from "../components/HeaderInfo";
import {withRouter} from "react-router-dom";

const {Header, Content, Footer} = Layout;

class CartView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <HeaderInfo/>
                </Header>
                <Layout>
                    <SideBar/>
                    <Content style={{padding: '16px 50px'}}>
                        <div className="home-content">
                            <Cart/>
                        </div>
                    </Content>
                </Layout>
                <Footer>nothing more</Footer>
            </Layout>
        )
    }
}

export default withRouter(CartView);