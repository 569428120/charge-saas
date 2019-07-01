import React, {PureComponent} from 'react';
import {Icon} from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';


export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  toggle = () => {
    const {collapsed, onCollapse} = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };


  /**
   *   系统列表
   */
  getSystemList = (onSystemClick) => {
    const {systemList, systemKey} = this.props;
    return systemList.map(item => {
      if (item.key === systemKey) {
        return <span key={item.key} className={styles.trigger_select}>{item.name}</span>
      }
      return <span key={item.key} onClick={() => onSystemClick(item.key, item.path)}
                   className={styles.trigger}>{item.name}</span>
    });
  };

  render() {
    const {collapsed, isMobile, logo, onSystemClick} = this.props;

    const systemList = this.getSystemList(onSystemClick);
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32"/>
          </Link>
        )}
        <span className={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
        </span>
        {systemList}
        <RightContent {...this.props} />
      </div>
    );
  }
}
