import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import LabelInput from 'components/common/LabelInput';
import { useAuth } from 'shared/context/AuthContext';
import Container from 'components/common/Container';
import FormErrorMessage from 'components/common/Form/FormErrorMessage';
import Button from 'components/common/Button';

const SERVER_ERROR = 'Server Error, please try again later';
const SUBTITLE = 'Bring your Greek Gods to the Top of the Olympus';

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

const LogInLink: React.FC = () => {
  return (
    <span className='mx-auto'>
      You already have an account ?{' '}
      <Link to='/login' className='text-blue-700 hover:underline'>
        Log in here
      </Link>
    </span>
  );
};

const SignUpForm: React.FC = () => {
  const [serverErrorMessage, setServerErrorMessage] =
    React.useState<string>('');
  const [signUpSuccess, setSignUpSuccess] = React.useState<boolean>(false);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col px-4 mt-auto'
    >
      {signUpSuccess ? <Redirect to='/login' /> : null}
      <LabelInput
        id='signUpUsername'
        label='Username'
        type='text'
        required
        className='pt-4'
        {...register('username')}
      />
      {errors.username?.message && (
        <FormErrorMessage errorMessage={errors.username?.message} />
      )}
      <LabelInput
        id='signUpEmail'
        label='Email'
        type='email'
        required
        className='pt-4'
        {...register('email')}
      />
      {errors.email?.message && (
        <FormErrorMessage errorMessage={errors.email?.message} />
      )}
      <LabelInput
        id='signUpPassword'
        label='Password'
        type='password'
        required
        className='pt-4'
        {...register('password')}
      />
      {errors.password?.message && (
        <FormErrorMessage errorMessage={errors.password?.message} />
      )}
      <LabelInput
        id='signUpPasswordConfirm'
        label='Confirm Password'
        type='password'
        required
        className='pt-4'
        {...register('confirmPassword')}
      />
      {errors.confirmPassword?.message && (
        <FormErrorMessage errorMessage={errors.confirmPassword?.message} />
      )}
      <Button
        type='submit'
        value='Sign Up'
        disabled={submitDisabled}
        className='mx-auto mt-4 border rounded'
      />
      <FormErrorMessage errorMessage={serverErrorMessage} />
    </form>
  );
};

const SignUp: React.FC = () => {
  return (
    <Container
      title='Sign Up'
      subtitle={SUBTITLE}
      fixedHeight={false}
      fixedWidth={false}
    >
      <SignUpForm />
      <LogInLink />
    </Container>
  );
};

export default SignUp;
