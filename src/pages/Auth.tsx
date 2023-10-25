import {ChangeEvent, FormEvent, JSX, useRef} from 'react';
import {Button, OutlinedInput, TextField, Typography} from "@mui/material";
import {useAuth} from "../context/AuthProvider";
import {Navigate, useNavigate, useLocation} from "react-router-dom";
import {UserInterface} from "../interface/auth.interface";

const Auth = ():JSX.Element => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<UserInterface>({
    login: '',
    password: ''
  });

  const from: string = location.state?.from || '/';

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    formRef.current = {
      ...formRef.current,
      [event.target.name]: event.target.value
    }
  }

  const handleSubmit = (event:FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    auth?.signIn(formRef.current, () => {
      navigate(from, {
        replace: true
      });
    })
  }

  if (auth?.user === null) {
    return (
      <form style={{display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '500px',
        margin: '0 auto'}} onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" sx={{m: 2}}>
          Авторизация
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Логин"
          name="login"
          sx={{m: 1, width: '100%'}}
          onChange={handleChange}
        />
        <OutlinedInput
          id="outlined-password"
          type="password"
          label="Пароль"
          name="password"
          sx={{m: 1, width: '100%'}}
          onChange={handleChange}
        />
        <Button variant="outlined" sx={{m: 1, width: '100%'}} type="submit" >Войти</Button>
      </form>
    );
  }

  return (
    <Navigate to="/" state={{from: location.pathname}} replace />
  );
};

export default Auth;