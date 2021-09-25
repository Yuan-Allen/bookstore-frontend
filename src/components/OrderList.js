import React from "react";
import {List, message, Input, DatePicker, Button} from "antd";
import {getAllOrders, getOrders, delOrder} from "../services/userService";
import {OrderDetail} from "./OrderDetail";

const {RangePicker} = DatePicker;

export class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            showOrders: [],
            searchOrders: [],
            searchFlag: false,
            searchValue: '',
            manage: this.props.manage,
        };
    }

    componentDidMount() {
        this.updateOrderInfo();
    }

    updateOrderInfo = () => {
        const callback = (data) => {
            console.log(data)
            let tmpOrders = [];
            for (let i = 0; i < data.length; ++i) {
                tmpOrders.push(data[i]);
            }
            //console.log(tmpOrders);
            tmpOrders.reverse();
            //console.log(tmpOrders);
            this.setState({orders: tmpOrders, showOrders: tmpOrders});
            //console.log(this.state.showOrders);
        }
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user == null) {
            message.error("请登录");
        } else if (this.state.manage) {
            if (user.userType !== 0)
                message.error("权限不足")
            else getAllOrders({search: null}, callback);
        } else {
            let userId = user.userId
            getOrders(userId, callback);
        }
    }

    onRangeChange = (dates, dateStrings) => {
        let flag = true;
        if (dateStrings[0].length === 0 || dateStrings[1].length === 0)
            flag = false;
        const start = new Date(Date.parse(dateStrings[0]));
        const end = new Date(Date.parse(dateStrings[1]));
        let result = [];
        let data = this.state.searchFlag ? this.state.searchOrders : this.state.orders;
        for (let i = 0; i < data.length; ++i) {
            let date = new Date(Date.parse(data[i].time))
            if (flag && (date < start || date > end))
                continue;
            result.push(data[i]);
        }

        this.setState({showOrders: result});
    }

    handleSearch = (e) => {
        let needle = e.target.value.toLowerCase();
        console.log(needle);
        if (!needle) {
            this.setState({showOrders: this.state.orders, searchFlag: false, searchOrders: []});
            return;
        }
        let searchData = this.state.orders.filter(function (order) {
            for (let i = 0; i < order.items.length; ++i)
                if (order.items[i].name.toString().toLowerCase().indexOf(needle) > -1)
                    return true;
        });
        this.setState({showOrders: searchData, searchFlag: true, searchOrders: searchData});
    }

    handleDelete = (orderId) => {
        console.log(orderId);
        const callback = (data) => {
            if (data.status >= 0) {
                this.updateOrderInfo();
                message.success(data.msg);
            } else message.error(data.msg);
        }
        let json = {orderId: orderId};
        delOrder(json, callback);
    }

    render() {
        return (
            <div>
                <RangePicker onChange={this.onRangeChange}/>
                <Input placeholder={"book name..."} onChange={this.handleSearch}
                       style={{marginBottom: 16, marginTop: 16}}/>
                <List
                    dataSource={this.state.showOrders}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                description={'time:' + item.time}
                            />
                            <Button onClick={() => this.handleDelete(item.orderId)}>Delete</Button>
                            <OrderDetail info={item.items}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}