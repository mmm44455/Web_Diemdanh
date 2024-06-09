import { Table } from 'antd';
import { format } from 'date-fns';
import './style.css'
const TestTable = ({ list, Start }) => {
  const evaluateArrivalTime = (ThoiGianDen, StartTime) => {
    if (!ThoiGianDen) return 'Vắng';
    const arrivalTime = ThoiGianDen.split(' ')[1];
  
    if (arrivalTime < StartTime) {
        return 'Đến sớm';
    } else if (arrivalTime === StartTime) {
        return 'Đúng giờ';
    } else {
        return 'Đến muộn';
    }
  };
  const getColorForResult = (result) => {
    switch (result) {
      case 'Đến sớm':
        return { color: 'green' }; // Màu xanh cho Đến sớm
      case 'Đúng giờ':
        return { color: 'blue' }; // Màu xanh dương cho Đúng giờ
      case 'Đến muộn':
        return { color: 'rgb(255, 200, 62' }; // Màu vàng cho Đến muộn
      default:
        return { color: 'red' }; // Mặc định màu đỏ cho trường hợp khác
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã SV',
      dataIndex: 'MaSV',
      key: 'MaSV',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioitinh',
      key: 'gioitinh',
    },
    {
      title: 'Lớp SV',
      dataIndex: 'LopSv',
      key: 'LopSv',
    },
    {
      title: 'Thời gian đến',
      dataIndex: 'ThoiGianDen',
      key: 'ThoiGianDen',
      render: (text, record) => (
        <span>
          {record.ThoiGianDen ? format(new Date(record.ThoiGianDen), 'HH:mm:ss') : 'Chưa đến'}
        </span>
      ),
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      render: (text, record) => (
        <span style={getColorForResult(evaluateArrivalTime(record.ThoiGianDen, Start))} className="table_kq">
        {evaluateArrivalTime(record.ThoiGianDen, Start)}
      </span>
      ),
    },
  ];

  return (
    <Table 
    className='table_list'
      dataSource={list}
      columns={columns}
      rowKey={(record, index) => index}
      pagination={false}
    />
  );
};

export default TestTable;




