// EventDetailForm.js
import React from 'react';
import { Form } from 'antd';
import './style.css'
const { Item } = Form;

const EventDetailForm = ({ eventDetail,role }) => {
    const inputStyle = {
        fontFamily: 'cursive'
      };
  return (
    <Form className="event-detail-form" >
      <Item label="Mã Môn"  className="form-item" >
        <spam style={inputStyle}>{eventDetail?.MaMon}</spam> 
      </Item>
      <Item label="Tên Môn"  className="form-item">
        <spam style={inputStyle}>{eventDetail?.TenMon}</spam> 
      </Item>
      {role === 'Giao vien' && (
        <>
          <Item label="Mã lớp" className="form-item">
            <span style={inputStyle}>{eventDetail?.MaLop}</span>
          </Item>
          <Item label="Tên lớp" className="form-item">
            <span style={inputStyle}>{eventDetail?.TenLop}</span>
          </Item>
        </>
      )}
      <Item label="Phòng"  className="form-item">
        <spam style={inputStyle}>{eventDetail?.Phong}</spam>
      </Item>
      <Item label="Giảng viên"  className="form-item">
        <spam style={inputStyle}>{eventDetail?.TenGV} </spam>
      </Item>
      <Item label="Ngày học"  className="form-item">
         <span style={inputStyle}>{eventDetail?.NgayHoc}</span>
      </Item>
      <Item label="Thời gian"  className="form-item">
        <spam style={inputStyle}>{eventDetail?.StartTime} - {eventDetail?.EndTime}</spam>
      </Item>
      <Item label="Nhóm"  className="form-item">
        <spam style={inputStyle}>{eventDetail?.LopSv} </spam>
      </Item>
    </Form>
  );
};

export default EventDetailForm;
