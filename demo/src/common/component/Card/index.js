import './sytle.css'
import { format } from 'date-fns';
const CardStudent = ({nameGV,Class,name,date,gioitinh,img})=>{
    const yourDate = new Date(date); 
    const formattedDate = format(yourDate, 'dd/MM/yyyy');
    return(
        <div className='card_face'>
            <div className='Face'>
                <img src={img}  alt='Hình ảnh của bạn'></img>
            </div>
            
        <div className="image-container">
             <p>Tên sinh viên : {name}</p>
            <p>Giới tính : {gioitinh}</p>
            <p>Ngày sinh : {formattedDate}</p>
            <p>Lớp sinh viên : {Class}</p>
            <p>Chủ nhiệm : {nameGV}</p>
        </div>
        </div>
        
        
       
    )
}
export default CardStudent