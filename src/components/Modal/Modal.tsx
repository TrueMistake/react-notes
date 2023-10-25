import {useState} from 'react';
import {Box, Modal} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalPopup = ({children}: { children: React.ReactNode }):JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = ():void => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 200 }}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalPopup;