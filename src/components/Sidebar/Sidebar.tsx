import {JSX, useEffect, useState} from 'react';
import {NotesInterface} from "../../interface/notes.interface";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../db/db";
import ListItem from "../ListItem/ListItem";
import {Box, Button, List, Typography} from "@mui/material";
import SearchBox from "../SearchBox/SearchBox";

const Sidebar = ():JSX.Element => {
  const notes: (NotesInterface | undefined)[] = useLiveQuery(() => db?.table('notes')?.toArray()) ?? [];
  const filteredNotes: NotesInterface[] = notes.filter((note): note is NotesInterface => note !== undefined);
  const [searchNote, setSearchNote] = useState<NotesInterface[] | []>([]);

  useEffect(() => {
    setSearchNote(filteredNotes);
  }, [filteredNotes.length])

  const searching = (name: string): void => {
    if (name.length) {
      setSearchNote(filteredNotes.filter(item => item.name.includes(name)))
    } else {
      setSearchNote(filteredNotes)
    }
  }

  return (
    <Box sx={{
      height: {xs: '70vh', lg: '100vh'},
      borderRight: '1px solid #1976d2',
      position: 'relative',
      overflow: 'auto',
    }}>
      <SearchBox handlerSearch={searching}/>
      {searchNote.length
        ? <List>
            {searchNote.map((note) => (
              <ListItem item={note} key={note.id}/>
            ))}
          </List>
        : <Typography sx={{p:1}} variant="body1">Нет заметок</Typography>
      }
      <Box sx={{
        position: 'sticky',
        width: '100%',
        left: '0',
        bottom: '0',
        zIndex: 10,
        background: '#fff',
        padding: '10px'
      }}>
        <Button sx={{
          display: 'block',
          margin: '0 auto',
          width: '172px'
        }} variant="outlined" href="/add">Создать заметку</Button>
      </Box>
    </Box>
  );
};

export default Sidebar;