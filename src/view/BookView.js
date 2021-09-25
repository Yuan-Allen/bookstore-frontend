import React from 'react';
import {Layout} from 'antd';
import SideBar from "../components/SideBar";
import "../css/home.css"
import "../css/bookDetail.css"
import {BookDetail} from "../components/BookDetail";
import {HeaderInfo} from "../components/HeaderInfo";
import {getBook} from "../services/bookService";
import {withRouter} from "react-router-dom";

const {Header, Content, Footer} = Layout;

class BookView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {books: null};
    }

    componentDidMount() {
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        getBook(bookId, (data) => {
            this.setState({bookInfo: data})
        })
    }

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
                            <BookDetail info={this.state.bookInfo}/>
                        </div>
                    </Content>
                </Layout>
                <Footer>nothing more</Footer>
            </Layout>
        )
    }
}

export default withRouter(BookView);