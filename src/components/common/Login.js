import React, {Component} from "react";
import {Form, Icon, Input, Button, Checkbox, Card} from 'antd';
import styles from "./Login.less"


/**
 *  登录页面
 */
class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onLogin();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return <div className={styles.login}>

            <Form onSubmit={this.handleSubmit} className={styles.login_form}>
                <Form.Item>
                    用户登录
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                            style={{width: '80%'}}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                            style={{width: '80%'}}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '80%'}}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>;
    }
}

export default Form.create()(Login);


