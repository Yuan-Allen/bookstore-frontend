import React from "react";
import {List} from "antd";
import {Book} from "./Book"
import Search from "antd/es/input/Search";
import {history} from "../utils/history";
import {searchBooksByLabel} from "../services/bookService";

export class SearchLabelList extends React.Component {
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
        const label = arr[0].substr(7);
        const callback = (data) => {
            let result = [];
            for (let i = 0; i < data.length; ++i)
                if (data[i].inventory > 0)
                    result.push(data[i]);
            this.setState({books: result});
        }
        searchBooksByLabel(label, callback)
    }

    handleSearch = (query) => {
        history.push("/searchByLabel?label="+query);
    }

    render() {
        return (
            <div>
                <Search placeHolder={"Label..."} onSearch={this.handleSearch} style={{marginTop: 16}} enterButton/>
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