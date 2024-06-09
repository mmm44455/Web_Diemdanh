import axios from "axios"
const API_URL = 'http://localhost:8000';
const getSubject =  async(MaGV,HocKy,Nam)=>{
    try{
            const response = await axios.get(`${API_URL}/getSubject/?MaGV=${MaGV}&HocKy=${HocKy}&Nam=${Nam}`)
            return response.data
    }catch(error){
        console.log('Error fetching user info:', error);
    }

}
export default getSubject