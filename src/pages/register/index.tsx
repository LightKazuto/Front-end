import React from 'react';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
  CssBaseline,
  Paper,
  Container,
  Grid
} from "@mui/material";
import SignUpImg from "../../assets/images/signup_img.jpg";


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
            src={SignUpImg.src} 
            alt="Description" 
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
          />
            <div style={{ textAlign: 'right' }}>
              <a href="https://www.freepik.com/free-vector/vegetable-seller-concept-illustration_34719705.htm#fromView=search&page=1&position=37&uuid=3a80ea3c-3ac0-4ad6-8351-04d5ce7c8ae5">Image by storyset on Freepik</a>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;