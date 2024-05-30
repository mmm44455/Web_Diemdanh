import './sytle.css'
const Card = ({MaSV,name,date,gioitinh,img})=>{
    return(
        <div className="card">
        <div className="image-container">
        <img src={img} className='Face' alt='Hình ảnh của bạn'></img>
    </div>
            <h4>Mã số sinh viên : {MaSV}</h4>
            <p>Tên sinh viên :{name}</p>
            <p>Giới tính : {gioitinh}</p>
            <p>Ngày sinh : {date}</p>
        </div>
    )
}
export default Card