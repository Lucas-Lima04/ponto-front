import "./style.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [page, setPage] = useState(1);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const auth = useAuth();

  const validateEmail = (emailString: string) =>
    String(emailString)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const disableSubmit = () => !(validateEmail(email) && password);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setIsLoading(true);
      setShowError(false);
      const data = new FormData(e.currentTarget);
      const email  = data.get('email');
      const password = data.get('password');
      if (email && password && typeof email === 'string' && typeof password === 'string') {
        const { user } = await auth.login(email, password);
        navigate("/home");
      }
    } catch (error) {
      setIsLoading(false);
      setShowError(true);
      if (!(typeof error === "string")) {
        throw error;
      }
      setIsLoading(false);

      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="login">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img className="logo" src="/logo-ponto.png" alt="logo" />
          <Typography component="h1" variant="h5">
            Controle de Ponto
          </Typography>
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Login"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
