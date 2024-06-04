import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';
import getUserInfo from '../../common/Api/ApiTkb';
import { Tooltip } from 'react-tooltip';
import { format } from 'date-fns';
import { Modal } from 'antd';
import EventDetailForm from '../../common/component/FormAntDesign'
import './style.css';
import { useNavigate} from 'react-router-dom';

const TKB = () => {
  const [events, setEvents] = useState([]);
  const [tooltipContent, setTooltipContent] = useState(null);
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

      // Kiểm tra xem có dữ liệu được lưu trong cache không
      if (cachedData) {
        data = cachedData;
      } else {
        // Nếu không có dữ liệu trong cache, gọi API để lấy dữ liệu mới
        data = await getUserInfo(username);
        // Lưu dữ liệu vào cache
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
          LopSv: event.LopSv
        }
      }));
      setEvents(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching TKB data:', error);
      setLoading(false);
    }
  };

  const handleEventMouseEnter = (eventInfo) => {
    const { MaMon,TenMon, Phong, TenGV, StartTime, EndTime, NgayHoc, LopSv } = eventInfo.event.extendedProps;
    const tooltipHtml = `<div><b>Mã Môn:</b> ${MaMon}</div>
                        <div><b>Tên môn :</b> ${TenMon}</div>
                        <div><b>Phòng:</b> ${Phong}</div>
                        <div><b>Giảng Viên:</b> ${TenGV}</div>
                        <div><b>Nhóm :</b> ${LopSv}</div>
                        <div><b>Ngày học :</b> ${format(new Date(NgayHoc), 'dd/MM/yyyy')}</div>
                        <div><b>Bắt đầu:</b> ${StartTime}</div><div>
                        <b>Kết thúc:</b> ${EndTime}</div>`;
    setTooltipContent(tooltipHtml);
  };

  const handleEventMouseLeave = () => {
    setTooltipContent(null);
  };
  const handleEventClick = (clickInfo) => {
    const { MaMon,TenMon, Phong, TenGV, StartTime, EndTime, NgayHoc, LopSv } = clickInfo.event.extendedProps;
    const detail = {
      MaMon,
      TenMon,
      Phong,
      TenGV,
      NgayHoc: format(new Date(NgayHoc), 'dd/MM/yyyy'),
      StartTime,
      EndTime,
      LopSv
    };
    setEventDetail(detail);
    setModalVisible(true);
  };
  const handEventDiem = ()=>{
      nav('/test')
  }
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
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
          eventClick={handleEventClick} 
          height={600}
          eventContent={renderEventContent}
          slotMinTime="07:00:00" // Giới hạn thời gian bắt đầu từ 7h sáng
          slotMaxTime="19:00:00"
          locale={viLocale}
          dayHeaderFormat={{ weekday: 'short' }}
        />

      )}
      {tooltipContent && (
        <Tooltip id="tooltip" place="top" type="blue" effect="float" html={true}>
          {tooltipContent}
        </Tooltip>
      )}
      {modalVisible && (
        <Modal
          visible={modalVisible}
          title="Thông tin buổi học"
          onCancel={() => setModalVisible(false)}
          footer={null}
          className='title-info'
        >
          <EventDetailForm eventDetail={eventDetail}></EventDetailForm>
         {role ==='Giao vien'&&(<button onClick={handEventDiem}>Dien danh</button>)}
        </Modal>
      )}
    </div>
  );
};

// Hàm render nội dung sự kiện
const renderEventContent = (eventInfo) => {
  const { MaMon,TenMon, Phong, TenGV, StartTime, EndTime, NgayHoc, LopSv } = eventInfo.event.extendedProps;
  return (
    <div
      data-tooltip-id="tooltip"
      data-tooltip-html={`<div><b>Mã Môn:</b> ${MaMon}</div>
                          <div><b>Tên môn:</b> ${TenMon}</div>
                          <div><b>Phòng:</b> ${Phong}</div>
                          <div><b>Giảng Viên:</b> ${TenGV}</div>
                          <div><b>Nhóm :</b> ${LopSv}</div>
                          <div><b>Ngày học :</b> ${NgayHoc}</div>
                          <div><b>Bắt đầu:</b> ${StartTime}</div><div>
                          <b>Kết thúc:</b> ${EndTime}</div>`}
    >
      <b>{eventInfo.timeText}</b>
      <br />
      <i>{eventInfo.event.title.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}</i>
    </div>
  );
};

export default TKB;
