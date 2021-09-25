import React from 'react';
import {Table, message, DatePicker, Statistic, Card, Row, Col} from 'antd';
import {getOrders} from "../services/userService";

const {RangePicker} = DatePicker;

export class UserStatisticsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            data: [],
            totalBook: 0,
            expenditure: 0,
        };
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user == null) {
            message.error("请登录");
        } else {
            const callback = (data) => {
                this.setState({orders: data});
                let Id = [];
                let bookName = new Map();
                let number = new Map();
                let result = [];
                let totalBook = 0;
                let expenditure = 0;
                for (let i = 0; i < this.state.orders.length; ++i) {
                    for (let j = 0; j < this.state.orders[i].items.length; ++j) {
                        let item = this.state.orders[i].items[j];
                        if (!bookName.has(item.book.bookId)) {
                            bookName.set(item.book.bookId, item.book.name);
                            Id.push(item.book.bookId);
                        }
                        if (!number.has(item.book.bookId))
                            number.set(item.book.bookId, item.bookNumber);
                        else number.set(item.book.bookId, number.get(item.book.bookId) + item.bookNumber);
                        totalBook += item.bookNumber;
                        expenditure += item.bookPrice;
                    }
                }
                for (let i = 0; i < Id.length; ++i) {
                    let tmp = {name: bookName.get(Id[i]), number: number.get(Id[i])}
                    result.push(tmp);
                }
                this.setState({data: result, totalBook: totalBook, expenditure: expenditure});
            };
            getOrders(user.userId, callback);
        }
    }

    onRangeChange = (dates, dateStrings) => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let flag = true;
        if (dateStrings[0].length === 0 || dateStrings[1].length === 0)
            flag = false;
        const start = new Date(Date.parse(dateStrings[0]));
        const end = new Date(Date.parse(dateStrings[1]));
        const callback = (data) => {
            this.setState({orders: data});
            let Id = [];
            let bookName = new Map();
            let number = new Map();
            let result = [];
            let totalBook = 0;
            let expenditure = 0;
            for (let i = 0; i < this.state.orders.length; ++i) {
                let date = new Date(Date.parse(this.state.orders[i].time))
                if (flag && (date < start || date > end))
                    continue;
                for (let j = 0; j < this.state.orders[i].items.length; ++j) {
                    let item = this.state.orders[i].items[j];
                    if (!bookName.has(item.book.bookId)) {
                        bookName.set(item.book.bookId, item.book.name);
                        Id.push(item.book.bookId);
                    }
                    if (!number.has(item.book.bookId))
                        number.set(item.book.bookId, item.bookNumber);
                    else number.set(item.book.bookId, number.get(item.book.bookId) + item.bookNumber);
                    totalBook += item.bookNumber;
                    expenditure += item.bookPrice;
                }
            }
            for (let i = 0; i < Id.length; ++i) {
                let tmp = {name: bookName.get(Id[i]), number: number.get(Id[i])}
                result.push(tmp);
            }
            this.setState({data: result, totalBook: totalBook, expenditure: expenditure});
        };
        getOrders(user.userId, callback);
    }


    render() {
        const columns = [
            {
                title: "Book Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Number",
                dataIndex: "number",
                key: "number",
                sorter: (a, b) => a.number - b.number,
                defaultSortOrder: "descend",
            },
        ]
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Statistic title="Total Book" value={this.state.totalBook}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic title="Expenditure (CNY)" value={this.state.expenditure} precision={2}/>
                        </Card>
                    </Col>
                </Row>
                <RangePicker showTime onChange={this.onRangeChange} style={{marginBottom: 16, marginTop: 16}}/>
                <Table columns={columns} dataSource={this.state.data}/>
            </div>
        )
    }
}