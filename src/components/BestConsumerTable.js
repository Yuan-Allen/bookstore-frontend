import React from 'react';
import {Table, message, DatePicker} from 'antd';
import {getAllOrders} from "../services/userService";

const {RangePicker} = DatePicker;

export class BestConsumerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            data: [],
        };
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user == null) {
            message.error("请登录");
        } else if (user.userType !== 0) {
            message.error("权限不足");
        } else {
            const callback = (data) => {
                this.setState({orders: data});
                console.log(data);
                let Id = [];
                let number = new Map();
                let consumption = new Map();
                let result = [];
                for (let i = 0; i < this.state.orders.length; ++i) {
                    for (let j = 0; j < this.state.orders[i].items.length; ++j) {
                        let userId = this.state.orders[i].userId;
                        console.log(this.state.orders[i]);
                        let item = this.state.orders[i].items[j];
                        if (!number.has(userId)) {
                            number.set(userId, item.bookNumber);
                            Id.push(userId)
                        } else number.set(userId, number.get(userId) + item.bookNumber);
                        if (!consumption.has(userId))
                            consumption.set(userId, item.bookPrice);
                        else consumption.set(userId, consumption.get(userId) + item.bookPrice);
                    }
                }
                for (let i = 0; i < Id.length; ++i) {
                    let tmp = {userId: Id[i], number: number.get(Id[i]), consumption: consumption.get(Id[i])}
                    result.push(tmp);
                }
                this.setState({data: result});
            };
            getAllOrders({"search": null}, callback);
        }
    }

    onRangeChange = (dates, dateStrings) => {
        let flag = true;
        if (dateStrings[0].length === 0 || dateStrings[1].length === 0)
            flag = false;
        const start = new Date(Date.parse(dateStrings[0]));
        const end = new Date(Date.parse(dateStrings[1]));
        const callback = (data) => {
            this.setState({orders: data});
            console.log(data);
            let Id = [];
            let number = new Map();
            let consumption = new Map();
            let result = [];
            for (let i = 0; i < this.state.orders.length; ++i) {
                let date = new Date(Date.parse(this.state.orders[i].time))
                if (flag && (date < start || date > end))
                    continue;
                for (let j = 0; j < this.state.orders[i].items.length; ++j) {
                    let userId = this.state.orders[i].userId;
                    let item = this.state.orders[i].items[j];
                    if (!number.has(userId)) {
                        number.set(userId, item.bookNumber);
                        Id.push(userId)
                    } else number.set(userId, number.get(userId) + item.bookNumber);
                    if (!consumption.has(userId))
                        consumption.set(userId, item.bookPrice);
                    else consumption.set(userId, consumption.get(userId) + item.bookPrice);
                }
            }
            for (let i = 0; i < Id.length; ++i) {
                let tmp = {userId: Id[i], number: number.get(Id[i]), consumption: consumption.get(Id[i])}
                result.push(tmp);
            }
            this.setState({data: result});
        };
        getAllOrders({"search": null}, callback);
    }


    render() {
        const columns = [
            {
                title: "User Id",
                dataIndex: "userId",
                key: "userId",
            },
            {
                title: "Number",
                dataIndex: "number",
                key: "number",
                sorter: (a, b) => a.number - b.number,
            },
            {
                title: "Consumption",
                dataIndex: "consumption",
                key: "consumption",
                sorter: (a, b) => a.consumption - b.consumption,
                defaultSortOrder: "descend",
            },
        ]
        return (
            <div>
                <RangePicker showTime onChange={this.onRangeChange}/>
                <Table columns={columns} dataSource={this.state.data}/>
            </div>
        )
    }
}