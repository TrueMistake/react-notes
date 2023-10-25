import {JSX, useCallback, useEffect, useState} from 'react';
import SimpleMdeReact from "react-simplemde-editor";
import {NotesInterface} from "../../interface/notes.interface";
import {db} from "../../db/db";
import "easymde/dist/easymde.min.css";
import {useEdit} from "../../context/EditProvider";
import {updateNotes} from "../../api/api";

interface WorkspaceProps {
  idx: string | null;
}

const Workspace = ({idx}: WorkspaceProps):JSX.Element => {
  const edit = useEdit();
  const [editContent, setEditContent] = useState<NotesInterface | null>(null);

  useEffect(() => {
    const fetchData = async ():Promise<void> => {
      const detailNotes: NotesInterface | null = (await db.table('notes')
        .where({ id: Number(idx) })
        .first()) as NotesInterface | null;
      setEditContent(detailNotes);
    }
    fetchData();
  }, [idx]);


  const onChange = useCallback((value: string) => {
    setEditContent((prevEdit) => {
      if (prevEdit) {
        return { ...prevEdit, content: value };
      }
      return null;
    });

  }, []);

  useEffect(() => {
    const time = setInterval(() => {
      if (editContent?.content) {
        updateNotes(Number(idx), editContent?.content);
        edit?.handleCloseEditNote();
      }
    }, 5000);

    return () => clearInterval(time);
  }, [editContent?.content])


  return <SimpleMdeReact value={editContent?.content} onChange={onChange} />;
};

export default Workspace;