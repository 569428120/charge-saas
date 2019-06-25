
import tagMap from "../../utils/TagConfig"


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
    if (tag) {
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
