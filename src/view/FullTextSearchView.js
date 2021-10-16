import React from 'react';
import {Layout} from 'antd';
import SideBar from "../components/SideBar";
import {HeaderInfo} from "../components/HeaderInfo";
import "../css/home.css"
import {withRouter} from "react-router-dom";
import {SearchBookList} from "../components/SearchBookList";

const {Header, Content, Footer} = Layout;

class FullTextSearchView extends React.Component {

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
                            <SearchBookList/>
                        </div>
                    </Content>
                </Layout>
                <Footer>nothing more</Footer>
            </Layout>
        )
    }
}

export default withRouter(FullTextSearchView);