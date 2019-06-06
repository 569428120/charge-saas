import React, {Component} from 'react'
import {Menu, Icon, Row, Col, Layout, Avatar, Popover} from 'antd'
import {Link} from "react-router-dom";
import styles from "./MainLayout.css";

const {Header} = Layout;


const text = <span>Title</span>;
const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);

/**
 *   动态构建导航
 * @constructor
 */
function HeaderMenu({systems, selectedKey, onSelect}) {

    if (!systems || systems.length <= 0) {
        return <div/>;
    }

    return <Menu
        className={styles.menu}
        theme="dark"
        mode="horizontal"
        onSelect={onSelect}
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[selectedKey]}
    >
        {
            systems.map(item => {
                return <Menu.Item key={item.id}>
                    <Icon type={item.icon}/>{item.name}
                </Menu.Item>
            })
        }
    </Menu>
}


class Headers extends Component {

    render() {
        return <Row style={{backgroundColor: '#001529'}}>
            <Col span={4} style={{width: '200px', height: 50}}>
                <h1 style={{
                    opacity: 1,
                    transform: 'translate(0px, 0px)',
                    color: "#fff",
                    marginTop: 13,
                    marginLeft: "13%"
                }}>校园智慧办公平台</h1>
            </Col>
            <Col span={18}>
                <Header className={styles.header}>
                    <HeaderMenu systems={this.props.headers}
                                selectedKey={this.props.selectedKey}
                                onSelect={this.props.onSelect}/>
                </Header>
            </Col>
            <Col span={2} style={{textAlign: "right"}}>
                <Popover placement="bottomRight" title={text} content={content} trigger="click">
                    <Avatar size={50} icon="user" style={{marginRight: -62}}/>
                </Popover>

            </Col>
        </Row>


    }
}

export default Headers
