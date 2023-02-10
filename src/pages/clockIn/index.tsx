import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClockInService } from "../../api/clockIn";
import { IClockIn } from "../../models/IClockIn";
import "./style.css";

function ClockIn() {
    const [date, setDate] = useState(new Date());
    const [recentClockIns, setRecentClockIns] = useState<IClockIn[]>([]);
    const [lastClockIns, setLastClockIns] = useState<IClockIn[]>([]);
    const refreshClock = () => {
        setDate(new Date());
    }

    const fetchLastClockIns = async () => {
        setLastClockIns((await ClockInService.getAll()))
    }

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        fetchLastClockIns();
      }, []);

    const handleSubmit = async () => {
        const clockIn = await ClockInService.createClockIn();
        setRecentClockIns([clockIn, ...recentClockIns]);
        toast.success("Marcação efetuada com sucesso");
    }

    const formatDate = (clockIn: IClockIn) => {
        const clockInDate = new Date(clockIn.date + ''); 
        const date = clockInDate.toLocaleDateString();
        const time = `${('0' + clockInDate.getHours()).slice(-2)}:${('0' + clockInDate.getMinutes()).slice(-2)}:${('0' + clockInDate.getSeconds()).slice(-2)}`
        return `${date} ${time}`;
    }
    return (
        <>
            <div className="container">
                <div className="title">
                    <Typography variant="h5">
                        Marcação
                    </Typography>
                </div>
                <div className="content">
                    <br />
                    <br />
                    <Typography variant="h3" align="center">
                        {('0' + date.getHours()).slice(-2)}:{('0' + date.getMinutes()).slice(-2)}:{('0' + date.getSeconds()).slice(-2)}
                    </Typography>
                    <br />
                    <Button variant="contained" onClick={handleSubmit}>Marcar Ponto</Button>
                    <br />
                    <br />
                    {recentClockIns.map(clockIn => {
                        
                        return(
                            <div className="registered">
                                <b>{clockIn.isIn ? "Entrada" : "Saída"} {formatDate(clockIn)}</b> - Marcação efetuada com sucesso
                            </div>
                        )
                    })}
                    <br />
                    <Typography variant="body1" align="left">
                        <b>Últimos pontos</b>
                    </Typography>
                    {lastClockIns
                        .sort((clockIn1, clockIn2) => new Date(clockIn2.date +'').getTime() - new Date(clockIn1.date + '').getTime())
                        .slice(0, 4)
                        .map(clockIn => {
                        return (
                            <div className="lastRegisters">
                                {clockIn.isIn ? "Entrada" : "Saída"} - {formatDate(clockIn)}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ClockIn;