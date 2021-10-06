import React from "react";
import {Input, List} from "antd";
import {Book} from "./Book"
import {getBooks} from "../services/bookService";

export class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchBooks: [],
        };
    }

    componentDidMount() {
        const callback = (data) => {
            let result = [];
            for (let i = 0; i < data.length; ++i)
                if (data[i].inventory > 0)
                    result.push(data[i]);
            this.setState({books: result, searchBooks: result});
        };
        getBooks({"search": null}, callback);
    }

    handleSearch = (e) => {
        let needle = e.target.value.toLowerCase();
        console.log(needle);
        if (!needle) {
            this.setState({searchBooks: this.state.books});
            return;
        }
        let searchData = this.state.books.filter(function (book) {
            return book.name.toString().toLowerCase().indexOf(needle) > -1;
        });
        console.log(searchData);
        this.setState({searchBooks: searchData});
    }

    render() {
        return (
            <div>
                <Input placeHolder={"Book Name..."} onChange={this.handleSearch} style={{marginTop: 16}}/>
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
                    dataSource={this.state.searchBooks}
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

