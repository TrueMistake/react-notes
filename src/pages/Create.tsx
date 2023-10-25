import {ChangeEvent, FormEvent, useCallback, useRef} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {AddInterface} from "../interface/add.interface";
import SimpleMdeReact from "react-simplemde-editor";
import {addNotes} from "../api/api";
import {useLocation, useNavigate} from "react-router-dom";

const Create = () => {
  const formRef = useRef<AddInterface>({
    name: '',
    description: '',
    content: '',
    date: new Date()
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from: string = location.state?.from || '/';

  const onChange = useCallback((value: string) => {
    formRef.current = {
      ...formRef.current,
      content: value
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    formRef.current = {
      ...formRef.current,
      [event.target.name]: event.target.value
    }
  }

  const handleSubmit = (event:FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('formRef.current',formRef.current)
    addNotes(formRef.current);
    navigate(from, {
      replace: true
    });
  }

  return (
    <Box sx={{paddingRight: '20px'}}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" sx={{m: 2}}>
          Создать заметку
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Название"
          name="name"
          sx={{marginBottom: 1, width: '100%'}}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Карткое описание"
          name="description"
          sx={{marginBottom: 1, width: '100%'}}
          onChange={handleChange}
        />
        <SimpleMdeReact value={formRef.current.content} onChange={onChange} />
        <Button variant="outlined" sx={{mt: 1, width: '100%', p:1}} type="submit">Сохранить</Button>
      </form>
    </Box>
  );
};

export default Create;