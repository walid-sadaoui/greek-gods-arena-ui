import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import LabelInput from 'components/common/LabelInput';
import { useAuth } from 'shared/context/AuthContext';
import Container from 'components/common/Container';
import Button from 'components/common/Button';
import FormErrorMessage from 'components/common/Form/FormErrorMessage';

const SERVER_ERROR = 'Server Error, please try again later';
const SUBTITLE = 'Bring your Greek Gods to the Top of the Olympus';

interface LogInInput {
  email: string;
  password: string;
}

const logInSchema = yup.object().shape({
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

const SignUpLink: React.FC = () => {
  return (
    <span className='mx-auto mb-auto'>
      You don't have an account ?{' '}
      <Link to='/signup' className='text-blue-700 hover:underline'>
        Sign up here
      </Link>
    </span>
  );
};

const LogInForm: React.FC = () => {
  const [serverErrorMessage, setServerErrorMessage] =
    React.useState<string>('');
  const [LogInSuccess, setLogInSuccess] = React.useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<LogInInput>({
    mode: 'all',
    resolver: yupResolver(logInSchema),
  });
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LogInInput> = async ({ email, password }) => {
    try {
      setSubmitDisabled(true);
      const errorMessage = await login({ email, password });
      if (errorMessage) {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col px-4 mt-auto'
    >
      {LogInSuccess && <Redirect to='/' />}
      <LabelInput
        id='LogInEmail'
        label='Email'
        type='email'
        required
        className='pt-4'
        {...register('email')}
      />
      {errors.email?.message && (
        <FormErrorMessage errorMessage={errors.email.message} />
      )}
      <LabelInput
        id='LogInPassword'
        label='Password'
        type='password'
        required
        className='pt-4'
        {...register('password')}
      />
      {errors.password?.message && (
        <FormErrorMessage errorMessage={errors.password.message} />
      )}
      <Button
        type='submit'
        value='Log In'
        disabled={submitDisabled}
        className='mx-auto mt-4 border rounded'
      />
      <FormErrorMessage errorMessage={serverErrorMessage} />
    </form>
  );
};

const LogIn: React.FC = () => {
  return (
    <Container
      title='Log In'
      subtitle={SUBTITLE}
      fixedHeight={false}
      fixedWidth={false}
    >
      <LogInForm />
      <SignUpLink />
    </Container>
  );
};

export default LogIn;
