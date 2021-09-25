import React from 'react';
import {Table, Input, Button, Form, message, InputNumber, Image, Drawer} from 'antd';
import {addBook, delBook, editBook, getBooks} from "../services/bookService";
import TextArea from "antd/es/input/TextArea";

export class BookManageTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            preSearchData: [],
            searchText: '',
            editVisible: false,
            addVisible: false,

            bookId: '',
            name: '',
            type: '',
            author: '',
            price: '',
            description: '',
            inventory: '',
            image: '',
            isbn: '',
            imageDisplay: '',    //编辑和添加的Drawer做显示的图片url(不一定等于image,image是实际要传给后台的。)主要用于testImageUrl测试
        };
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user == null) {
            message.error("请登录");
        } else if (user.userType !== 0) {
            message.error("权限不足");
        } else {
            this.updateBooks();
        }
    }

    updateBooks = () => {
        const callback = (data) => {
            this.setState({dataSource: data, preSearchData: data});
            console.log(data);
        };
        getBooks({"search": null}, callback);
    }

    handleSearch = (e) => {
        let needle = e.target.value.toLowerCase();
        console.log(needle);
        if (!needle) {
            this.setState({dataSource: this.state.preSearchData});
            return;
        }
        let searchData = this.state.preSearchData.filter(function (row) {
            return row.name.toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({dataSource: searchData});
    }

    onEditClose = () => {
        this.setState({
            editVisible: false,
        })
    }

    showEditDrawer = (bookId, name, type, author, price, description, inventory, image, isbn) => {
        this.setState({
            editVisible: true,
            imageDisplay: image,

            bookId: bookId,
            name: name,
            type: type,
            author: author,
            price: price,
            description: description,
            inventory: inventory,
            image: image,
            isbn: isbn,
        })
    }

    handleEditSubmit = () => {
        const callback = (data) => {
            if (data.status >= 0)
                message.success(data.msg);
            else message.error(data.msg);
            this.onEditClose();
            this.updateBooks();
        }
        let json = {
            bookId: this.state.bookId,
            name: this.state.name,
            type: this.state.type,
            author: this.state.author,
            price: this.state.price,
            description: this.state.description,
            inventory: this.state.inventory,
            image: this.state.image,
            isbn: this.state.isbn,
        }
        editBook(json, callback);
    }

    showAddDrawer = () => {
        this.setState({
            addVisible: true,
            imageDisplay: '',

            bookId: '',
            name: '',
            type: '',
            author: '',
            price: '',
            description: '',
            inventory: '',
            image: '',
            isbn: '',
        })
    }

    onAddClose = () => {
        this.setState({
            addVisible: false,
        })
    }

    handleAddSubmit = () => {
        const callback = (data) => {
            if (data.status >= 0)
                message.success(data.msg);
            else message.error(data.msg);
            this.onAddClose();
            this.updateBooks();
        }
        let json = {
            name: this.state.name,
            type: this.state.type,
            author: this.state.author,
            price: this.state.price,
            description: this.state.description,
            inventory: this.state.inventory,
            image: this.state.image,
            isbn: this.state.isbn,
        }
        addBook(json, callback);
    }

    handleDelete = () => {
        const callback = (data) => {
            if (data.status >= 0)
                message.success(data.msg);
            else message.error(data.msg);
            this.onEditClose();
            this.updateBooks();
        }
        let json = {
            bookId: this.state.bookId,
        }
        delBook(json, callback);
        console.log(this.state.bookId);
    }

    testImageUrl = () => {
        this.setState({
            imageDisplay: this.state.image,
        })
    }

    render() {
        const columns = [
            {
                title: "Image",
                dataIndex: "image",
                key: "image",
                render: (url) => {
                    return <Image alt={"image"} src={url} width={50}/>
                }
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "type",
            },
            {
                title: "Author",
                dataIndex: "author",
                key: "author",
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
            },
            // {
            //     title: "Description",
            //     dataIndex: "description",
            //     key: "description",
            // },
            {
                title: "inventory",
                dataIndex: "inventory",
                key: "inventory",
            },
            {
                title: "ISBN",
                dataIndex: "isbn",
                key: "isbn",
            },
            {
                title: "Action",
                dataIndex: "Action",
                key: "Action",
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="dashed" onClick={() =>
                                this.showEditDrawer(
                                    record.bookId,
                                    record.name,
                                    record.type,
                                    record.author,
                                    record.price,
                                    record.description,
                                    record.inventory,
                                    record.image,
                                    record.isbn,
                                )}
                            >Edit</Button>
                        </div>
                    )
                },
            },
        ]
        return (
            <div>
                <Button type={"primary"} onClick={this.showAddDrawer} style={{marginBottom: 16,}}>Add Book</Button>
                <Input placeholder={"Book Name"} onChange={this.handleSearch} style={{marginBottom: 16,}}/>
                <Table columns={columns} dataSource={this.state.dataSource}/>
                <Drawer
                    title="Edit Book"
                    placement="right"
                    closable={false}
                    onClose={this.onEditClose}
                    visible={this.state.editVisible}
                    destroyOnClose={true}
                    width={800}
                    footer={
                        <div>
                            <Button type="primary" onClick={this.handleEditSubmit}>Submit</Button>
                            <Button type="dashed" onClick={this.handleDelete} style={{marginLeft: 16,}}>Delete</Button>
                        </div>
                    }
                >
                    <Form>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{required: true, message: 'Please set the book image url',},]}
                            //initialValue={this.state.image}
                        >
                            {this.state.imageDisplay ?
                                <img src={this.state.imageDisplay} alt={"book image"} width={300}/> : null}
                            <Input
                                onChange={(e) => this.setState({image: e.target.value})}
                                defaultValue={this.state.image}
                            />
                            <Button onClick={this.testImageUrl}>test image url</Button>
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: 'Please input the book name',},]}
                            initialValue={this.state.name}
                        >
                            <Input
                                onChange={(e) => this.setState({name: e.target.value})}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{required: true, message: 'Please input the book type',},]}
                            initialValue={this.state.type}
                        >
                            <Input
                                onChange={(e) => this.setState({type: e.target.value})}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Author"
                            name="Author"
                            rules={[{required: true, message: 'Please input the book type',},]}
                            initialValue={this.state.author}
                        >
                            <Input
                                onChange={(e) => this.setState({author: e.target.value})}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{required: true, message: 'Please input the book price',},]}
                            initialValue={this.state.price}
                        >
                            <InputNumber
                                onChange={(value) => this.setState({price: value})}
                                min={0}
                                max={10000}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Inventory"
                            name="inventory"
                            rules={[{required: true, message: 'Please input the book inventory',},]}
                            initialValue={this.state.inventory}
                        >
                            <InputNumber
                                onChange={(value) => this.setState({inventory: value})}
                                min={0}
                                max={10000}
                            />
                        </Form.Item>
                        <Form.Item
                            label="ISBN"
                            name="isbn"
                            rules={[{required: true, message: 'Please input the book isbn',},]}
                            initialValue={this.state.isbn}
                        >
                            <InputNumber
                                onChange={(value) => this.setState({isbn: value})}
                                min={0}
                                max={10000000}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{required: true, message: 'Please input the book description',},
                            ]}
                            initialValue={this.state.description}
                        >
                            <TextArea
                                onChange={(e) => this.setState({description: e.target.value})}
                                autoSize={true}
                            />
                        </Form.Item>
                    </Form>
                </Drawer>
                <Drawer
                    title="Add Book"
                    placement="bottom"
                    closable={false}
                    onClose={this.onAddClose}
                    visible={this.state.addVisible}
                    destroyOnClose={true}
                    height={600}
                    footer={
                        <Button type="primary" onClick={this.handleAddSubmit}>
                            Add
                        </Button>
                    }
                >
                    <Form>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{required: true, message: 'Please set the book image url',},]}
                            //initialValue={this.state.image}
                        >
                            {this.state.imageDisplay ?
                                <img src={this.state.imageDisplay} alt={"book image"} width={300}/> : null}
                            <Input
                                onChange={(e) => this.setState({image: e.target.value})}
                            />
                            <Button onClick={this.testImageUrl}>test image url</Button>
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: 'Please input the book name',},]}
                        >
                            <Input
                                onChange={(e) => this.setState({name: e.target.value})}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{required: true, message: 'Please input the book type',},]}
                        >
                            <Input
                                onChange={(e) => this.setState({type: e.target.value})}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Author"
                            name="Author"
                            rules={[{required: true, message: 'Please input the book type',},]}
                        >
                            <Input
                                onChange={(e) => this.setState({author: e.target.value})}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{required: true, message: 'Please input the book price',},]}
                        >
                            <InputNumber
                                onChange={(value) => this.setState({price: value})}
                                min={0}
                                max={10000}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Inventory"
                            name="inventory"
                            rules={[{required: true, message: 'Please input the book inventory',},]}
                        >
                            <InputNumber
                                onChange={(value) => this.setState({inventory: value})}
                                min={0}
                                max={10000}
                            />
                        </Form.Item>
                        <Form.Item
                            label="ISBN"
                            name="isbn"
                            rules={[{required: true, message: 'Please input the book isbn',},]}
                        >
                            <InputNumber
                                onChange={(value) => this.setState({isbn: value})}
                                min={0}
                                max={10000000}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{required: true, message: 'Please input the book description',},
                            ]}
                        >
                            <TextArea
                                onChange={(e) => this.setState({description: e.target.value})}
                                autoSize={true}
                            />
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        )
    }
}