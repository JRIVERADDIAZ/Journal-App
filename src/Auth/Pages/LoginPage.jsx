import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { Google, GitHub } from '@mui/icons-material'
import { useForm } from '../../Hooks'
import AuthLayout from '../Layout/AuthLayout'
import { startGoogleSignIn, startLoginUserWithEmailAndPassword } from '../../Store/Auth'

const FormData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm(FormData)

  const isAutenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault()
    console.log({ email, password })
    dispatch(startLoginUserWithEmailAndPassword({ email, password }))
  }

  const onGoogleLogin = () => {
    console.log('onGoogleSign');
    dispatch(startGoogleSignIn())
  }

  const onGithubLogin = () => {
    console.log('onGithubSign');
    dispatch()
  }

  return (

    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='E-mail'
              type='Email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              onChange={onInputChange}
              value={email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Password'
              type='Password'
              placeholder='Password'
              fullWidth
              name='password'
              onChange={onInputChange}
              value={password}
            />
          </Grid>

          <Grid
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1 }}
          >
            <Grid
              item
              xs={12}
            >
              <Alert severity='error' >{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sm={6} >
              <Button disabled={isAutenticating} type="submit" variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} >

              <Button disabled={isAutenticating} variant='contained' onClick={onGoogleLogin}>
                <Google />
                <Typography sx={{ ml: 1 }} >
                  Google
                </Typography>
              </Button>

              <Button disabled={isAutenticating} variant='contained' >
                <GitHub />
                <Typography sx={{ ml: 1 }} >
                  GitHub
                </Typography>
              </Button>

            </Grid>

          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register' >
              Create account
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>
  )
}
