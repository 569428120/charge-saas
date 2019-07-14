import React, {Component} from "react";
import {Form, Modal, Transfer, Tree} from "antd";


const {TreeNode} = Tree;

const isChecked = (selectedKeys, eventKey) => {
  return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({children, ...props}) => (
    <TreeNode {...props} disabled={checkedKeys.includes(props.key)}>
      {generateTree(children, checkedKeys)}
    </TreeNode>
  ));
};

const TreeTransfer = ({dataSource, targetKeys, ...restProps}) => {
  const transferDataSource = [];

  const targetDataSource = [];

  function flatten(list = []) {
    list.forEach(item => {
      transferDataSource.push(item);
      targetDataSource.push(item);
      flatten(item.children);
    });
  }

  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      showSearch
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
    >
      {({direction, onItemSelect, selectedKeys}) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={(
                _,
                {
                  node: {
                    props: {eventKey},
                  },
                },
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
              onSelect={(
                _,
                {
                  node: {
                    props: {eventKey},
                  },
                },
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
            >
              {generateTree(dataSource, targetKeys)}
            </Tree>
          );
        } else {
          return <Tree
            blockNode
            checkable
            defaultExpandAll
            >
            {generateTree(targetDataSource, targetKeys)}
          </Tree>
        }

      }}
    </Transfer>
  );
};

const treeData = [
  {key: '0-0', title: '0-0'},
  {
    key: '0-1',
    title: '0-1',
    children: [{key: '0-1-0', title: '0-1-0'}, {key: '0-1-1', title: '0-1-1'}],
  },
  {key: '0-2', title: '0-3'},
];

class SettingRoleModal extends Component {
  state = {
    targetKeys: [],
  };

  onChange = targetKeys => {
    console.log('Target Keys:', targetKeys);
    this.setState({targetKeys});
  };

  render() {
    const {targetKeys, selectedKeys, disabled} = this.state;

    return <Modal
      title="权限设置"
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.onModalOk}
      onCancel={this.props.onCancel}
    >
      <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange}/>
    </Modal>;
  }
}

export default Form.create()(SettingRoleModal)
