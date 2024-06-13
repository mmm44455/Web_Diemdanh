import getListHK from "../../common/Api/ApiHK"; 
import { useEffect, useState } from "react"
import { Select} from 'antd';
import getSubject from "../../common/Api/ApiGetSubject";
import getListSubject from "../../common/Api/ApigetListSubject";
import ReusableTable from "../../common/component/AntTable";
const Default_page=()=>{
    const { Option } = Select;
    const role = localStorage.getItem('chuc vu')
    const username = localStorage.getItem('username')
    const [hockyOptions, setHockyOptions] = useState([]);
    const [namOptions, setNamOptions] = useState([]);
    const [selectedHocKy, setSelectedHocKy] = useState(null);
    const [selectedNamHoc, setSelectedNamHoc] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjectName, setSelectedSubjectName] = useState(null); // Tên môn học được chọn
    const [selectedClassCode, setSelectedClassCode] = useState(null); //
    const [selectedSubjectCode, setSelectedSubjectCode] = useState(null)
    const [listData,setDatalist] = useState([])
    useEffect(() => {
        if (role === 'Giao vien') {
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
    const fetchSuject = async()=>{
        try{
            const dataSubject = await getSubject(username,selectedHocKy,selectedNamHoc)
            setSubjects(dataSubject)
        }catch(error){
            console.log(error);
        }
    }
    const fetchListSubject = async()=>{
        try{
            const dataList  =await getListSubject(username,selectedHocKy,selectedNamHoc,selectedClassCode,selectedSubjectCode)
            const processedData = dataList.map(item => ({
                ...item,
                SoBuoiHoc: item.SoBuoiHoc === null ? 0 : item.SoBuoiHoc,
                BuoiDiemdanh: item.BuoiDiemdanh === null ? 'Không học buổi nào' : item.BuoiDiemdanh
            }));
            setDatalist(processedData)
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchListSubject();
    },[username,selectedHocKy,selectedNamHoc,selectedClassCode,selectedSubjectCode])
    useEffect(()=>{
        fetchSuject();
    },[username,selectedHocKy,selectedNamHoc])
    const uniqueSubjects = Array.from(new Set(subjects.map(subject => subject.TenMon)))
        .map(tenMon => {
            const firstSubject = subjects.find(subject => subject.TenMon === tenMon);
            return {
                tenMon: tenMon,
                maMon: firstSubject.MaMon, 
                maLop: subjects.filter(subject => subject.TenMon === tenMon).map(subject => subject.MaLop)
            };
        });
        const filteredClasses = selectedSubjectName 
        ? subjects.filter(subject => subject.TenMon === selectedSubjectName)
        : [];
        const handleSelectSubject = (value) => {
            setSelectedSubjectName(value);
            setSelectedClassCode(null); // Đặt lại mã lớp khi chọn một môn học mới
            const selectedSubject = uniqueSubjects.find(subject => subject.tenMon === value);
    if (selectedSubject) {
        setSelectedSubjectCode(selectedSubject.maMon);
    }
        };
    const columns = [
        {
            title: 'Mã SV',
                dataIndex: 'MaSV',
                key: 'MaSV',
        },{
                title: 'Họ và tên',
                dataIndex: 'name',
                key: 'name',
        },
        {
            title: 'Môn học',
            dataIndex: 'TenMon',
            key: 'TenMon',
        },
        {
            title: 'Số buổi học',
            dataIndex: 'SoBuoiHoc',
            key: 'SoBuoiHoc',
        },
        {
            title: 'Số buổi đi học',
            dataIndex: 'BuoiDiemdanh',
            key: 'BuoiDiemdanh',
        },
    ]
    return(
        <>
       <h1 style={{ fontFamily: 'cursive',margin:'0' }}>Danh sách môn học kỳ này</h1> 
       <div style={{ marginBottom: '16px',marginTop:'10px' }}>
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
                            {subjects.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                    <Select
                        style={{ width: '400px', marginRight: '8px' }}
                        placeholder="Chọn môn học"
                        onChange={handleSelectSubject}
                    >
                        {uniqueSubjects.map(subject => (
                            <Option key={subject.tenMon} value={subject.tenMon}>
                                {subject.tenMon}({subject.maMon})
                            </Option>
                        ))}
                    </Select>
                    <Select
                        style={{ width: '400px', marginRight: '8px' ,marginBottom:'8px' }}
                        placeholder="Chọn mã lớp"
                        onChange={value => setSelectedClassCode(value)}
                        disabled={!selectedSubjectName}
                        value={selectedClassCode}
                    >
                        {filteredClasses.map(subject => (
                            <Option key={subject.MaLop} value={subject.MaLop}>
                                {subject.MaLop}
                            </Option>
                        ))}
                    </Select>
                    <ReusableTable columns={columns} data={listData}></ReusableTable>
                </div>
            )}
         </div>
        </>
    )
}
export default Default_page