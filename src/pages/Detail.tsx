import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {db} from "../db/db";
import {NotesInterface} from "../interface/notes.interface";
import { marked } from 'marked';
import {Box, Button, Modal, Typography} from "@mui/material";
import Parser from 'html-react-parser';
import {useEdit} from "../context/EditProvider";
import {millisecondsInDate} from "../helper/date";

marked.use({
  async: false,
  breaks: false,
  gfm: true,
  pedantic: false,
  silent: false,
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  pt: 2,
  px: 4,
  pb: 3,
};

const Detail = ():JSX.Element => {
  const {id} = useParams();
  const [detail, setDetail] = useState<NotesInterface | undefined>();
  const navigate = useNavigate();
  const edit = useEdit();

  useEffect(() => {
    const fetchData = async ():Promise<any> => {
      const detailNotes: NotesInterface | undefined = (await db.table('notes')
        .where({ id: Number(id) })
        .first()) as NotesInterface | undefined;
      setDetail(detailNotes);
    }
    fetchData();
  }, [id]);



  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const removeNotes = (id: any) => {
    removeNotes(Number(id));
    handleClose();
    navigate('/');
  }

  return (
    <Box sx={{
      position: 'relative',
      height: '100vh',
      padding: {xs: '0 20px 0 20px', lg: '0 20px 0 0'}
    }}>
      {detail ?
        <>
          <Typography variant="h1" gutterBottom>{detail.name}</Typography>
          <Typography variant="caption" display="block" gutterBottom>{millisecondsInDate(detail.date)}</Typography>
          <div>{Parser(marked.parse(detail.content))}</div>
          <Box
            sx={{
            '&': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50px',
              width: '100%',
              position: {xs: 'fixed', lg:'absolute'},
              left: '50%',
              bottom: {xs: '0',lg: '10px'},
              background: '#fff',
              gap: '20px',
              transform: 'translateX(-50%)'
            },
            '& button':{
              color: '#000'
            }
          }}>
            <Button variant="outlined" onClick={() => edit?.handleEditNote()}>Редактировать</Button>
            <Button variant="outlined" onClick={handleOpen}>Удалить</Button>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="child-modal-title">Вы хотите удалить заметку?</h2>
              <Button onClick={() => removeNotes(id)}>Да</Button>
              <Button onClick={handleClose}>Нет</Button>
            </Box>
          </Modal>

        </>
        : <Typography variant="body1" gutterBottom>Нет такой заметки</Typography>
      }
    </Box>
  );
};

export default Detail;