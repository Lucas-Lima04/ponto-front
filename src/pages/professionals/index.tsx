import { Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserService } from "../../api/user";
import { IUser } from "../../models/IUser";
import { Add } from '@mui/icons-material';
import AddProfessional from "./add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ProfessionalHistory from "./history";
import DeleteProfessional from "./delete";
import SearchIcon from '@mui/icons-material/Search';
import PersonalRelatory from "./personalRelatory";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CompleteRelatory from "./completeRelatory";

function Professionals() {
    const [professionals, setProfessionals] = useState<IUser[]>([]);
    const [open, setOpen] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openPersonalRelatory, setOpenPersonalRelatory] = useState(false);
    const [openCompleteRelatory, setOpenCompleteRelatory] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser>()
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState<string>();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    const fetchUsers = async () => {
        setProfessionals(await UserService.getAll());
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className="container">
                <div className="title" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h5">
                        Colaboradores
                    </Typography>
                    <div>
                    <Button variant="contained" color="success" style={{marginRight: '1rem'}} onClick={() => {
                        setSelectedUser(undefined);
                        setOpenCompleteRelatory(true)
                        }}><InsertDriveFileIcon /> Relatório</Button>
                    <Button variant="contained" onClick={() => {
                        setSelectedUser(undefined);
                        setOpen(true)
                        }}><Add /> Colaborador</Button>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "end"}}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <OutlinedInput
                            value={search}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setSearch(event.target.value);
                              }}
                            size="small"
                            id="outlined-adornment-weight"
                            endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'buscar',
                            }}
                        />
                    </FormControl>
                </div>
                <br />
                <div className="content">
                    <table>
                        <thead>
                            <th>NOME</th>
                            <th>EMAIL</th>
                            <th>CPF</th>
                            <th>STATUS</th>
                            <th style={{textAlign: "center"}}>HISTÓRICO</th>
                            <th style={{width: "200px"}}>AÇÕES</th>
                        </thead>
                        <tbody>
                            {professionals.filter((p) => search ? p.name.toLowerCase().search(search.toLowerCase()) >= 0 : true).slice((page - 1)*12, page * 12).map((professional, i) => {
                                return (
                                    <tr key={i}>
                                        <td><b>{professional.name}</b></td>
                                        <td>{professional.login}</td>
                                        <td>{professional.cpf}</td>
                                        <td>{professional.isActive ? "Ativo" : "Inativo"}</td>
                                        <td style={{textAlign: "center"}}>
                                            <Button variant="contained" color="info" size="small" onClick={() => {
                                                setSelectedUser(professional);
                                                setOpenHistory(true);
                                            }}><AccessTimeIcon /></Button>
                                            <Button variant="contained" color="success" size="small" style={{marginLeft: "1rem"}} onClick={() => {
                                                setSelectedUser(professional);
                                                setOpenPersonalRelatory(true);
                                            }}><InsertDriveFileIcon /></Button>
                                        </td>
                                        <td>
                                            <Button variant="contained" size="small" color="primary" style={{marginRight: "1rem"}} 
                                            onClick={() => {
                                                setSelectedUser(professional);
                                                setOpen(true);
                                            }}><EditIcon /></Button>
                                            <Button variant="outlined" color="error" size="small" onClick={() => {                                                
                                                setSelectedUser(professional);
                                                setOpenDelete(true);
                                            }}><DeleteIcon /></Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br />
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Pagination count={Math.ceil(professionals.filter((p) => search ? p.name.toLowerCase().search(search.toLowerCase()) >= 0 : true).length / 12)} page={page} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <AddProfessional open={open} setOpen={setOpen} fetchProfessionals={fetchUsers} professional={selectedUser}/>
            <ProfessionalHistory open={openHistory} setOpen={setOpenHistory} professional={selectedUser}/>
            <DeleteProfessional open={openDelete} setOpen={setOpenDelete} professional={selectedUser} fetchProfessionals={fetchUsers}/>
            <PersonalRelatory open={openPersonalRelatory} setOpen={setOpenPersonalRelatory} professional={selectedUser} />
            <CompleteRelatory open={openCompleteRelatory} setOpen={setOpenCompleteRelatory} professionals={professionals} />
        </>
    )
}

export default Professionals;