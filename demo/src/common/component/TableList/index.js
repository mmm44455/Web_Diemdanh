import { Table } from 'antd';
import { format } from 'date-fns';

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
        <span>{evaluateArrivalTime(record.ThoiGianDen, Start)}</span>
      ),
    },
  ];

  return (
    <Table
      dataSource={list}
      columns={columns}
      rowKey={(record, index) => index}
      pagination={false}
    />
  );
};

export default TestTable;




