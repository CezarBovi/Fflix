import { useState } from 'react';
import { Button } from '../../../../shared/components/Button/Button';
import { httpClient } from '../../../../shared/api/httpClient';

export const LoginForm = () => {
  const [email, setEmail] = useState('demo@fflix.io');
  const [password, setPassword] = useState('********');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');

    try {
      await httpClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="email">E-mail corporativo</label>
        <input id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Autenticando...' : 'Entrar no dashboard'}
      </Button>
      {status === 'success' ? <span className="status success">Token emitido!</span> : null}
      {status === 'error' ? <span className="status error">API indisponível agora.</span> : null}
    </form>
  );
};

