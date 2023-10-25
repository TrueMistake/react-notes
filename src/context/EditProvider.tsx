import React, { createContext, useContext, useState } from 'react';

interface EditContextType {
  handleEditNote: () => void;
  handleCloseEditNote: () => void;
  editNote: boolean;
}
const EditContext = createContext<EditContextType | null>(null);

export function useEdit(): EditContextType | null {
  return useContext(EditContext);
}

const EditProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [editNote, setEditNote] = useState<boolean>(false);

  const handleEditNote = () => {
    setEditNote(true);
  }
  const handleCloseEditNote = () => {
    setEditNote(false);
  }

  const val = {
    handleEditNote,
    handleCloseEditNote,
    editNote
  }

  return (
    <EditContext.Provider value={val}>
      {children}
    </EditContext.Provider>
  );
};

export default EditProvider;