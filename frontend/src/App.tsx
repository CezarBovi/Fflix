import { Button } from './shared/components/Button/Button';
import { LoginForm } from './features/auth/components/LoginForm/LoginForm';
import { VideoHero } from './features/video/components/VideoHero/VideoHero';
import { ContentShowcase } from './features/catalog/components/ContentShowcase/ContentShowcase';
import { SprintTimeline } from './features/analytics/components/SprintTimeline/SprintTimeline';
import { StreamingInsights } from './features/analytics/components/StreamingInsights/StreamingInsights';
import { ApiExplorer } from './features/api/components/ApiExplorer/ApiExplorer';
import { MicroserviceGrid } from './features/api/components/MicroserviceGrid/MicroserviceGrid';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">FFlix • Plataforma de streaming enterprise</p>
          <h1>
            Microsserviços orquestrados, <span>playback adaptativo</span> e insights contínuos.
          </h1>
          <p className="subheading">
            Roadmap guiado por sprints, APIs REST documentadas e disciplina DevSecOps para
            suportar milhares de sessões simultâneas com baixa latência.
          </p>
          <div className="hero-actions">
            <Button onClick={() => window.open('http://localhost:4000/health', '_blank')}>
              Testar healthcheck
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                window.open('https://github.com/', '_blank', 'noopener,noreferrer')
              }
            >
              Ver ADRs
            </Button>
          </div>
        </div>
        <LoginForm />
      </header>

      <main>
        <section className="status-panel">
          <VideoHero />
          <ContentShowcase />
        </section>

        <section className="stats-section">
          <StreamingInsights />
          <div className="timeline-wrapper">
            <h3>Trilhas de Sprint (12-16)</h3>
            <SprintTimeline />
          </div>
        </section>

        <section>
          <div className="section-heading">
            <h2>Arquitetura por domínio</h2>
            <p>Bounded contexts independentes e escaláveis.</p>
          </div>
          <MicroserviceGrid />
        </section>

        <section>
          <div className="section-heading">
            <h2>APIs REST expostas</h2>
            <p>Gateway único com rotas versionadas.</p>
          </div>
          <ApiExplorer />
        </section>
      </main>

      <footer>
        <small>© {new Date().getFullYear()} FFlix • Build for scale.</small>
      </footer>
    </div>
  );
}

export default App;

