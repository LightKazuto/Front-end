"use client";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface IFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        await Promise.all([
          localStorage.setItem('token', 'authenticated'),
          localStorage.setItem('userRole', result.role)
        ]);

        const storedRole = await localStorage.getItem('userRole');
        if (storedRole === result.role) {
          setSubmitSuccess(true);
          await router.push('/');
          return result;
        } else {
          setSubmitError("Failed to store user role in local storage.");
        }
      } else {
        const error = await response.json();
        setSubmitError(error.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setSubmitError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        mt: 5,
        mb: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container component={Paper} elevation={6}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '90%', maxHeight: 'auto', position: 'relative' }}>
            <img
              src="https://img.freepik.com/free-vector/happy-farmers-selling-fresh-vegetables_74855-10754.jpg?t=st=1722830501~exp=1722834101~hmac=e7a4a79ff094d5f8d8fc87c4301ad9eafa96d8c67ffe5214226f266c9a10ceb1&w=740"
              alt="Login"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                clipPath: 'path("M0,40 Q40,0 80,40 T160,40 Q120,80 80,40 T0,40 Z")',
              }}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ mb: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="email"
                control={control}
                rules={{ 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoFocus
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={
                  <Typography variant="body2" color="textSecondary">
                    Remember me
                  </Typography>
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
              </Button>
              <Snackbar 
                open={submitSuccess} 
                autoHideDuration={3000} 
                onClose={() => setSubmitSuccess(false)}
              >
                <Alert onClose={() => setSubmitSuccess(false)} severity="success" sx={{ width: '100%' }}>
                  Login successful!
                </Alert>
              </Snackbar>
              <Snackbar 
                open={!!submitError} 
                autoHideDuration={3000} 
                onClose={() => setSubmitError('')}
              >
                <Alert onClose={() => setSubmitError('')} severity="error" sx={{ width: '100%' }}>
                  {submitError}
                </Alert>
              </Snackbar>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
