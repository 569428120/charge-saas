import {Tag} from "antd";

const tagMap = new Map();

tagMap.set("boarding_go", <Tag key="boarding_go" color="cyan">走读</Tag>);
tagMap.set("boarding_half", <Tag key="boarding_half" color="blue">半托</Tag>);
tagMap.set("boarding_all", <Tag key="boarding_all" color="geekblue">全托</Tag>);
tagMap.set("traffic_1", <Tag key="traffic_1" color="lime">交通费用</Tag>);

tagMap.set("ride_true", <Tag key="ride_1" color="lime">需乘车</Tag>);

// 状态
tagMap.set("Unpaid", <Tag key="Unpaid" color="blue">未缴费</Tag>);
tagMap.set("PartPaid", <Tag key="PartPaid" color="volcano">部分缴费</Tag>);
tagMap.set("AllPaid", <Tag key="AllPaid" color="green">已缴费</Tag>);

tagMap.set("Unnotice", <Tag key="Unnotice" color="blue">未通知</Tag>);
tagMap.set("WaitNotice", <Tag key="WaitNotice" color="geekblue">等待通知</Tag>);
tagMap.set("ErrorNotice", <Tag key="ErrorNotice" color="red">通知出错</Tag>);
tagMap.set("AllNotice", <Tag key="AllNotice" color="green">已通知</Tag>);


export default tagMap;
