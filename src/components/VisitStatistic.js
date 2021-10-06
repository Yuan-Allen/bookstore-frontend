import {useEffect, useState} from "react";
import {Card, Statistic} from "antd";
import {RocketOutlined} from '@ant-design/icons';
import {getVisits} from "../services/userService";

export const VisitStatistic = () => {
    const [visits, setVisits] = useState(0);

    useEffect(()=>{
        getVisits({}, (data)=>{setVisits(visits=>data)});
    }, [])

    return (
        <Card style={{marginTop: 32}}>
            <Statistic title="Visits" value={visits} prefix={<RocketOutlined />}/>
        </Card>
    )
}