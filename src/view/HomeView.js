import React from 'react';
import {Layout} from 'antd';
import SideBar from "../components/SideBar";
import {BookList} from "../components/BookList";
import {HeaderInfo} from "../components/HeaderInfo";
import {BookCarousel} from "../components/BookCarousel";
import "../css/home.css"
import {withRouter} from "react-router-dom";

const {Header, Content, Footer} = Layout;

class HomeView extends React.Component {

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
                            <BookCarousel/>
                            <BookList/>
                        </div>
                    </Content>
                </Layout>
                <Footer>nothing more</Footer>
            </Layout>
        )
    }
}

export default withRouter(HomeView);
