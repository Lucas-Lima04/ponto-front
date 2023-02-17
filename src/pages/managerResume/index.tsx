import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ClockInService } from "../../api/clockIn";
import { UserService } from "../../api/user";
import { useAuth } from "../../context/AuthContext";
import { IClockIn } from "../../models/IClockIn";
import { IUser } from "../../models/IUser";


function ManagerResume() {
  const [activeUsers, setActiveUsers] = useState<IUser[]>([]);

  const fetchActiveUsers = async () => {
    setActiveUsers(await UserService.getAllActive())
  }
  useEffect(() => {
      fetchActiveUsers();
  }, []);

  return (
    <>
      <div className="container" style={{textAlign: "left"}}>
        <Typography variant="h4" component={"p"}>
          Olá, Gestor
        </Typography>
        <br />
        <br />
        <Typography variant="body1" component={"p"}>
          <b>Colaboradores em serviço:</b>
        </Typography>
        <br />

        {activeUsers.map(user => {
          return (
            <div className="lastRegisters">
              <Typography variant="body2" component={"p"}>
                {user.name}
              </Typography>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default ManagerResume;
