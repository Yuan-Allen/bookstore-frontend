import React from "react";
import {List} from "antd";
import {Book} from "./Book"
import {fullTextSearch} from "../services/bookService";
import Search from "antd/es/input/Search";
import {history} from "../utils/history";

export class SearchBookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
    }

    componentDidMount() {
        const search = window.location.search;
        if(search==="") {
            return;
        }
        const arr = search.split('&');
        const queryString = arr[0].substr(7);
        const callback = (data) => {
            let result = [];
            for (let i = 0; i < data.length; ++i)
                if (data[i].inventory > 0)
                    result.push(data[i]);
            this.setState({books: result});
        }
        fullTextSearch(queryString, callback);
    }

    handleSearch = (query) => {
        history.push("/fullTextSearch?query="+query);
    }

    render() {
        return (
            <div>
                <Search placeHolder={"Query..."} onSearch={this.handleSearch} style={{marginTop: 16}} enterButton/>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 5,
                    }}
                    dataSource={this.state.books}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 16,
                    }}

                    renderItem={item => (
                        <List.Item>
                            <Book info={item}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}