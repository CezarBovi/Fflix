import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../app/providers/AuthProvider';
import { LoginForm } from '../../features/auth/components/LoginForm/LoginForm';
import { userService } from '../../services/api/userService';
import { Button } from '../../shared/components/Button/Button';

export const AccountPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="page-stack">
        <h1>Minha conta</h1>
        <p>Faça login ou crie um perfil para sincronizar preferências.</p>
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="page-stack">
      <header className="account-header">
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
        <span className="badge badge-stable">{user.roles.join(', ')}</span>
      </header>

      <PreferencesForm initialPreferences={user.preferences} />
    </div>
  );
};

const PreferencesForm = ({ initialPreferences }: { initialPreferences: Record<string, unknown> }) => {
  const [language, setLanguage] = useState((initialPreferences.language as string) ?? 'pt-BR');
  const [theme, setTheme] = useState((initialPreferences.theme as string) ?? 'dark');
  const { refreshProfile } = useAuth();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => userService.updatePreferences({ language, theme }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['profile'] });
      refreshProfile();
    },
  });

  return (
    <form
      className="preferences-form"
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate();
      }}
    >
      <h3>Preferências</h3>
      <label>
        Idioma
        <select value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="pt-BR">Português</option>
          <option value="en-US">Inglês</option>
        </select>
      </label>
      <label>
        Tema
        <select value={theme} onChange={(event) => setTheme(event.target.value)}>
          <option value="dark">Escuro</option>
          <option value="light">Claro</option>
        </select>
      </label>
      <Button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Salvando...' : 'Salvar preferências'}
      </Button>
      {mutation.isSuccess ? <span className="status success">Preferências atualizadas!</span> : null}
      {mutation.isError ? (
        <span className="status error">Erro ao salvar, tente novamente.</span>
      ) : null}
    </form>
  );
};

