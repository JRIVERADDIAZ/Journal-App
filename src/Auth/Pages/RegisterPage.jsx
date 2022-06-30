import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { startCreatingWithEmailAndPassword } from '../../Store/Auth'

import AuthLayout from '../Layout/AuthLayout'
import { useForm } from '../../Hooks/UseForm'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'the email should be contain @'],
  password: [(value) => value.length >= 6, 'the passsword should be longer than 6 characters'],
  displayName: [(value) => value.length >= 1, ' the name is required']
}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const [formSubmitted, setformSubmitted] = useState(false)

  const { status, errorMessage } = useSelector(state => state.auth)

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true)

    if (!isFormValid) return

    dispatch(startCreatingWithEmailAndPassword(formState))
  }

  return (
    <AuthLayout title="Register">
      {/* <h1> FormValid { isFormValid ? 'Valid' : 'Invalid' }</h1> */}
      <form onSubmit={onSubmit} >

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Complete Name'
              type='Text'
              placeholder='John Doe'
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='E-mail'
              type='Email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Password'
              type='Password'
              placeholder='Password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid 
            item 
            xs={12}
            display={ !!errorMessage ? '' : 'none' }
            >
              <Alert severity='error'> {errorMessage} </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type='submit'
                variant='contained'
                fullWidth>
                <Typography sx={{ ml: 1 }} >
                  Create an account
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container
            direction='row'
            justifyContent='end'>
            <Typography sx={{ mr: 1 }}>
              Already signed in?
            </Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Loggin
            </Link>
          </Grid>
        </Grid>

      </form>
    </AuthLayout>
  )
}