import { useAuth } from "../../context/AuthContext";
import ManagerResume from "../managerResume";
import ProfessionalResume from "../professionalResume";
import "./style.css";

function Home() {
    const { isSuperAdmin } = useAuth();

    return (
        <>
        {isSuperAdmin ?
        <ManagerResume /> :
        <ProfessionalResume />}
        </>
    )
}

export default Home;