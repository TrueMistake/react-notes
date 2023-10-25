import {Typography} from "@mui/material";

const Main = () => {
  return (
    <Typography
      sx={{
        fontSize: {xs: '1.4rem', lg: '6rem'}
      }}
      variant="h1"
      gutterBottom
    >
      Заметки
    </Typography>
  );
};

export default Main;