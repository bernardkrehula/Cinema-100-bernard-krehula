import { useNavigate } from "react-router-dom";

export const useSession = () => {
    const navigate = useNavigate();

    const hanldeSession = () => {
      const token = localStorage.getItem('token');
      if(!token) navigate('/login');
      else navigate('/homepage');
    }
    const clearToken = () => {
      localStorage.removeItem('token');
    }
     
      return { hanldeSession, clearToken };
}