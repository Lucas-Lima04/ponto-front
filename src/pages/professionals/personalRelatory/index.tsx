import { Box, Button, Modal, TextField, TextFieldProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { IUser } from "../../../models/IUser";
import { UserService } from "../../../api/user";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { ClockInService } from "../../../api/clockIn";
import doPersonalRelatory from "../../../relatory";
import writeXlsxFile from "write-excel-file";

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
interface personalRelatoryProps {
  open: boolean;
  setOpen: (x: boolean) => void;
  professional?: IUser;
}

function PersonalRelatory({
  open,
  setOpen,
  professional,
}: personalRelatoryProps) {
  const [value, setValue] = useState<string | undefined>((new Date().getUTCFullYear()) + '-' + ('0' + ((new Date()).getMonth() + 1).toString()).slice(-2));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (professional?.guid && value) {
      const startDate = new Date(parseInt(value.split('-')[0]), parseInt(value?.split('-')[1]) - 1, 1)
      const endDate = new Date(parseInt(value.split('-')[0]), parseInt(value?.split('-')[1]), 0)
      const clockIns = (await ClockInService.getByDate(professional.guid, startDate, endDate))
        .sort((clockIn1, clockIn2) => new Date(clockIn1.date +'').getTime() - new Date(clockIn2.date + '').getTime());
        
      await writeXlsxFile(doPersonalRelatory(professional, clockIns, endDate), {
        fileName: professional.name + '-' + startDate.toLocaleString('default', { month: 'long' }) + '.xlsx',
      })
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
            Relatório Individual
          </Typography>
          <br />
          <Typography id="modal-modal-title" variant="body1" component="p">
            Selecione o mês para gerar o relatório.
          </Typography>
          <br />
          <TextField
            type={"month"} 
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setValue(e.target.value || undefined);
              console.log(e.target.value);
              
            }}/>
          <br />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="info" onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Gerar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default PersonalRelatory;
