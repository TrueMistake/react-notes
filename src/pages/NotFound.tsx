import {JSX, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

const NotFound = ():JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', {
        state: location.pathname
      })
    }, 1000)
  },[])

  return (<h1>Not Found</h1>);
};

export default NotFound;