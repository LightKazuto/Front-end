import React from 'react';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


const DynamicRegisterForm = dynamic(() => import('./RegisterForm'), {
  ssr: false,
  loading: () => <p>Loading form...</p>
})

const RegisterPage: React.FC = () => {
  const router = useRouter()

  return (
    <Container component="main"
        maxWidth="md"
        sx={{
          mt: 5,
          mb: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
      <Grid container component={Paper} elevation={6}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
        >
          <DynamicRegisterForm router={router} />
        </Grid>
        <Grid 
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: '90%', maxHeight: 'auto' }}>
          <img 
            src="https://img.freepik.com/free-vector/vegetable-seller-concept-illustration_114360-13388.jpg?t=st=1722948115~exp=1722951715~hmac=347ca082475cb9aa3ee622b6484d9f3c0f362d2ad0a9baa410c5954898203193&w=740" 
            alt="Description" 
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
          />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;