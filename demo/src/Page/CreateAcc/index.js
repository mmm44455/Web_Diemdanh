import React, { useState, useEffect } from 'react';
import { Select, Spin, Input, Button, Modal, Form,Tabs } from 'antd';
import { format } from 'date-fns';
import getKhoaStu from '../../common/Api/ApiKhoa';
import getShow from '../../common/Api/ApiShowStu';
import ReusableTable from '../../common/component/AntTable';
import './style.css';
import axios from 'axios';
import delteLogin from '../../common/Api/ApiDeleteLogin'
import getUpdateLogin  from '../../common/Api/ApiUpdateLogin'
const { Search } = Input;
const { TabPane } = Tabs;
const CreateAcc = () => {
  const [userType, setUserType] = useState(null);
  const [khoaOptions, setKhoaOptions] = useState([]);
  const [lopOptions, setLopOptions] = useState([]);
  const [selectedKhoa, setSelectedKhoa] = useState(null);
  const [selectedLop, setSelectedLop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [initialStudentData, setInitialStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateButton, setShowCreateButton] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedMaSV, setSelectedMaSV] = useState(null);
const [newPassword, setNewPassword] = useState('');
const [newRole, setNewRole] = useState('');
const [teacherId, setTeacherId] = useState('');
const [teacherPassword, setTeacherPassword] = useState('');
  useEffect(() => {
    const fetchKhoaData = async () => {
      if (userType === 'Sinh viên') {
        setLoading(true);
        try {
          const data = await getKhoaStu();
          const uniqueKhoa = [...new Set(data.map(item => item.Khoa))];
          setKhoaOptions(uniqueKhoa.map(khoa => ({ value: khoa, label: khoa })));
        } catch (error) {
          console.error('Error fetching khoa data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchKhoaData();
  }, [userType]);

  useEffect(() => {
    const fetchStudentData = async () => {
     
        setLoading(true);
        try {
          const data = await getShow(selectedLop);
          setStudentData(data);
          setInitialStudentData(data); // Lưu dữ liệu ban đầu
        } catch (error) {
          console.error('Error fetching student data:', error);
        } finally {
          setLoading(false);
        }
      
    };
    fetchStudentData();
  }, [selectedLop]);

  const handleUserTypeChange = (value) => {
    setUserType(value);
    setSelectedKhoa(null);
    setLopOptions([]);
    setStudentData([]);
    setInitialStudentData([]);
  };

  const handleKhoaChange = (khoa) => {
    setSelectedKhoa(khoa);
    setSelectedLop(null);
    const fetchLopData = async () => {
      try {
        const data = await getKhoaStu();
        const filteredLop = data.filter(item => item.Khoa === khoa).map(item => item.LopSv);
        setLopOptions(filteredLop.map(lop => ({ value: lop, label: lop })));
      } catch (error) {
        console.error('Error fetching lop data:', error);
      }
    };
    fetchLopData();
  };

  const handleLopChange = (lop) => {
    setSelectedLop(lop);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleNoAccountClick = async () => {
    try {
      setLoading(true);
      const filteredNoAccountStudents = initialStudentData.filter(student => !student.password);
      const hasStudentsWithoutPassword = filteredNoAccountStudents.some(student => !student.password);
      if (hasStudentsWithoutPassword) {
        setStudentData(filteredNoAccountStudents);
        setShowCreateButton(true);
      } else {
        setStudentData(studentData);
        setShowCreateButton(false);
        alert('Tất cả sinh viên đã có tài khoản.');
      }
    } catch (error) {
      console.error('Error fetching no account data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = studentData.filter(student =>
    student.MaSV.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCreateAccountClick = async () => {
    const filteredNoAccountStudents = initialStudentData.filter(student => !student.password);
    const createdStudentData = [];
    try {
      setLoading(true);
      for (let i = 0; i < filteredNoAccountStudents.length; i++) {
        const student = filteredNoAccountStudents[i];
        await axios.post(`http://localhost:8000/api/insertlogin?username=${student.MaSV}&password=123456&Chucvu=Sinh%20vien`);
       
        createdStudentData.push({ ...student, password: studentData.password});
      } console.log(initialStudentData.password);
      const updatedStudentData = initialStudentData.map(student => {
        const createdStudent = createdStudentData.find(createdStudent => createdStudent.MaSV === student.MaSV);
        return createdStudent ? createdStudent : student;
      });
  
      setStudentData(updatedStudentData); 
        setStudentData(updatedStudentData);
      setShowCreateButton(false);
      
      alert('Tạo tài khoản thành công!');
    } catch (error) {
      console.error('Lỗi khi tạo tài khoản:', error);
      alert('Lỗi khi tạo tài khoản.');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (MaSV,password) => {
     await delteLogin(MaSV)
    
     const updatedStudentData = studentData.map(student => {
      if (student.MaSV === MaSV) {
        return { ...student, password: studentData.password }; // Xóa mật khẩu của sinh viên bị xóa
      }
      return student;
    });

    setStudentData(updatedStudentData);
    
    alert('Xóa tài khoản thành công ')
  };

  const showModal = (MaSV) => {
    setSelectedMaSV(MaSV);
    setNewRole('Sinh viên'); 
    setIsModalVisible(true);
  };
  const handleModalOk = async () => {
    try {
      await getUpdateLogin(selectedMaSV, newPassword, newRole);
      setStudentData(studentData.map(student => {
        if (student.MaSV === selectedMaSV) {
          student.password = newPassword; // Cập nhật mật khẩu trong state
        }
        return student;}))
      alert("Đổi mật khẩu thành công")
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      
    } finally {
      setIsModalVisible(false);
      setNewPassword('');
      setNewRole('');
    }
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setNewPassword('');
    setNewRole('');
  };
  const handleChangePassword = async (MaSV) => {
   showModal(MaSV);
  };
  const handleTeacherIdChange = (e) => {
    setTeacherId(e.target.value);
  };

  const handleTeacherPasswordChange = (e) => {
    setTeacherPassword(e.target.value);
  };
  const handCreateTeacher = async()=>{
    try {
      setLoading(true);
      await axios.post(`http://localhost:8000/api/insertlogin?username=${teacherId}&password=${teacherPassword}&Chucvu=Giao%20vien`);
      alert('Tạo tài khoản giáo viên thành công!');
      setTeacherId('');
      setTeacherPassword('');
    } catch (error) {
      console.error('Lỗi khi tạo tài khoản giáo viên:', error);
      alert('Lỗi khi tạo tài khoản giáo viên.');
    } finally {
      setLoading(false);
    }
     
  }
  const handDeleteTeacher = async()=>{
      await delteLogin(teacherId)
      alert("Xoá tài khoản giáo viên thành công")
      setTeacherId('')
  }
  const handUpdatePassTea = async()=>{
      await getUpdateLogin(teacherId,teacherPassword,'Giao vien')
      alert("Cập nhật mật khẩu giáo viên thành công")
      setTeacherId('');
      setTeacherPassword('');
  }
  const columns = [
    {
      title: 'Mã Sinh Viên',
      dataIndex: 'MaSV',
      key: 'MaSV',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'date',
      key: 'date',
      render: (text) => (text ? format(new Date(text), 'dd/MM/yyyy') : 'N/A'),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioitinh',
      key: 'gioitinh',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Cấp / xóa tài khoản',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button  onClick={() => handleDelete(record.MaSV,record.password)} type='primary' danger style={{marginRight:10}}>Xóa</Button>
          <Button type="primary" onClick={() => handleChangePassword(record.MaSV)} style={{backgroundColor:'yellow' ,color:'black'}}>Đổi mật khẩu</Button>
        </div>
      ),}
  ];

  return (
    <div className="create-acc">
      <span>Chọn đối tượng muốn tạo: </span>
      <Select
        placeholder="Chọn đối tượng"
        optionFilterProp="children"
        onChange={handleUserTypeChange}
        options={[
          { value: 'Sinh viên', label: 'Sinh viên' },
          { value: 'Giáo viên', label: 'Giáo viên' },
        ]}
        style={{ width: 200, marginRight: 20 }}
      />
      {userType === 'Sinh viên' && (
        <>
          <span>Chọn khoa: </span>
          <Select
            placeholder="Chọn khoa"
            optionFilterProp="children"
            onChange={handleKhoaChange}
            options={khoaOptions}
            style={{ width: 200, marginRight: 20 }}
            loading={loading}
          />
          {selectedKhoa && (
            <>
              <span>Chọn lớp: </span>
              <Select
                placeholder="Chọn lớp"
                optionFilterProp="children"
                onChange={handleLopChange}
                options={lopOptions}
                style={{ width: 200 }}
              />
            </>
          )}
          {selectedLop && (
            <div style={{ marginTop: 20 }}>
              <Search
                placeholder="Tìm kiếm theo mã sinh viên"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: 20, width: 300 }}
              />
              <Button onClick={handleNoAccountClick} style={{ marginBottom: 20,marginLeft:10 }} danger type='primary'>
                Chưa có tài khoản
              </Button>
              {loading ? (
                <Spin />
              ) : (
                <ReusableTable columns={columns} data={filteredData} rowKey="MaSV" />
              )}
              {showCreateButton && (
                <Button onClick={handleCreateAccountClick} style={{ marginBottom: 20,marginTop:10 }} type='primary'>
                  Tạo tài khoản
                </Button>
              )}
            </div> 
          )}
           <Modal
        title="Đổi mật khẩu"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form>
          <Form.Item label="Mật khẩu mới">
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Chức vụ">
            <Input value={newRole} disabled />
          </Form.Item>
        </Form>
      </Modal>
        </>
      )}
      {userType ==='Giáo viên'&&(
        <>
        <Tabs defaultActiveKey="1">
        <TabPane tab="Tạo tài khoản" key="1">
          <Form className='form-teacher'>
            <Form.Item label="Mã giáo viên : ">
              <Input placeholder='Mã giáo viên' onChange={handleTeacherIdChange} value={teacherId}></Input>
            </Form.Item>
            <Form.Item label="Mật khẩu ">
              <Input placeholder='Nhập mật khẩu' onChange={handleTeacherPasswordChange} value={teacherPassword} />
            </Form.Item>
            <Button type='primary'  onClick={handCreateTeacher}>Tạo tài khoản</Button>
          </Form>
        </TabPane>
        <TabPane tab="Xóa tài khoản" key="2">
          <Form className='form-teacher'>
            <Form.Item label="Mã giáo viên : ">
              <Input placeholder='Mã giáo viên' onChange={handleTeacherIdChange} value={teacherId}></Input>
            </Form.Item>
            <Button type='primary' danger onClick={handDeleteTeacher}>Xóa tài khoản</Button>
          </Form>
        </TabPane>
        <TabPane tab="Đổi mật khẩu" key="3">
          <Form className='form-teacher'>
            <Form.Item label="Mã giáo viên : ">
              <Input placeholder='Mã giáo viên' onChange={handleTeacherIdChange} value={teacherId}></Input>
            </Form.Item>
            <Form.Item label="Mật khẩu mới">
              <Input placeholder='Nhập mật khẩu mới' onChange={handleTeacherPasswordChange} value={teacherPassword} />
            </Form.Item>
            <Button type='primary' onClick={handUpdatePassTea} style={{backgroundColor:'yellowgreen'}}>Đổi mật khẩu</Button>
          </Form>
        </TabPane>
      </Tabs>
        </>
      )
      }
    </div>
  );
};

export default CreateAcc;
