import {JSX} from 'react';
import {NotesInterface} from "../../interface/notes.interface";
import {Link, useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import './ListItem.css'
import {millisecondsInDate} from "../../helper/date";

interface ListItemProps {
  item: NotesInterface;
}

const ListItem = ({item}: ListItemProps):JSX.Element => {
  const params = useParams();
  return (
    <Link to={`/${item.id}`} className={`listItem ${Number(params.id) === item.id ? 'active' : ''}`}>
      <Typography variant="body1">{item.name}</Typography>
      <Typography variant="caption">{item.description}</Typography>
      <Typography variant="caption" display="block">{millisecondsInDate(item.date)}</Typography>
    </Link>
  );
};

export default ListItem;