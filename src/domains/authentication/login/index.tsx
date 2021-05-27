import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Text } from 'rebass';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import queryString from 'querystring';
import { toast } from 'react-toastify';

import Spacer from '@poupachef/ui/spacer';
import { setAuthentication } from '@poupachef/support/helpers/authentication';
import { SUPPLIER_LISTING_PATH } from '@poupachef/routing/routes/logged';
import api from '@poupachef/api';

import { BASIC_AUTH_PASSWORD } from '@poupachef/support/commons/envs';
import { Container } from './style';

interface ValuesI {
  username: string;
  password: string;
}

const Login = (): JSX.Element => {
  const history = useHistory();

  const handleGetToken = (values: ValuesI) => {
    api
      .post(
        '/oauth/token',
        {
          ...values,
          grant_type: 'password',
          scope: 'web',
          username: 'teste@teste.com',
          password: 'frontendpassword',
        },
        {
          auth: {
            username: 'poupachef-test',
            password: BASIC_AUTH_PASSWORD,
          },
        },
      )
      .then(({ data }) => {
        setAuthentication(data.access_token);

        history.push(SUPPLIER_LISTING_PATH, {
          jwt: data.access_token,
        });
      })
      .catch(
        ({ response }): React.ReactText => {
          if (response.data.error_description === 'Bad credentials')
            return toast.error('Combinação de usuário e senha inválidos.');

          return toast.error(response.data.error_description);
        },
      );
  };

  const initialValues: ValuesI = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values: ValuesI) => {
      handleGetToken(values);
    },
  });

  return (
    <Container onSubmit={formik.handleSubmit}>
      <Text fontSize="32px" as="span" fontWeight="bold" pb="16px">
        Que bom ter você por aqui 👋
      </Text>
      <Text fontSize="16px" as="span" pb="32px">
        Entre com seu usuário e senha
      </Text>

      <TextField
        label="Username"
        name="username"
        variant="outlined"
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.username}
      />

      <Spacer space="32px" />

      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <Spacer space="32px" />

      <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
        ENTRAR
      </Button>
    </Container>
  );
};

export default Login;
