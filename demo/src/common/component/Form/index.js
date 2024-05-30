import React, { useState } from 'react';
import axios from 'axios';
import{ Button } from"antd"
;
import './sytle.css'
const Form = () => {
    const [newStudent, setNewStudent] = useState({
        MaSV: '',
        name: '',
        date: '',
        gioitinh: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/add_student', newStudent);
            // Reset form sau khi thêm sinh viên
            setNewStudent({
                MaSV: '',
                name: '',
                date: '',
                gioitinh: '',
            });
            alert("Bạn đã thêm thành công")
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <div className='FormStudent'>
              <form >
            Mã số sinh viên:<br/>
            <input type="text" name="MaSV" placeholder="Mã số Sinh viên" value={newStudent.MaSV} onChange={handleInputChange} className='inputStudent' /><br/>
            Tên Sinh viên:<br/>
            <input type="text" name="name" placeholder="Tên sinh viên" value={newStudent.name} onChange={handleInputChange} className='inputStudent'/><br/>
            Ngày sinh:<br/>
            <input type="date" name="date" placeholder="Ngày sinh (yyyy-MM-dd)" value={newStudent.date} onChange={handleInputChange} className='inputStudent' /><br/>
            Giới tính:
            <select name="gioitinh" value={newStudent.gioitinh} onChange={handleInputChange} >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select><br/>
            <Button type="primary" size="large" onClick={handleSubmit}>Thêm sinh viên </Button>
        </form>
        </div>
      
    );
}

export default Form;
