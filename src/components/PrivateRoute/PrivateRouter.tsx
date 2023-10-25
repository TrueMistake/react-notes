import {ReactNode} from 'react';
import {useAuth} from "../../context/AuthProvider";
import {Navigate, useLocation} from "react-router-dom";

const PrivateRouter = ({ children }: { children: ReactNode }): JSX.Element | null => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth || auth.user === null) {
    return <Navigate to="/auth" state={{from: location.pathname}} replace />
  }

  return children as JSX.Element | null;
};

export default PrivateRouter;