import { useState } from 'react';
import { Button } from '../../../../shared/components/Button/Button';
import { useAuth } from '../../../../app/providers/AuthProvider';

export const LoginForm = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('demo@fflix.io');
  const [password, setPassword] = useState('Sup3rSecret!');
  const [name, setName] = useState('Streamer');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, password, name });
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Falha ao autenticar');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form_toggle">
        <button
          type="button"
          className={mode === 'login' ? 'active' : ''}
          onClick={() => setMode('login')}
        >
          Entrar
        </button>
        <button
          type="button"
          className={mode === 'register' ? 'active' : ''}
          onClick={() => setMode('register')}
        >
          Criar conta
        </button>
      </div>
      {mode === 'register' ? (
        <div className="field">
          <label htmlFor="name">Nome</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Carregando...' : mode === 'login' ? 'Entrar' : 'Registrar'}
      </Button>
      {status === 'success' ? <span className="status success">Tudo pronto!</span> : null}
      {error ? <span className="status error">{error}</span> : null}
    </form>
  );
};

