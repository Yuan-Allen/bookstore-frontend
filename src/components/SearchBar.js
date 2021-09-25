import React from "react";
import {Input} from "antd";

const {Search} = Input;

export class SearchBar extends React.Component {

    handleSearch = value => console.log(value);

    render() {
        return (
            <Search
                placeholder="input search text"
                onSearch={this.handleSearch}
                enterButton
                allowClear
                size="large"
            />
        )
    }
}