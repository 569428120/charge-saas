import React, {Component} from "react";
import {Icon, Layout, Menu} from "antd";
import styles from '../../../app.less'

const {SubMenu} = Menu;
const {Sider} = Layout;


/**
 *   菜单导航
 * @constructor
 */
function Menus({menus, openKeys, selectedKey, onOpenChange, onSelect}) {
    if (!menus || menus.length === 0) {
        return <div/>
    }
    return <Menu
        className={styles.menu}
        mode="inline"
        theme="dark"
        style={{height: '100%'}}
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        defaultSelectedKeys={[selectedKey]}
        defaultOpenKeys={openKeys}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
    >
        <Menu.Item key="/home">
            <Icon type="home"/>
            <span>首页</span>
        </Menu.Item>
        {
            menus.map(item => {
                // 菜单目录
                return <SubMenu
                    key={item.id}
                    title={
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.name}</span>
                        </span>
                    }
                >
                    {
                        item.menus.map(sub => {
                            return <Menu.Item key={sub.path}>
                                <Icon type={sub.icon}/>{sub.name}
                            </Menu.Item>
                        })
                    }
                </SubMenu>
            })
        }

    </Menu>
}


class MenuLayout extends Component {

    /**
     *   菜单栏点击事件
     */
    onMenusSelect = ({item, key, keyPath, selectedKeys}) => {
        this.props.onSelect(key);
    };

    /**
     *
     */
    onMenusOpenChange = (openKeys) => {
        this.props.onOpenChange(openKeys);
    };

    render() {
        return <Sider width={200} style={{backgroundColor: '#fff', minHeight: '90vh', marginTop: -4}}
                      collapsed={this.props.collapsed}
        >
            <Menus menus={this.props.menus}
                   openKeys={this.props.openKeys}
                   selectedKey={this.props.selectedKey}
                   onOpenChange={this.onMenusOpenChange}
                   onSelect={this.onMenusSelect}/>
        </Sider>
    }
}

export default MenuLayout