import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';
import getUserInfo from '../../common/Api/ApiTkb';
import './sytle.css'
const TKB = () => {
  const [events, setEvents] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchTKBData = async () => {
      try {
        const data = await getUserInfo(username);
        setEvents(data.map(event => ({
          id: event.MaMon,
          title: `Công nghệ phần mềm (${event.MaMon})\nPhòng: ${event.Phong}\nGV: ${event.TenGV}`,
          start: `${event.NgayHoc}T${event.StartTime}:00`,
          end: `${event.NgayHoc}T${event.EndTime}:00`,
        })));
      } catch (error) {
        console.error('Error fetching TKB data:', error);
      }
    };
    fetchTKBData();
  }, [username]);

  // Thiết lập ngôn ngữ của moment là tiếng Việt
 

  return (
    <div>
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
        height={600}
        eventContent={renderEventContent}
        slotMinTime="07:00:00" // Giới hạn thời gian bắt đầu từ 7h sáng
        slotMaxTime="19:00:00"
        locale={viLocale} 
        dayHeaderFormat={{ weekday: 'short' }}
      />
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
