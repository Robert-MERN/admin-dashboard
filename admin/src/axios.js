import axios from "axios";
import { useStateContext } from "./contexts/ContextProvider";

const Request = ()=>{
    const URL = "https://axen-dashboard.herokuapp.com/api/"
    const { user }  = useStateContext();
    const Axios = axios.create({
        baseURL: URL,
        headers: {
           token: `Bearer ${user?.token || "" }` 
        }
    });
    return Axios
}

export default Request;