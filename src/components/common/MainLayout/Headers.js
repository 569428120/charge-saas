import React, {Component} from 'react'
import {Menu, Icon, Row, Col, Layout} from 'antd'
import {Link} from "react-router-dom";
import styles from "./MainLayout.css";

const {Header} = Layout;


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
        return <Row>
            <Col span={4} style={{width: '200px', height: 50}}>
                <h1 style={{opacity: 1, transform: 'translate(0px, 0px)'}}>Ant Design</h1>
            </Col>
            <Col>
                <Header className={styles.header}>
                    <HeaderMenu systems={this.props.headers}
                                selectedKey={this.props.selectedKey}
                                onSelect={this.props.onSelect}/>
                </Header>
            </Col>
        </Row>


    }
}

export default Headers
