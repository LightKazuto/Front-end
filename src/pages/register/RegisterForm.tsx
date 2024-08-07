import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/icons-material/Badge';
import CheckBox from '@mui/icons-material/CheckBox';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Select from "@mui/material/Select";
  

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface IFormInputs {
    username: string;
    email: string;
    role: string;
    password: string;
    termsAccepted: boolean;
}

const RegisterForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      email: '',
      role: '',
      password: '',
      termsAccepted: false,
    },
  });

  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('role', data.role);
    formData.append('password', data.password);

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Form submitted successfully', data);
        setSubmitSuccess(true);
        router.push('/login')
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
      
  };


  return (
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
            Sign Up
        </Typography>
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
            >
            <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                <TextField
                    {...field}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    size="small"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                    }}
                />
                )}
            />
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
                name="role"
                control={control}
                rules={{ required: 'Role is required' }}
                render={({ field }) => (
                <FormControl
                    variant="standard"
                    fullWidth
                    required
                    sx={{ mt: 1, minWidth: 120 }}
                    size="small"
                    error={!!errors.role}
                >
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                    {...field}
                    labelId="role-label"
                    id="role"
                    label="Role"
                    startAdornment={
                        <InputAdornment position="start">
                            <Badge />
                        </InputAdornment>
                    }
                    >
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                    </Select>
                    {errors.role && (
                    <Typography variant="caption" color="error">
                        {errors.role.message}
                    </Typography>
                    )}
                </FormControl>
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
            <Controller
                name="termsAccepted"
                control={control}
                rules={{ required: 'You must accept the terms and conditions' }}
                render={({ field }) => (
                <FormControlLabel
                    control={
                    <Checkbox 
                        {...field} 
                        color="primary" 
                        icon={<CheckBox />}
                        checkedIcon={<CheckBox />}
                    />
                    }
                    label={
                    <Typography variant="body2" color="textSecondary">
                        I agree to the terms and conditions
                    </Typography>
                    }
                />
                )}
            />
            {errors.termsAccepted && (
                <Typography variant="caption" color="error">
                {errors.termsAccepted.message}
                </Typography>
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
            </Button>
            <Snackbar 
                open={submitSuccess} 
                autoHideDuration={6000} 
                onClose={() => setSubmitSuccess(false)}
            >
                <Alert onClose={() => setSubmitSuccess(false)} severity="success" sx={{ width: '100%' }}>
                Registration successful!
                </Alert>
            </Snackbar>
            <Snackbar 
                open={!!submitError} 
                autoHideDuration={6000} 
                onClose={() => setSubmitError('')}
            >
                <Alert onClose={() => setSubmitError('')} severity="error" sx={{ width: '100%' }}>
                {submitError}
                </Alert>
            </Snackbar>
            <Grid container>
                <Grid item>
                <Link href='/login' variant="body2">
                    {"Already have an account? Login"}
                </Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
  );
}

export default RegisterForm;