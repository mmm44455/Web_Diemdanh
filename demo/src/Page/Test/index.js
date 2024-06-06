import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import getApiList from '../../common/Api/ApiList';
import { useNavigate} from 'react-router-dom';
import TestTable from '../../common/component/TableList'
import { format } from 'date-fns';
import { Button} from 'antd';
const Test = () => {
    const location = useLocation();
    const [list, setList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [Start, setStart] = useState('');
    const [date, setDate] = useState('');
    const nav = useNavigate()

    const convertToISOFormat = (dateTimeString) => {
        const [date, time] = dateTimeString.split(' ');   
        const [day, month, year] = date.split('/'); 
        const isoFormatString = `${year}-${month}-${day} `; 
        return format(new Date(isoFormatString), "yyyy-MM-dd");
    };

    useEffect(() => {
        if (location.state) {
            const { MaMon, StartTime, date, MaLop } = location.state;
            const dateT = convertToISOFormat(date);
            setStart(StartTime);
            setDate(dateT);
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
        <>
            <h1>Danh sách sinh viên điểm danh ngày học : {formatDate(date)}</h1>
            <h3>Thời gian bắt đầu học {Start}</h3>
            <Button type="primary" onClick={handClickTkb} >Quay lại</Button>
            <TestTable list={list} Start={Start} />
        </>
    );
};

export default Test;
