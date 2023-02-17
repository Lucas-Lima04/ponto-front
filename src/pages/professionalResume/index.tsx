import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ClockInService } from "../../api/clockIn";
import { useAuth } from "../../context/AuthContext";
import { IClockIn } from "../../models/IClockIn";


function ProfessionalResume() {
  const { user } = useAuth();
  const [lastClockIns, setLastClockIns] = useState<IClockIn[]>([]);
  const [total, setTotal] = useState('0h00');

  const formatDate = (clockIn: IClockIn) => {
    const clockInDate = new Date(clockIn.date + ''); 
    const date = clockInDate.toLocaleDateString();
    const time = `${('0' + clockInDate.getHours()).slice(-2)}:${('0' + clockInDate.getMinutes()).slice(-2)}:${('0' + clockInDate.getSeconds()).slice(-2)}`
    return `${date} ${time}`;
  }

  const fetchLastClockIns = async () => {
      const startDate = new Date();
      const endDate = new Date();

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 9999);
      if (user)
          setLastClockIns(await ClockInService.getAllByDate(startDate, endDate));
  }

  useEffect(() => {
      fetchLastClockIns();
  }, []);

  useEffect(() => {
    let totalMilliseconds = 0;
    let lastClockInTime: Date | undefined;
    const now = new Date();
    now.setSeconds(0,0);
    lastClockIns
      .sort((clockIn1, clockIn2) => new Date(clockIn1.date +'').getTime() - new Date(clockIn2.date + '').getTime())
      .forEach((clockIn, i) => {
        const clockInDate = new Date(clockIn.date);
        if (!clockIn.isIn && i === 0) {
          const midnight = new Date(clockInDate.getFullYear(), clockInDate.getMonth(), clockInDate.getDate(), 0, 0, 0, 0);
          totalMilliseconds += clockInDate.getTime() - midnight.getTime();
        } else if (clockIn.isIn && i === lastClockIns.length - 1){
          totalMilliseconds += (now).getTime() - clockInDate.getTime();
        } else if (lastClockInTime){
          totalMilliseconds += clockInDate.getTime() - lastClockInTime.getTime();
        }

        lastClockInTime = clockInDate;
      });

      const hours = Math.floor(totalMilliseconds / 3600000);
      const minutes = (totalMilliseconds % 3600000)/60000;
      setTotal(`${hours}h${('0' + minutes).slice(-2)}`);
  
  }, [lastClockIns])
  return (
    <>
      <div className="container">
        <Typography variant="body1" component={"p"}>
          Horas totais de hoje
        </Typography>
        <Typography variant="h3" component={"h4"}>
          {total}
        </Typography>
        <br />
        <br />
        <Typography variant="body1" component={"p"}>
          Marcações de hoje
        </Typography>
        <br />
        {lastClockIns
            .sort((clockIn1, clockIn2) => new Date(clockIn2.date +'').getTime() - new Date(clockIn1.date + '').getTime())
            .map(clockIn => {
            return (
                <div className="lastRegisters">
                    {clockIn.isIn ? "Entrada" : "Saída"} - {formatDate(clockIn)}
                </div>
            )
        })}
      </div>
    </>
  );
}

export default ProfessionalResume;
