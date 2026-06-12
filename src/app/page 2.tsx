import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { featureCards, scenarioCards } from "@/data/landing";
import "./page.css";

export default function Home() {
  return (
    <main className="landing-page">
      <Header theme="light" />

      <section className="hero-section">
        <div className="hero-media placeholder-media">
          <span>Hero image/video asset later</span>
        </div>
        <div className="hero-content">
          <p className="eyebrow">sync-3: the most intelligent lipsyncing model</p>
          <h1 className="heading">Editors #1 lip-syncing platform</h1>
          <p className="hero-copy body-copy">
            Create natural video dubbing with AI lip sync that matches every voice, language, and frame.
          </p>
          <div className="hero-actions">
            <Button variant="tertiary" href="#">View docs</Button>
            <Button href="#">Get started</Button>
          </div>
        </div>
      </section>

      <section className="language-stage">
        <div className="language-frame placeholder-media">
          <span>Language comparison video later</span>
        </div>
        <div className="language-selector" aria-label="Language selector preview">
          <span className="is-active">English</span>
          <span>Spanish</span>
          <span>Hindi</span>
          <span>French</span>
        </div>
      </section>

      <section className="scenario-section">
        <div className="section-heading">
          <h2 className="heading">Built for every scenario in every shoot</h2>
        </div>

        <div className="scenario-grid">
          {scenarioCards.map((card, index) => (
            <article className={`scenario-card scenario-card-${index + 1}`} key={card.title}>
              <div className="scenario-media placeholder-media">
                <span>{card.title} media later</span>
              </div>
              <div className="scenario-text">
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blue-showcase">
        <div className="showcase-card">
          <p>
            sync. adapts to the performance of every actor.
            <br />
            preserving every detail and movement across any language.
          </p>
          <div className="showcase-media placeholder-media">
            <span>Actor performance video later</span>
          </div>
          <div className="showcase-languages">
            <span>english</span>
            <span>spanish</span>
            <strong>hindi</strong>
            <span>french</span>
            <span>german</span>
            <span>korean</span>
          </div>
        </div>
      </section>

      <section className="workflow-section">
        <div className="workflow-row">
          <h2>Workflow integration</h2>
          <div className="orb-placeholder" aria-hidden="true" />
          <p>
            Built for your pipeline. Plugins, API, studio tools — use sync however you work.
            For projects requiring absolute perfection, work directly with our team.
          </p>
        </div>
        <div className="workflow-row">
          <h2>Verification made easy</h2>
          <div className="fingerprint-placeholder" aria-hidden="true" />
          <p>
            With sync&apos;s proprietary watermarking technology, you can check to see if any video was
            modified using our technology. Simply upload a video and hit verify.
          </p>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-intro">
          <h2 className="heading">Everything you need to create better dubbed video</h2>
          <p>
            Sync gives creators, studios, and developers the tools to generate, test, and ship visual
            dubbing faster.
          </p>
        </div>
        <div className="feature-row">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <div className="feature-media placeholder-media" />
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <h2 className="heading">Make every video speak any language</h2>
        <p>
          Create natural visual dubbing for global audiences with AI lip sync built for real footage,
          real voices, and real workflows.
        </p>
        <div className="closing-actions">
          <Button variant="tertiary" href="#">View docs</Button>
          <Button href="#">Start creating</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  const columns = [
    ["Product", "API docs", "Changelog", "Pricing", "Plugin"],
    ["Models", "Sync 3", "Lipsync 2 pro", "React 1"],
    ["Socials", "Instagram", "LinkedIn", "X"],
    ["Company", "Talk to sales", "Blog", "Help"],
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">S</span>
          <p>lipsync any content w/ one api. our lipsync works on any video content in the wild.</p>
        </div>
        <div className="footer-links">
          {columns.map(([title, ...links]) => (
            <div className="footer-column" key={title}>
              <h3>{title}</h3>
              {links.map((link) => (
                <a href="#" key={link}>{link}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 synchronicity labs inc.</span>
        <a href="#">Privacy policy</a>
        <a href="#">Terms</a>
      </div>
    </footer>
  );
}
