import { Box, Button, Modal, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { IUser } from "../../../models/IUser";
import { UserService } from "../../../api/user";
import { toast } from "react-toastify";
import { IClockIn } from "../../../models/IClockIn";
import { ClockInService } from "../../../api/clockIn";

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
interface professionalHistoryProps {
  open: boolean;
  setOpen: (x: boolean) => void;
  professional?: IUser;
}

function ProfessionalHistory({
  open,
  setOpen,
  professional,
}: professionalHistoryProps) {
  const [clockIns, setClockIns] = useState<IClockIn[]>([]);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchLastClockIns = async () => {
    setClockIns(
      (await ClockInService.getAll(professional?.guid))
      .sort((clockIn1, clockIn2) => 
        new Date(clockIn2.date +'').getTime() - new Date(clockIn1.date + '').getTime()));
  };

  useEffect(() => {
    fetchLastClockIns();
  }, [professional]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatDate = (clockIn: IClockIn) => {
    const clockInDate = new Date(clockIn.date + "");
    const date = clockInDate.toLocaleDateString();
    const time = `${("0" + clockInDate.getHours()).slice(-2)}:${(
      "0" + clockInDate.getMinutes()
    ).slice(-2)}:${("0" + clockInDate.getSeconds()).slice(-2)}`;
    return `${date} ${time}`;
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
            Histórico
          </Typography>
          <br />
          <br />
          {clockIns.slice((page - 1)*12, page * 12).map((clockIn, i) => {
            return <div key={i} className="lastRegisters">{clockIn.isIn ? "Entrada" : "Saída"} - {formatDate(clockIn)}</div>;
          })}
          <br />
          <div style={{display: "flex", justifyContent: "center"}}>
          <Pagination count={Math.ceil(clockIns.length / 12)} page={page} onChange={handleChange} />
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ProfessionalHistory;
