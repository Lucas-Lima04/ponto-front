import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { IUser } from "../../../models/IUser";
import { UserService } from "../../../api/user";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "1rem",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};
interface deleteProfessionalProps {
  open: boolean;
  setOpen: (x: boolean) => void;
  professional?: IUser;
  fetchProfessionals: () => void;
}

function DeleteProfessional({
  open,
  setOpen,
  professional,
  fetchProfessionals
}: deleteProfessionalProps) {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (professional?.guid) {
      const user = await UserService.deleteUser(professional.guid);
      toast.success("Colaborador excluído com sucesso");
      fetchProfessionals();
      setOpen(false);    
    };
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Excluir Colaborador
          </Typography>
          <br />
          <Typography id="modal-modal-title" variant="body1" component="p">
            Você tem certeza que deseja excluir este colaborador?
          </Typography>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="info" onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={handleSubmit}>Excluir</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default DeleteProfessional;
