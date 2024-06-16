import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import {  Card, Button,Tooltip  } from 'antd';
import { IoMdLogOut } from "react-icons/io";
import { FaCentSign } from "react-icons/fa6";
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
import { FaCalendarAlt } from "react-icons/fa";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon,path) {
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
  const [showTooltip, setShowTooltip] = useState(false);
  
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

  var items = [];
  switch (userRole) {
    case 'admin':
      items = [
        getItem('Trang chủ', '1', <PieChartOutlined />, '/'),
        getItem('Tạo tài khoản', '2', <UserAddOutlined />, '/createAcc'),
        getItem('Train mô hình', '3', <FaCentSign />, '/trainFace'),
      ];
      break;
    case 'Sinh vien':
      items = [
        getItem('Trang chủ', '1', <PieChartOutlined />, '/'),
        getItem('Thời khoá biểu', '2', <FaCalendarAlt />, '/tkb'),
      ];
      break;
    case 'Giao vien':
      items = [
        getItem('Trang chủ', '1', <PieChartOutlined />, '/'),
        getItem('Thời khoá biểu', '2', <FaCalendarAlt />, '/tkb'),
        getItem('Lớp chủ nhiệm', '3', <TeamOutlined />, '/class'),
        getItem('Điểm danh', '4', <UserOutlined />, '/diemdanh'),
        getItem('Danh sách môn học', '5',<FaAddressBook /> , '/default-page')
      ];
      break;
  }
  
  useEffect(() => {
  }, [items]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={220}
      className='sider'
      >
        <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
      {(items || []).map((item, index) => (
      <Menu.Item key={index} icon={item.icon} onClick={() => handleMenuClick(item.path)}>
       {item.label}
    </Menu.Item>
  ))}
    </Menu>

      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} className='header'>
          <div className="demo-logo-vertical" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%' }}>
            <div className='demo_name'>
              <Logo></Logo>
              <h2 className='title_demo'>Điểm danh sinh viên </h2>
            </div>
            <div className="user-profile">
              <TitleUser></TitleUser>
              {userRole==='admin'?(
                <Button type="primary" danger onClick={onLogout} style={{marginRight:'10px'}}> <IoMdLogOut /> Đăng xuất</Button>
              ):(
                 <Tooltip
                title={
                  <Card style={{ textAlign: 'center' }}>
                    <FormInfo />
                    <Button type="primary" onClick={onLogout} danger> <IoMdLogOut /> Đăng xuất</Button>
                  </Card>
                }
                open={showTooltip}
                onOpenChange={visible => setShowTooltip(visible)}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                trigger="click"
              >
                <FaRegUserCircle className="avatar" onClick={() => setShowTooltip(!showTooltip)} />
              </Tooltip>
              )}
             
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
