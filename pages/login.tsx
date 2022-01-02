import React, { useCallback, useState } from "react";
import { useRouter } from 'next/router'

import AuthLayout from "components/layouts/AuthLayout";
import Button from "components/Button";
import { useLogin } from "utils/api";

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const doLogin = useLogin();
  const handleSubmit = useCallback(async () => {
    const result = await doLogin(username, password);
    if(result) {
      const user = await result.json();
      if(user.user) {
        localStorage.setItem("token", user.user.token);
        router.push('/');

      } else {
        setError('Wrong username or password.');
      }
    } else {
      setError('Wrong username or password.');
    }
  }, [doLogin, username, password])

  return (
    <AuthLayout title="Login">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <label htmlFor="username">Username</label>
      <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password"  value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={() => handleSubmit()}>Login</Button>
    </AuthLayout>
  );
};

export default Page;
