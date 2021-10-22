import {Card, Tag} from "antd";
import Search from "antd/es/input/Search";
import {useState} from "react"
import {searchAuthor} from "../services/bookService";

export const AuthorSearchTable = () => {
    const [author, setAuthor] = useState("");

    const search = (bookName) => {
        const callback = (data) => {
            setAuthor(author=> data);
            console.log(author)
        }
        searchAuthor(bookName, callback);
    }

    return (<Card title={"Author Searching"} style={{marginTop: 24}}>
            <Search placeholder="Book Name..." onSearch={search} style={{ width: 200 }} />
            {author===""?null:<Tag color="red" style={{marginLeft: 24}}>{author}</Tag>}
        </Card>
    )
}