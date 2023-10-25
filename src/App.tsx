import {Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import AuthProvider from "./context/AuthProvider";
import NotFound from "./pages/NotFound";
import './App.css'
import Main from "./pages/Main";
import {JSX} from "react";
import PrivateRouter from "./components/PrivateRoute/PrivateRouter";
import Layout from "./Layout/Layout";
import LayoutDetail from "./Layout/LayoutDetail";
import Create from "./pages/Create";

function App():JSX.Element {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route element={<Layout />}>
            <Route path="/" element={<PrivateRouter><Main/></PrivateRouter>} />
            <Route path="/:id" element={<PrivateRouter><LayoutDetail/></PrivateRouter>} />
            <Route path="/add" element={<PrivateRouter><Create/></PrivateRouter>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
