import {JSX, Suspense} from 'react';
import {Box, Grid} from "@mui/material";
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import EditContext from '../context/EditProvider';

const Layout = ():JSX.Element => {
  return (
    <EditContext>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} columns={{ xs: 1, lg: 12 }}>
          <Grid item xs={1} lg={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={1} lg={9}>
            <Suspense fallback={"Загрузка..."}>
              <Outlet />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </EditContext>
  );
};

export default Layout;