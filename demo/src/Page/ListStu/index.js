import React, { useState, useEffect } from 'react';
import { Select, Table, Button, Popconfirm, message } from 'antd';
import { format } from 'date-fns';
import axios from 'axios';
import getKhoaStu from '../../common/Api/ApiKhoa';
import getShow from '../../common/Api/ApiShowStu';

const ListStu = () => {
  const [selectedKhoa, setSelectedKhoa] = useState(null);
  const [selectedLop, setSelectedLop] = useState(null);
  const [khoaOptions, setKhoaOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lopOptions, setLopOptions] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchKhoaData = async () => {
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
    };

    fetchKhoaData();
  }, []);

  const handleKhoaChange = (khoa) => {
    setSelectedKhoa(khoa);
    setSelectedLop(null);
    setStudents([]);

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

    const fetchStudentsData = async () => {
      setLoading(true);
      try {
        const data = await getShow(lop);  // Gọi API để lấy dữ liệu sinh viên của lớp đã chọn
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteStu?MaSV=${record.MaSV}`);

      if (response.status === 200) {
        message.success('Đã xóa sinh viên thành công.');
        // Cập nhật lại danh sách sinh viên sau khi xóa thành công
        const updatedStudents = students.filter(student => student.MaSV !== record.MaSV);
        setStudents(updatedStudents);
      } else {
        message.error('Có lỗi xảy ra khi xóa sinh viên.');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      message.error('Có lỗi xảy ra khi gọi API xóa sinh viên.');
    }
  };

  const handleEdit = () => {
    // Xử lý chức năng sửa sinh viên
  };

  const columns = [
    {
      title: 'Mã SV',
      dataIndex: 'MaSV',
      key: 'MaSV',
    },
    {
      title: 'Tên SV',
      dataIndex: 'name',  // Đảm bảo rằng dataIndex tương ứng với dữ liệu từ API
      key: 'name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date',  // Đảm bảo rằng dataIndex tương ứng với dữ liệu từ API
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
      title: 'Xóa/Sửa',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1>Danh sách sinh viên</h1>
      <span>Chọn khoa: </span>
      <Select
        placeholder="Chọn khoa"
        optionFilterProp="children"
        onChange={handleKhoaChange}
        options={khoaOptions}
        style={{ width: 200, marginRight: 20 }}
        loading={loading}
      />
      <span>Chọn lớp: </span>
      <Select
        placeholder="Chọn lớp"
        optionFilterProp="children"
        onChange={handleLopChange}
        options={lopOptions}
        style={{ width: 200, marginRight: 20 }}
        loading={loading}
        value={selectedLop}
      />
      <Table dataSource={students} columns={columns} rowKey="MaSV" />
    </>
  );
};

export default ListStu;
