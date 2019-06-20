import {Tag} from "antd";

const tagMap = new Map();

tagMap.set("boarding_go", <Tag key="boarding_go" color="cyan">走读</Tag>);
tagMap.set("boarding_half", <Tag key="boarding_half" color="blue">半托</Tag>);
tagMap.set("boarding_all", <Tag key="boarding_all" color="geekblue">全托</Tag>);
tagMap.set("traffic_1", <Tag key="traffic_1" color="lime">交通费用</Tag>);


/**
 *   标签组件
 * @param record
 */
function detailTags(record) {
    if ("charge_item" === record.chargeType) {
        return null;
    }
    const tags = [];
    tags.push(tagMap.get("traffic_" + record.traffic), null);
    record.boardingCodes.split(",").forEach(key => {
        const tag = tagMap.get(key);
        if(tag){
            tags.push(tag)
        }
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
            render: (text, record) => detailTags(record)
        },
        {
            title: '描述',
            dataIndex:
                'description',
            key:
                'description',
        }
        ,
    ]
        ;
}