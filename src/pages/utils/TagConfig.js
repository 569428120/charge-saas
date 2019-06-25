import {Tag} from "antd";

const tagMap = new Map();

tagMap.set("boarding_go", <Tag key="boarding_go" color="cyan">走读</Tag>);
tagMap.set("boarding_half", <Tag key="boarding_half" color="blue">半托</Tag>);
tagMap.set("boarding_all", <Tag key="boarding_all" color="geekblue">全托</Tag>);
tagMap.set("traffic_1", <Tag key="traffic_1" color="lime">交通费用</Tag>);

tagMap.set("ride_true", <Tag key="ride_1" color="lime">需乘车</Tag>);

export default tagMap;
