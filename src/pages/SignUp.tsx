import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import LabelInput from '../components/common/LabelInput';
import { useAuth } from '../shared/context/AuthContext';

const SERVER_ERROR = 'Server Error, please try again later';

interface SignUpInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp: React.FC = () => {
  const [serverErrorMessage, setServerErrorMessage] =
    React.useState<string>('');
  const [signUpSuccess, setSignUpSuccess] = React.useState<boolean>(false);
  const [signUpError, setSignUpError] = React.useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SignUpInput>({
    mode: 'all',
    resolver: yupResolver(signUpSchema),
  });
  const { signup } = useAuth();

  const onSubmit: SubmitHandler<SignUpInput> = async ({
    username,
    email,
    password,
  }) => {
    try {
      setSubmitDisabled(true);
      const errorMessage = await signup({ username, email, password });
      if (errorMessage) {
        setSignUpError(true);
        setServerErrorMessage(errorMessage);
        setSubmitDisabled(false);
      } else {
        setSignUpSuccess(true);
      }
    } catch (error) {
      setServerErrorMessage(SERVER_ERROR);
      setSubmitDisabled(false);
    }
  };

  React.useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  return (
    <article>
      {signUpSuccess ? <Redirect to='/login' /> : null}
      <h2>Sign Up</h2>
      <p>Bring your Greek Gods to the Top of the Olympus</p>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <LabelInput
          id='signUpUsername'
          label='Username'
          type='text'
          required
          {...register('username')}
        />
        <p>{errors.username?.message}</p>
        <LabelInput
          id='signUpEmail'
          label='Email'
          type='email'
          required
          {...register('email')}
        />
        <p>{errors.email?.message}</p>
        <LabelInput
          id='signUpPassword'
          label='Password'
          type='password'
          required
          {...register('password')}
        />
        <p>{errors.password?.message}</p>
        <LabelInput
          id='signUpPasswordConfirm'
          label='Confirm Password'
          type='password'
          required
          {...register('confirmPassword')}
        />
        <p>{errors.confirmPassword?.message}</p>
        <input type='submit' value='Sign Up' disabled={submitDisabled} />
        <p>{serverErrorMessage}</p>
        <p>{signUpError}</p>
      </form>
      <span className='mx-auto'>
        You already have an account ?{' '}
        <Link to='/login' className='text-blue-700 hover:underline'>
          Log in here
        </Link>
      </span>
    </article>
  );
};

export default SignUp;
