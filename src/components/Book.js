import React from "react";
import {Card} from "antd";
import {List} from "antd";
import {Link} from "react-router-dom"

const {Meta} = Card;

export class Book extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {info} = this.props;

        return (
            <Link to={{
                pathname: '/bookDetails',
                search: '?id=' + info.bookId
            }}
            >
                <List.Item>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt={info.title} src={info.image}/>}
                    >
                        <Meta title={info.name} description={'¥' + info.price}/>
                    </Card>
                </List.Item>
            </Link>
        )
    }
}
