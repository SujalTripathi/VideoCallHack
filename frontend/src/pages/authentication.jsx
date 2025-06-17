import React, { useState, useContext } from "react";
import {
  Avatar, Button, CssBaseline, TextField,
  Paper, Box, Grid, Typography, Snackbar, IconButton
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Authentication() {
  const [formState, setFormState] = useState(0); // 0 = login, 1 = signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const { handleLogin, handleRegister } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
        setMessage("Login successful");
        setOpen(true);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        const msg = await handleRegister(name, username, password);
        setMessage(msg);
        setOpen(true);
        setFormState(0);
      }
      setError("");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        fontFamily: "'Poppins', sans-serif"
      }}>
        <CssBaseline />

        {/* Left side background */}
        <Grid
          item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(4px)',
            }
          }}
        />

        {/* Right side form */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={8}
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            maxWidth: 400,
            width: '100%',
            mx: 'auto'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
                {formState === 0 ? "Welcome Back" : "Create Account"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" mt={1}>
                {formState === 0 ? "Login to continue" : "Sign up to get started"}
              </Typography>
            </Box>

            {/* Form Inputs */}
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {formState === 1 && (
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Typography color="error" align="center" variant="body2" sx={{ mt: -1 }}>
                  {error}
                </Typography>
              )}

              {/* Submit Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
                  }
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Sign Up"}
              </Button>

              {/* Switch Forms */}
              <Button
                variant="text"
                fullWidth
                sx={{ mt: 1, fontWeight: 'bold', color: 'text.secondary' }}
                onClick={() => setFormState(prev => (prev === 0 ? 1 : 0))}
              >
                {formState === 0 ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message || error}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: message ? '#4caf50' : '#f44336',
            fontWeight: 'bold',
            fontSize: '1rem'
          }
        }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </ThemeProvider>
  );
}