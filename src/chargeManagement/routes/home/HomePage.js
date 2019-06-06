import React from "react";
import {connect} from "dva";
import {Card, Col, Row} from "antd";
import styles from './HomePage.less'
import ChargePie from "../../components/echarts/ChargePie";
import ReactEcharts from "echarts-for-react";


const option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
};

const option1 = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
        }
    ]
};


const option3 = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};


/**
 *   首页
 */
class HomePage extends React.Component {
    render() {

        return <div className={styles.context}>
            <Row className={styles.row}>
                <Col span={10} className={styles.col}>
                    <Card>
                        总收费(1000元)
                        <ReactEcharts option={option} style={{height: 200, width: '100%'}}/>
                    </Card>
                </Col>
                <Col span={14} className={styles.col}>
                    <Card>
                        年度|季度收费情况
                        <ReactEcharts option={option1} style={{height: 200, width: '100%'}}/>
                    </Card>

                </Col>
            </Row>
            <Row className={styles.row} style={{height: '80%'}}>
                <Card>
                    项目收费情况
                    <ReactEcharts option={option3} style={{height: 220, width: '100%'}}/>
                </Card>
            </Row>
        </div>;
    }
}


function mapStateToProps(state) {
    // 得到modal中的state)
    const homePage = state.homePage;
    return {...homePage}
}

export default connect(mapStateToProps)(HomePage)