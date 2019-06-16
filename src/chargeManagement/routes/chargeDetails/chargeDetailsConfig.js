import {Tag} from "antd";

const tagMap = new Map();

tagMap.set("boarding_go", <Tag color="cyan">走读</Tag>);
tagMap.set("boarding_half", <Tag color="blue">半托</Tag>);
tagMap.set("boarding_all", <Tag color="geekblue">全托</Tag>);
tagMap.set("traffic_0", <Tag color="gold">无需乘车</Tag>);
tagMap.set("traffic_1", <Tag color="lime">需乘车</Tag>);


/**
 *   标签组件
 * @param record
 * @constructor
 */
function DetailTags({record}) {
    if ("charge_item" === record.chargeType) {
        return <span/>;
    }
    const tags = [];
    tags.push(tagMap.get("traffic_" + record.traffic), null);
    record.boardingCodes.split(",").forEach(key => {
        tags.push(tagMap.get(key, null))
    });
    return tags
}

/**
 * 参数设置
 * @returns {Array}
 */
export function chargeTableColumns() {
    return [
        {
            title: '收费项名称',
            dataIndex: 'name',
            key: 'name',
            width: 300,
        },
        {
            title: '金额(元)',
            dataIndex: 'amount',
            key: 'amount',
            width: 100,
        },
        {
            title: '其他',
            dataIndex: 'id',
            key: 'id',
            width: 250,
            render: (text, record) => <DetailTags record={record}/>
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
    ];
}