import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import LabelInput from '../components/common/LabelInput';
import { useAuth } from '../shared/context/AuthContext';

const SERVER_ERROR = 'Server Error, please try again later';

interface LogInInput {
  email: string;
  password: string;
}

const LogInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must bu a valid email')
    .required('Email is Required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(26, 'Password must be at most 26 characters long')
    .matches(/[0-9]/, 'Password must contain 1 digit')
    .matches(/[A-Z]/, 'Password must contain 1 uppercase character')
    .matches(/[a-z]/, 'Password must contain 1 lowercase character')
    .matches(
      /[-! "#$%&'()*+,./:;<=>?@[^_`{|}~\]]/,
      'Password must contain 1 special character'
    )
    .required('Password is required'),
});

const LogIn: React.FC = () => {
  const [serverErrorMessage, setServerErrorMessage] =
    React.useState<string>('');
  const [LogInSuccess, setLogInSuccess] = React.useState<boolean>(false);
  const [LogInError, setLogInError] = React.useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<LogInInput>({
    mode: 'all',
    resolver: yupResolver(LogInSchema),
  });
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LogInInput> = async ({ email, password }) => {
    try {
      setSubmitDisabled(true);
      const errorMessage = await login({ email, password });
      if (errorMessage) {
        setLogInError(true);
        setServerErrorMessage(errorMessage);
        setSubmitDisabled(false);
      } else {
        setLogInSuccess(true);
      }
    } catch (error) {
      setServerErrorMessage(SERVER_ERROR);
      setSubmitDisabled(false);
    }
  };

  React.useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <article>
      {LogInSuccess ? <Redirect to='/' /> : null}
      <h2>Log In</h2>
      <p>Bring your Greek Gods to the Top of the Olympus</p>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <LabelInput
          id='LogInEmail'
          label='Email'
          type='email'
          required
          {...register('email')}
        />
        <p>{errors.email?.message}</p>
        <LabelInput
          id='LogInPassword'
          label='Password'
          type='password'
          required
          {...register('password')}
        />
        <p>{errors.password?.message}</p>
        <input type='submit' value='Log In' disabled={submitDisabled} />
        <p>{serverErrorMessage}</p>
        <p>{LogInError}</p>
      </form>
      <span className='mx-auto'>
        You don't have an account ?{' '}
        <Link to='/signup' className='text-blue-700 hover:underline'>
          Sign up here
        </Link>
      </span>
    </article>
  );
};

export default LogIn;
