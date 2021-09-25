import React from "react";
import {Table, Button, message} from "antd";
import {PayCircleOutlined} from "@ant-design/icons";
import {getCart, addOrder, deleteCartItem} from "../services/userService";

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
        };
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user == null) {
            message.error("请登录");
        } else {
            this.cartUpdate(user);
        }
    }

    cartUpdate = (user) => {
        const callback = (data) => {
            for (let i = 0; i < data.length; ++i) {
                data[i].key = data[i].itemId;
                data[i].name = data[i].book.name;
                data[i].author = data[i].book.author;
                data[i].bookId = data[i].book.bookId;
                data[i].unitPrice = data[i].book.price;
                data[i].amount = data[i].bookNumber;
                data[i].totalPrice = (data[i].unitPrice * data[i].amount);
            }
            this.setState({
                dataSource: data,
            });
            console.log(data);
        };
        let userId = user.userId;
        getCart(userId, callback);
    }

    onSelectChange = (selectedRowKeys, selectRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, 'selectedRows changed: ', selectRows);
        this.setState({selectedRowKeys: selectedRowKeys, selectRows: selectRows});
    };

    purchase = () => {
        if (this.state.selectedRowKeys.length === 0) {
            message.error("Please select at least one row.");
            return;
        }
        const items = [];
        const user = JSON.parse(sessionStorage.getItem("user"));
        let userId = user.userId;
        let item;
        let selected = [];
        for (item in this.state.selectRows) {
            items[item] = {
                bookId: this.state.selectRows[item].bookId,
                bookNumber: this.state.selectRows[item].bookNumber,
                bookPrice: this.state.selectRows[item].totalPrice,
            }
            //let json = {itemId:this.state.selectRows[item].itemId};
            let json = {
                itemId: this.state.selectRows[item].itemId,
                bookId: this.state.selectRows[item].bookId,
                bookNumber: this.state.selectRows[item].bookNumber
            };
            selected.push(json);
            //deleteCartItem(json);
        }
        const callback = (result) => {
            if (result.status >= 0) {
                let data = {userId: userId, items: items};
                const callback1 = (data) => {
                    if (data.status >= 0) {
                        this.cartUpdate(user);
                        message.success(data.msg);
                    } else {
                        message.error(data.msg);
                    }
                }
                addOrder(data, callback1);
            } else message.error(result.msg);
        }
        deleteCartItem(selected, callback);
    }

    render() {
        const columns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
            },

            {
                title: "Author",
                dataIndex: "author",
                key: "author",
            },

            {
                title: "Unit Price",
                dataIndex: "unitPrice",
                key: "unitPrice",
            },

            {
                title: "Amount",
                dataIndex: "amount",
                key: "amount",
                // render: (text)=> {
                //     return (
                //         <InputNumber min={1} max={100} defaultValue={text}/>
                //     )
                // }

            },

            {
                title: "Total Price",
                dataIndex: "totalPrice",
                key: "totalPrice",
            }
        ]

        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                Table.SELECTION_NONE,
            ]
        }

        return (
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.dataSource}/>
                <Button type="primary" danger size="large" icon={<PayCircleOutlined/>}
                        onClick={this.purchase}>Purchase</Button>
            </div>
        );
    }
}