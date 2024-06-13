import { useEffect, useState } from "react"
import getListStudent from "../../common/Api/ApiListStu"
import ReusableTable from "../../common/component/AntTable"
import { format } from 'date-fns';
import { Select, Button } from 'antd';
import getListHK from "../../common/Api/ApiHK"; 
import ListStu from "./ListStuDIem";
import './style.css'
const { Option } = Select;

const Class = () => {
    const role = localStorage.getItem('chuc vu')
    const username = localStorage.getItem('username')
    const [datalist, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hockyOptions, setHockyOptions] = useState([]);
    const [namOptions, setNamOptions] = useState([]);
    const [showExportInfo, setShowExportInfo] = useState(false);
    const [selectedHocKy, setSelectedHocKy] = useState(null);
    const [selectedNamHoc, setSelectedNamHoc] = useState(null);

    useEffect(() => {
        if (role === 'Giao vien') {
            getListStudent(username)
                .then(data => {
                    setData(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error("Error fetching data:", error)
                    setLoading(false)
                })
            fetchMonHocData();
        }
    }, [role, username])

    const fetchMonHocData = async () => {
        try {
            const monhocData = await getListHK();
            const hockyOpts = monhocData.map(item => ({ value: item.HocKy, label: item.HocKy }));
            const namSet = new Set(monhocData.map(item => item.Nam));
            const namOpts = [...namSet].map(year => ({ value: year, label: year }));         
            setHockyOptions(hockyOpts);
            setNamOptions(namOpts);
        } catch (error) {
            console.error("Error fetching monhoc data:", error);
        }
    }

    const handleButtonClick = () => {
        
        setShowExportInfo(true); 
    }

    const hideExportInfoPanel = () => {
        setShowExportInfo(false); // Hide the export info panel
    };

    const columns = [
        {
            title: 'Mã SV',
            dataIndex: 'MaSV',
            key: 'MaSV',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'date',
            key: 'date',
            render: (text) => text ? format(new Date(text), 'dd/MM/yyyy') : 'N/A',
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
    ];

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                    <>
                        <div style={{ marginBottom: '16px' }}>
                            <Select style={{ width: '200px', marginRight: '8px' }} placeholder="Chọn học kỳ" 
                            onChange={value => setSelectedHocKy(value)}>
                                {hockyOptions.map(option => (
                                    <Option key={option.value} value={option.value}>{option.label}</Option>
                                ))}
                            </Select>
                            <Select style={{ width: '200px', marginRight: '8px' }} placeholder="Chọn năm học" 
                            onChange={value => setSelectedNamHoc(value)}>
                                {namOptions.map(option => (
                                    <Option key={option.value} value={option.value}>{option.label}</Option>
                                ))}
                            </Select>
                            <Button type="primary" onClick={handleButtonClick}>Xuất danh sách</Button>
                        </div>
                        {showExportInfo ? (
                            <div style={{ padding: '16px', background: 'white', marginBottom: '16px' }}>
                                <ListStu MaGV={localStorage.getItem('username')} HocKy = {selectedHocKy} Nam={selectedNamHoc}></ListStu>
                                <Button type="primary" onClick={hideExportInfoPanel}>Đóng</Button>
                            </div>
                        ) : (
                            <ReusableTable columns={columns} data={datalist}></ReusableTable>
                        )}
                    </>
                )}
        </>
    );
}

export default Class
