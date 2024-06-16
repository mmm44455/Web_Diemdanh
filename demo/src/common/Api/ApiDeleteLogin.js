import axios from "axios";
const API_URL = 'http://localhost:8000'; 
const delteLogin = async (username)=>{
    try{
        const response = await axios.delete(`${API_URL}/deleteLogin?username=${username}`)
        return response.data
    }catch(error){
        console.log(error);
    }
}
export default delteLogin