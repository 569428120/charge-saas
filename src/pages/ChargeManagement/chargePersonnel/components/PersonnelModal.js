import React, {Component} from "react";
import {Button, Cascader, Form, Icon, Input, Modal, Radio, Select} from "antd";

const {Option, OptGroup} = Select;

const InputGroup = Input.Group;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};


/**
 *   交通路线
 * @param routeData
 */
const getRideOptions = (routeData) => {
  if (!routeData) {
    return null;
  }
  const children = routeData.map(item => {
    return {
      value: item.code,
      label: item.name,
    }
  });

  return [
    {
      value: false,
      label: '无需乘车',
    },
    {
      value: true,
      label: '需乘车',
      children: children,
    }
  ];
};

/**
 *   寄读方式
 * @param boardingData
 * @returns {null|*}
 */
const getBoardingDataRadio = (boardingData) => {
  if (!boardingData) {
    return null;
  }
  return boardingData.map(item => {
    return <Radio key={item.code} value={item.code}>{item.name}</Radio>
  });
};


/**
 *  班级
 * @param classData
 */
const getClassOptions = (classData) => {
  if (!classData) {
    return null;
  }
  const classMap = new Map();
  classData.forEach(item => {
    let classList = classMap.get(item.grade, null);
    if (!classList) {
      classList = [];
      classMap.set(item.grade, classList)
    }
    classList.push(item);
  });

  const options = [];
  classMap.forEach((v, k) => {
    options.push(<OptGroup key={k} label={k}>
      {
        v.map(item => {
          return <Option key={item.classCode} value={item.classCode}>{item.className}</Option>
        })
      }
    </OptGroup>)
  });


  return options;

};

/**
 *   增加收费人员
 *   props:
 *   visible
 *   dataSource
 *   boardingData
 *   routeData
 *   classData
 *   onOk
 *   onCancel
 */
class PersonnelModal extends Component {

  onModalOk = () => {
    const {onOk} = this.props;
    const {id} = this.props.dataSource;
    const isEdit = !!id;
    if (onOk) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let ride = values.ride;
          let routesCode = "";
          if (ride.length === 2) {
            routesCode = ride[1];
          }
          ride = ride[0];
          onOk({...values, ride, routesCode, id}, isEdit);
        }
      });
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {boardingData, routeData, classData} = this.props;
    // 回显数据
    const {name, studentId, classCode, boardingCode, ride, routesCode} = this.props.dataSource;
    let rides = [ride || false];
    if (routesCode) {
      rides.push(routesCode)
    }
    return <Modal
      title="缴费人员"
      width={600}
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.onModalOk}
      onCancel={this.props.onCancel}
    >
      <Form {...formItemLayout} >
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [
              {required: true, message: '姓名不能为空'}
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>

        <Form.Item label="学号">
          {getFieldDecorator('studentId', {
            initialValue: studentId,
            rules: [
              {required: true, message: '学号不能为空'}
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>

        <Form.Item label="班级">
          {getFieldDecorator('classCode', {
            initialValue: classCode,
            rules: [
              {required: true, message: '班级不能为空'}
            ]
          })(<Select defaultValue="lucy" style={{width: '70%'}}>
              {
                getClassOptions(classData)
              }
            </Select>
          )}
        </Form.Item>

        <Form.Item label="寄读方式">
          {getFieldDecorator('boardingCode', {
            initialValue: boardingCode,
            rules: [
              {required: true, message: '寄读方式不能为空'}
            ]
          })(<Radio.Group style={{width: '90%'}}>
            {getBoardingDataRadio(boardingData)}
          </Radio.Group>)}
        </Form.Item>

        <Form.Item label="是否乘车">
          {getFieldDecorator('ride', {
            initialValue: rides,
            rules: [
              {required: true, message: '是否乘车不能为空'}
            ]
          })(<Cascader options={getRideOptions(routeData)}
                       placeholder="Please select"
                       style={{width: '70%'}}/>)}
        </Form.Item>

      </Form>
    </Modal>;
  }
}

export default Form.create()(PersonnelModal);
