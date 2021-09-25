import React from "react";
import {Table} from "antd";

export class OrderDetail extends React.Component {
    render() {
        const {info} = this.props;

        if (info == null) {
            return null;
        }

        for (let i = 0; i < info.length; ++i) {
            info[i].name = info[i].book.name;
            info[i].author = info[i].book.author;
            info[i].unitPrice = info[i].bookPrice;
            info[i].amount = info[i].bookNumber;
            info[i].totalPrice = (info[i].unitPrice * info[i].amount);
        }

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
            },

            {
                title: "Total Price",
                dataIndex: "totalPrice",
                key: "totalPrice",
            }
        ]

        return (
            <div>
                <Table columns={columns} dataSource={info}/>
            </div>
        )
    }
}