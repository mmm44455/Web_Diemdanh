import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';
import getUserInfo from '../../common/Api/ApiTkb';
import { format } from 'date-fns';
import { Modal,Button } from 'antd';
import EventDetailForm from '../../common/component/FormAntDesign'
import './style.css';
import { useNavigate} from 'react-router-dom';

const TKB = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cachedData, setCachedData] = useState(null); 
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('chuc vu');
  const [eventDetail, setEventDetail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const nav = useNavigate()
  useEffect(() => {
    fetchTKBData();
  }, [username]);

  const fetchTKBData = async () => {
    try {
      setLoading(true);
      let data;
      if (cachedData) {
        data = cachedData;
      } else {
        data = await getUserInfo(username);
        setCachedData(data);
      }

      const formattedData = data.map(event => ({
        id: event.MaMon,
        title: `${event.TenMon}(${event.MaMon})\nPhòng: ${event.Phong}\nGV: ${event.TenGV}`,
        start: `${event.NgayHoc}T${event.StartTime}:00`,
        end: `${event.NgayHoc}T${event.EndTime}:00`,
        extendedProps: {
          TenMon : event.TenMon,
          MaMon: event.MaMon,
          Phong: event.Phong,
          TenGV: event.TenGV,
          StartTime: event.StartTime,
          EndTime: event.EndTime,
          NgayHoc: event.NgayHoc,
          LopSv: event.LopSv,
          MaLop:event.MaLop,
          TenLop:event.TenLop
        }
      }));
      setEvents(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching TKB data:', error);
      setLoading(false);
    }
  };


  const handleEventClick = (clickInfo) => {
    const { MaMon,TenMon, Phong, TenGV, StartTime, EndTime, NgayHoc, LopSv,MaLop,TenLop } = clickInfo.event.extendedProps;
    const detail = {
      MaMon,
      TenMon,
      Phong,
      TenGV,
      NgayHoc: format(new Date(NgayHoc), 'dd/MM/yyyy'),
      StartTime,
      EndTime,
      LopSv,
      MaLop,
      TenLop
    };
    setEventDetail(detail);
    setModalVisible(true);
  };
  const handEventDiem = () => {
    if (eventDetail) {
      const MaMon = `${eventDetail.MaMon}`;
      const MaLop = `${eventDetail.MaLop}`;
      const TenMon = `${eventDetail.TenMon}`;
      const date = `${eventDetail.NgayHoc}`;
      const startTime = ` ${eventDetail.StartTime}:00`;
      const endTime = `${eventDetail.EndTime}:00`
      nav('/diemdanh', { state: { MaLop: MaLop, MaMon: MaMon, TenMon: TenMon,date: date,startTime :startTime,endTime:endTime } });
    } else {
      console.error('Event details are not available');
    }
  };
  const handClickList = ()=>{
    if (eventDetail) {
      const startTime = ` ${eventDetail.StartTime}:00`;
      const MaLop = `${eventDetail.MaLop}`;
      const MaMon = `${eventDetail.MaMon}`;
      const date = `${eventDetail.NgayHoc}`;
      const TenMon = `${eventDetail.TenMon}`;
      nav('/test', { state: { MaLop: MaLop, StartTime: startTime, date: date, MaMon: MaMon ,TenMon:TenMon} });
    } else {
      nav('/default-page');
    }
  }   
  const isEventEnded = (endDateTime) => {
    const currentDateTime = new Date();
    const [day, month, yearAndTime] = endDateTime.split('/');
    const [year, time] = yearAndTime.split('T');
    const formattedDate1String = `${year}-${month}-${day}T${time}`; 
    const date1 = new Date(formattedDate1String);
    return date1 < currentDateTime;
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          buttonText={{
            today: 'Hôm nay'
          }}
          events={events}
          eventClick={handleEventClick} 
          height={600}
          eventContent={renderEventContent}
          slotMinTime="07:00:00" // Giới hạn thời gian bắt đầu từ 7h sáng
          slotMaxTime="19:00:00"
          locale={viLocale}
          dayHeaderFormat={{ weekday: 'short' }}
        />

      )}
      
      {modalVisible && (
        <Modal
        open={modalVisible}
          title="Thông tin buổi học"
          onCancel={() => setModalVisible(false)}
          footer={null}
          className='title-info'
        >
          <EventDetailForm eventDetail={eventDetail} role={role}></EventDetailForm>
          {role === 'Giao vien' && (
           <div className='button_diem'>
           {!isEventEnded(`${eventDetail.NgayHoc}T${eventDetail.EndTime}:00`) && (
             <Button type="primary" onClick={handEventDiem}>Điểm danh</Button>
           )}
             <Button type="primary" onClick={handEventDiem}>Điểm danh</Button>
           <Button type="primary" danger onClick={handClickList} >Danh sách điểm danh</Button>
         </div>
         )}
        </Modal>
      )}
    </div>
  );
};

// Hàm render nội dung sự kiện
const renderEventContent = (eventInfo) => {
  return (
    <div>
      <b>{eventInfo.timeText}</b>
      <br />
      <i>{eventInfo.event.title.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}</i>
    </div>
  );
};

export default TKB;
