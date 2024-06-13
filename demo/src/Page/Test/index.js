import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import getApiList from '../../common/Api/ApiList';
import { useNavigate} from 'react-router-dom';
import TestTable from './TableList'
import { format } from 'date-fns';
import { Button} from 'antd';
import { PiArrowArcLeftBold } from "react-icons/pi";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './style.css'
const Test = () => {
    const location = useLocation();
    const [list, setList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [Start, setStart] = useState('');
    const [date, setDate] = useState('');
    const [mon, setMon] = useState('');
    const nav = useNavigate()

    const convertToISOFormat = (dateTimeString) => {
        const [date] = dateTimeString.split(' ');   
        const [day, month, year] = date.split('/'); 
        const isoFormatString = `${year}-${month}-${day} `; 
        return format(new Date(isoFormatString), "yyyy-MM-dd");
    };

    useEffect(() => {
        if (location.state) {
            const { MaMon, StartTime, date, MaLop,TenMon } = location.state;
            const dateT = convertToISOFormat(date);
            setStart(StartTime);
            setDate(dateT);
            setMon(TenMon)
            console.log("Mon hoc list",TenMon);
            if (!dataLoaded) {
                getApiList(MaMon, StartTime, dateT, MaLop)
                    .then(data => {
                        setList(data);
                        setDataLoaded(true); 
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        } else {
            console.log("No data found in location state");
        }
    }, [location.state, dataLoaded]);

   
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };
    const handClickTkb=()=>{
        nav("/tkb")
    }
    return (
        <div className="Test_tkb">
            <h1>Danh sách sinh viên điểm danh ngày học : {formatDate(date)}</h1>
            <h2>Môn học : {mon}</h2>
            <div className="TestBody">
            <div className="TestBody1">
            <h3>Thời gian bắt đầu học </h3>
            <Clock value={Start} />
            <Button type="primary" onClick={handClickTkb} ><PiArrowArcLeftBold />Quay lại</Button>
            </div>
            
            <TestTable list={list} Start={Start} className="TestBody2" />
            </div>
           
        </div>
    );
};

export default Test;
