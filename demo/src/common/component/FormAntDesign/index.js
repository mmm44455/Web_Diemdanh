// EventDetailForm.js
import React from 'react';
import { Form, Input } from 'antd';
import './style.css'
const { Item } = Form;

const EventDetailForm = ({ eventDetail }) => {
    const inputStyle = {
        fontFamily: 'cursive'
      };
  return (
    <Form className="event-detail-form" >
      <Item label="Mã Môn"  className="form-item" >
        <Input value={eventDetail?.MaMon} readOnly className='input-ant' style={inputStyle}/>
      </Item>
      <Item label="Tên Môn"  className="form-item">
        <Input value={eventDetail?.TenMon} readOnly className='input-ant' style={inputStyle} />
      </Item>
      <Item label="Phòng"  className="form-item">
        <Input value={eventDetail?.Phong} readOnly className='input-ant' style={inputStyle}/>
      </Item>
      <Item label="Giảng viên"  className="form-item">
        <Input value={eventDetail?.TenGV} readOnly className='input-ant' style={inputStyle} />
      </Item>
      <Item label="Ngày học"  className="form-item">
        <Input value={eventDetail?.NgayHoc} readOnly className='input-ant' style={inputStyle}/>
      </Item>
      <Item label="Thời gian"  className="form-item">
        <Input value={`${eventDetail?.StartTime} - ${eventDetail?.EndTime}`} readOnly className='input-ant'style={inputStyle} />
      </Item>
      <Item label="Nhóm"  className="form-item">
        <Input value={eventDetail?.LopSv} readOnly className='input-ant' style={inputStyle}/>
      </Item>
    </Form>
  );
};

export default EventDetailForm;
