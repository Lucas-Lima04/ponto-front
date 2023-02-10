import Login from "./pages/login";
import { PrivateRoute } from "./components/PrivateRoute";
import './App.css';
import { AuthProvider } from "./context/AuthContext";
import { Routes, BrowserRouter, Route, HashRouter } from "react-router-dom";
import GlobalLoadingProvider from "./context/GlobalLoading";
import { ToastContainer } from  'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from "./pages/home";
import Professionals from "./pages/professionals";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ClockIn from "./pages/clockIn";

function App() {

  let theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
          <GlobalLoadingProvider>
            <div className="App">
              <HashRouter>
                <Routes>            
                    <Route path="home" element={<PrivateRoute both superAdmin={true}><Home /></PrivateRoute>} />
                    <Route path="professionals" element={<PrivateRoute both={false} superAdmin={true}><Professionals /></PrivateRoute>} />
                    <Route path="clockins" element={<PrivateRoute both={false} superAdmin={false}><ClockIn /></PrivateRoute>} />
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
              </HashRouter>
            </div>
            <ToastContainer />
          </GlobalLoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
