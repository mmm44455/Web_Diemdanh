import axios from "axios"
const API_URL = 'http://localhost:8000';
const getListSubject =  async(MaGV,HocKy,Nam,MaLop,MaMon)=>{
    try{
            const response = await axios.get(`${API_URL}/getListSubject/?MaMon=${MaMon}&MaLop=${MaLop}&MaGV=${MaGV}&Nam=${Nam}&HocKy=${HocKy}`)
            return response.data
    }catch(error){
        console.log('Error fetching user info:', error);
    }

}
export default getListSubject