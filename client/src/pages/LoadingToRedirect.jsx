import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./loadingtoredirect.css"
const LoadingToRedirect = () => {
    const [Count,setCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() =>{
        const interval = setInterval(() =>{
            setCount((currentCount) => --currentCount);
        },1000);
        Count === 0 && navigate("/login");
        return () => clearInterval(interval);
    },[Count,navigate]);
  return (
    <div className="redirecting-container">
        <h5>Redirecting you in {Count} seconds</h5>
    </div>
  )
}

export default LoadingToRedirect