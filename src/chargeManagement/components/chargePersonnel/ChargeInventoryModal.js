import React, {Component} from "react";
import {List, Modal, Checkbox, Row, Col, Card, Button} from "antd";
import ReactToPrint from 'react-to-print'

/**
 * @param item
 * @param isCheck
 * @returns {null}
 * @constructor
 */
function ListItem({item, isCheck}) {
    if (isCheck) {
        return <List.Item><Checkbox
            value={item.id}><span>{item.name}&#12288;&#12288;&#12288;&#12288;{item.number}元</span></Checkbox></List.Item>
    }
    return <List.Item><span>{item.name}</span></List.Item>
}

/**
 *   个人收费清单
 */
class ChargeInventoryModal extends Component {

    render() {
        const data = [
            {
                id: '1',
                name: '学杂费',
                sumMoney: 500,
                number: 50,
                type: 0,
                startTime: '2019-4-5',
                endTime: '2019-5-1',
                desc: '西湖区湖底公园1号',
            },
            {
                id: '2',
                name: '书本费',
                sumMoney: 500,
                number: 50,
                type: 1,
                startTime: '2019-4-5',
                endTime: '2019-5-1',
                desc: '西湖区湖底公园1号'
            },
            {
                id: '3',
                name: '书本费1',
                sumMoney: 500,
                number: 50,
                type: 1,
                startTime: '2019-4-5',
                endTime: '2019-5-1',
                desc: '西湖区湖底公园1号'
            }

        ];

        const data1 = [
            <span>书本费 50元   成绩优秀，书本费给出一定优惠</span>,
        ];

        return <Modal
            title="收费清单"
            width={700}
            visible={this.props.visible}
            onOk={this.props.onOk}
            onCancel={this.props.onCancel}
        >
            <Checkbox.Group style={{width: '100%'}} defaultValue={['1', '2', '3']} onChange={(value) => {
                console.log(value)
            }}>
                <List
                    size="small"
                    header={<div>收费项（合计：500元）</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => <ListItem item={item} isCheck={this.props.isCheck}/>}
                />
            </Checkbox.Group>

            <List
                style={{marginTop: 10}}
                size="small"
                header={<div>减免（合计：500元）</div>}
                bordered
                dataSource={data1}
                renderItem={item => {
                    return <List.Item>{item}</List.Item>
                }}
            />
            <div style={{marginTop: 10, marginLeft: 20}}>
                <span>应收合计：300元</span>
            </div>

            <Row style={{textAlign: "center", marginTop: 10}}>
                <Col span={12}>
                    <Card style={{width: 200}}>
                        <img style={{width: 190, height: 150, marginLeft: '-23px'}}
                             src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558945846257&di=08cea36d95c750bbd69cb4b8a349728d&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150822%2FImg419472540.jpg"
                             alt='example'/>
                        <span>
                                 微信支付
                             </span>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{width: 200}}>
                        <img style={{width: 190, height: 150, marginLeft: '-23px'}}
                             src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558945846257&di=08cea36d95c750bbd69cb4b8a349728d&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150822%2FImg419472540.jpg"
                             alt='example'/>
                        <span>
                                 支付宝支付
                             </span>
                    </Card>
                </Col>
            </Row>
        </Modal>;
    }
}

export default ChargeInventoryModal;