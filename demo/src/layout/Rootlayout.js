import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { Modal, Card, Avatar, Button } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  PieChartOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import Logo from '../common/component/Logo';
import './Rootlay.css'
import FormInfo from '../Page/FormInfo';
import TitleUser from '../Page/TitleUser'
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children,path) {
  console.log("Path in getItem:", path);
  return {
    key,
    icon,
    label,
    path
  };
}

const getUserRole = () => {
  // Giả sử bạn đã lưu vai trò của người dùng vào localStorage
  const userRole = localStorage.getItem('chuc vu');
  return userRole;
};

const RootLayout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  const handleMenuClick = (path) => {
    navigate(path);
  };
  
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (!tokenFromLocalStorage) {
        navigate('/login');
    }
  }, [navigate]);

  const [collapsed, setCollapsed] = useState(false);
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('chuc vu')
   navigate('/login')
  }

  const userRole = getUserRole(); // Hàm getUserRole() trả về vai trò của người dùng

  let items = [];
  switch (userRole) {
    case 'admin':
      items = [
        getItem('Trang chủ', '1', <PieChartOutlined />, null, '/'),
        getItem('Tạo tài khoản', '2', <UserAddOutlined />, null, '/create-account'),
      ];
      break;
    case 'Sinh vien':
      items = [
        getItem('Trang chủ', '1', <PieChartOutlined />, null, '/'),
        getItem('Thời khoá biểu', '2', <DesktopOutlined />, null, '/tkb'),
      ];
      break;
    case 'Giao vien':
      items = [
        getItem('Trang chủ', '1', <PieChartOutlined />, null, '/'),
        getItem('Thời khoá biểu', '2', <DesktopOutlined />, null, '/tkb'),
        getItem('Lớp chủ nhiệm', '3', <TeamOutlined />, null, '/class'),
        getItem('Điểm danh', '4', <UserOutlined />, null, '/diemdanh'),
        getItem('Test', '5', <UserOutlined />, null, '/test')
      ];
      break;
  }
  
  useEffect(() => {
    console.log("Items:", items);
  }, [items]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
      {(items || []).map((item, index) => (
      <Menu.Item key={index} icon={item.icon} onClick={() => handleMenuClick(item.path)}>
       {item.label}
    </Menu.Item>
  ))}
    </Menu>

      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <div className="demo-logo-vertical" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%' }}>
            <div className='demo_name'>
              <Logo></Logo>
              <h2 className='title_demo'>Điểm danh sinh viên </h2>
            </div>
            <div className="user-profile">
              <TitleUser></TitleUser>
              <FaRegUserCircle className="avatar" onClick={handleShowModal} />
              <Modal
                title="Thông tin người dùng"
                visible={showModal}
                onCancel={handleCancel}
                footer={null}
              >
                <Card style={{ textAlign: 'center' }}>
                  <FormInfo></FormInfo>
                  <Button type="primary" onClick={onLogout}>Đăng xuất</Button>
                </Card>
              </Modal>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: '8px' }}>
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
