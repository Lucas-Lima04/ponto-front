import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
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
interface addProfessionalProps {
  open: boolean;
  setOpen: (x: boolean) => void;
  professional?: IUser;
  fetchProfessionals: () => void;
}

export interface addUserData {
  guid?: string;
  name?: string;
  login?: string;
  cpf?: string;
  birthDate?: string;
  ctps?: string;
  register?: string;
  sex?: string;
  password?: string;
}

function AddProfessional({
  open,
  setOpen,
  professional,
  fetchProfessionals,
}: addProfessionalProps) {
  const [editOrAddData, setEditOrAddData] = useState<addUserData>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setEditOrAddData({
      guid: professional?.guid,
      name: professional?.name,
      login: professional?.login,
      sex: professional?.sex || 'M',
      birthDate: professional?.birthDate,
      cpf: professional?.cpf,
      ctps: professional?.ctps,
      register: professional?.register,
      password: undefined,
    });
  }, [professional, open]);

  const handleSubmit = async () => {
    debugger;
    if (editOrAddData?.guid) {
      if (
        editOrAddData &&
        editOrAddData.guid &&
        editOrAddData.name &&
        editOrAddData.login &&
        editOrAddData.birthDate &&
        editOrAddData.cpf &&
        editOrAddData.ctps &&
        editOrAddData.register &&
        editOrAddData.sex
      ) {
        const user = await UserService.updateUser({
          guid: editOrAddData.guid,
          name: editOrAddData.name,
          login: editOrAddData.login,
          birthDate: editOrAddData.birthDate,
          cpf: editOrAddData.cpf,
          ctps: editOrAddData.ctps,
          password: editOrAddData.password,
          register: editOrAddData.register,
          sex: editOrAddData.sex,
        });
        toast.success("Colaborador atualizado com sucesso");
        fetchProfessionals();
        setOpen(false);
      }
    } else {
      if (
        editOrAddData &&
        editOrAddData.name &&
        editOrAddData.login &&
        editOrAddData.birthDate &&
        editOrAddData.cpf &&
        editOrAddData.ctps &&
        editOrAddData.password &&
        editOrAddData.register &&
        editOrAddData.sex
      ) {
        const user = await UserService.createUser({
          name: editOrAddData.name,
          login: editOrAddData.login,
          birthDate: editOrAddData.birthDate,
          cpf: editOrAddData.cpf,
          ctps: editOrAddData.ctps,
          password: editOrAddData.password,
          register: editOrAddData.register,
          sex: editOrAddData.sex,
        });
        toast.success("Colaborador adicionado com sucesso");
        fetchProfessionals();
        setOpen(false);
      }
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEditOrAddData({ ...editOrAddData, [e.target.name]: e.target.value });
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditOrAddData({...editOrAddData, sex: (event.target as HTMLInputElement).value});
  };
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
            {editOrAddData?.guid ? "Editar" : "Adicionar"} Colaborador
          </Typography>
          <br />
          <br />
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Nome"
                variant="outlined"
                value={editOrAddData?.name}
                onChange={(e) => handleChangeInput(e)}
                fullWidth
              />
            </Grid>
            <br />
            <br />
            <Grid item xs={12}>
              <TextField
                id="login"
                name="login"
                label="Login"
                variant="outlined"
                value={editOrAddData?.login}
                onChange={(e) => handleChangeInput(e)}
                fullWidth
              />
            </Grid>
            <br />
            <br />
            <Grid item xs={6}>
              <TextField
                id="cpf"
                name="cpf"
                label="CPF"
                variant="outlined"
                value={editOrAddData?.cpf}
                onChange={(e) => handleChangeInput(e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="birthDate"
                name="birthDate"
                label="Data de Nascimento"
                variant="outlined"
                value={editOrAddData?.birthDate}
                onChange={(e) => handleChangeInput(e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ctps"
                name="ctps"
                label="CTPS"
                variant="outlined"
                value={editOrAddData?.ctps}
                onChange={(e) => handleChangeInput(e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="register"
                name="register"
                label="Matrícula"
                variant="outlined"
                value={editOrAddData?.register}
                onChange={(e) => handleChangeInput(e)}
                fullWidth
              />
            </Grid>
            <br />
            <br />
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Senha"
                variant="outlined"
                value={editOrAddData?.password}
                onChange={(e) => handleChangeInput(e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={editOrAddData?.sex}
                  onChange={handleChangeRadio}
                >
                  <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="F" control={<Radio />} label="Feminino" />
              </RadioGroup>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" color="info" onClick={handleClose}>
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  disabled={
                    !editOrAddData ||
                    !editOrAddData.name ||
                    !editOrAddData.login ||
                    !editOrAddData.birthDate ||
                    !editOrAddData.cpf ||
                    !editOrAddData.ctps ||
                    !editOrAddData.register ||
                    !editOrAddData.sex ||
                    (!editOrAddData.guid && !editOrAddData.password)
                  }
                  onClick={handleSubmit}
                >
                  Salvar
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default AddProfessional;
