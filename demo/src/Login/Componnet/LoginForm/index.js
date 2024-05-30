import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './sytle.css';
import { useNavigate } from 'react-router-dom';
import ApiLogin from '../../../common/Api/ApiLogin';
const LoginForm = () => {
    const nav = useNavigate()
    const onFinish = async (values) => {
        try {
            const { username, password } = values;
            const data = await ApiLogin (username, password); // Gọi hàm login để đăng nhập

            // Kiểm tra phản hồi từ server và điều hướng đến trang chính nếu đăng nhập thành công
            if (data && data.token) {
                // Lưu trữ token vào localStorage (nếu cần)
                localStorage.setItem('token', data.token);
                localStorage.setItem('username',data.username)
                localStorage.setItem('chuc vu',data.role)
                nav("/");
            }
        } catch (error) {
            console.error('Failed to log in:', error);
            alert("Đăng nhập thất bại ")
        }
    };


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
return (
  <div className="login-container">
    <div className="login-image"></div>
    <div className="login-form-wrapper">
      <h2 className="login-form-title">Đăng nhập hệ thống</h2>
      <Form
        name="basic"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="login-form-item"
          label={<span style={{ fontFamily: 'cursive' }}>Tên tài khoản</span>}
          name="username"
          rules={[{ required: true, message: 'Bạn chưa nhập tên tài khoản' }]}
        >
          <Input style={{ fontFamily: 'cursive' }}/>
        </Form.Item>

        <Form.Item
          className="login-form-item"
          label={<span style={{ fontFamily: 'cursive' }}>Mật khẩu </span>}
          name="password"
          rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu ' }]}
        >
          <Input.Password style={{ fontFamily: 'cursive' }}/>
        </Form.Item>

        <Form.Item
          className="login-form-item"
          name="remember"
          valuePropName="checked"
        >
          <Checkbox style={{ fontFamily: 'cursive' }}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item className="login-form-item">
          <Button type="primary" htmlType="submit" className="login-form-button" danger  >
            <span style={{ fontFamily: 'cursive' }}>Đăng nhập </span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
  )
};

export default LoginForm;
