import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import SearchPokemon from '../data/SearchPokemon';


const theme = createTheme();

export default function SignInSide() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async(e) => {

        e.prevent.default();
        const user = {email, password}
        const answer = await Axios.post('/user/login', user);
        console.log(answer)
        const msg = answer.data.msg

        if (msg!=='Bienvenido') {
            Swal.fire({
                icon: 'error',
                title: msg,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            const token = answer.data.token
            const name = answer.data.name
            const id = answer.data.id

            sessionStorage.setItem('token', token)
            sessionStorage.setItem('name', name)
            sessionStorage.setItem('id', id)

            Swal.fire({
                icon: 'success',
                title: msg,
                showConfirmButton: false,
                timer: 1500
            })
            window.location.href='/index'
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>

            <CssBaseline />
                <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}                 
                > 
                    <SearchPokemon/>
                </Grid>

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Inicia Sesión
                        </Typography>
                        <Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo Electrónico"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange = {(e)=> setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange = {(e)=> setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Recuérdame"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >Iniciar Sesión
                            </Button>
                            <Grid container>
                                <Grid item>
                                <Link href="#" variant="body2">
                                    {"No tienes una cuenta? Regístrate"}
                                </Link>
                                </Grid>
                            </Grid>                        
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            </ThemeProvider>
        );
}