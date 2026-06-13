import { Button } from "@/components/Button";
import { FooterWordmarkReveal } from "@/components/FooterWordmarkReveal";
import { Header } from "@/components/Header";
import { HeroVideoStage } from "@/components/HeroVideoStage";
import { HeroLanguageDock } from "@/components/LanguageSwitcher";
import { RotatingHeroWord } from "@/components/RotatingHeroWord";
import { ScenarioSection } from "@/components/ScenarioSection";
import { UseCaseSection } from "@/components/UseCaseSection";
import "./page.css";

const scenarioCards = [
  {
    title: "Obstructed faces",
    copy: "Keep lip sync accurate even when hands, props, microphones, or shadows partially cover the speaker's face.",
    video: "/scenario-obstructed-faces.mp4",
    playUrl: "https://vimeo.com/1168727344/b5f92ede99?fl=pl&fe=vl",
  },
  {
    title: "Multiple speakers",
    copy: "Sync dialogue across scenes with more than one face, while keeping each speaker natural and consistent.",
    video: "/scenario-multiple-speakers.mp4",
    playUrl: "https://vimeo.com/1168727303/25473ebb23?fl=pl&fe=vl",
  },
  {
    title: "Low-light footage",
    copy: "Generate clean visual dubbing even in dim scenes, uneven lighting, or footage with less facial detail.",
    video: "/scenario-low-light-footage.mp4",
    playUrl: "https://vimeo.com/1168727254/39ccb08601?fl=pl&fe=vl",
  },
  {
    title: "Fast movement",
    copy: "Handle motion-heavy shots, quick cuts, camera movement, and shifting angles without breaking realism.",
    video: "/scenario-fast-movement.mp4",
    playUrl: "https://vimeo.com/1168727401/86de82d7ca?fl=pl&fe=vl",
  },
  {
    title: "Rapid dialogue",
    copy: "Match quick speech, tight timing, and expressive delivery while preserving the rhythm of the original performance.",
    video: "/scenario-rapid-dialogue.mp4",
    playUrl: "https://vimeo.com/1168727334/a6a887ddda?fl=pl&fe=vl",
  },
];

const featureHighlights = [
  {
    title: "Frame-aware lip sync",
    copy: "AI models analyze motion, expression, and timing to create mouth movement that fits the shot.",
    illustration: "/frame-aware-lip-sync.svg",
  },
  {
    title: "Built for production",
    copy: "Work through Sync Studio, the API, SDKs, or plugins designed for modern video teams.",
    illustration: "/built-for-production.svg",
  },
  {
    title: "High-quality outputs",
    copy: "Polished dubbed videos with support for complex scenes, sharp footage, and professional delivery.",
    illustration: "/high-quality-outputs.svg",
  },
];

const useCases = [
  {
    title: "Entertainment",
    copy: "Dub films, shows, trailers, and creator content with speech that feels closer to the original performance.",
    action: "Dub entertainment",
    image: "/use-case-entertainment-optimized.jpg",
  },
  {
    title: "Marketing videos",
    copy: "Turn campaign videos, product demos, and ads into localized content for every market.",
    action: "Localize campaigns",
    image: "/use-case-marketing-videos-optimized.jpg",
  },
  {
    title: "Personalized messages",
    copy: "Create personal video messages in different languages while keeping the delivery warm and believable.",
    action: "Create personal videos",
    image: "/use-case-personalized-messages-optimized.jpg",
  },
  {
    title: "E-learning",
    copy: "Translate lessons and training videos while keeping instructors visually connected to the learner.",
    action: "Scale learning content",
    image: "/use-case-e-learning-optimized.jpg",
  },
];

const productCards = [
  {
    title: "Sync-3",
    copy: "Our most advanced lip-sync model, built for complex footage, expressive faces, and production-quality results.",
    image: "/sync-3-optimized.jpg",
  },
  {
    title: "Sync Studio",
    copy: "A visual workspace for uploading videos, testing voices, previewing languages, and exporting final results.",
    image: "/sync-studio-optimized.jpg",
  },
  {
    title: "Developer API",
    copy: "Automate lip sync and dubbing workflows with APIs and SDKs built for production pipelines.",
    image: "/developer-api-optimized.jpg",
  },
  {
    title: "Creative integrations",
    copy: "Use Sync with tools like Premiere Pro, ComfyUI, and MCP to fit visual dubbing into your existing workflow.",
    image: "/creative-integrations-optimized.jpg",
  },
];

const footerColumns = [
  ["Products", "API docs", "Change log", "Princing", "Plugin"],
  ["Models", "Sync 3", "Lipsync 2 pro", "React 1"],
  ["Socials", "Instagram", "Linkedin", "X"],
  ["Company", "Talk to sales", "Blog", "Help"],
];

export default function Home() {
  return (
    <main className="figma-page">
      <div className="page-shell">
        <Header theme="light" />

        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="hero-text">
                <h1 className="heading hero-title">
                  <RotatingHeroWord />
                  <strong>
                    <em>#</em>1 lip-syncing platform
                  </strong>
                </h1>
                <p>Create natural video dubbing with AI lip sync that matches every voice, language, and frame.</p>
              </div>
              <div className="button-pair">
                <Button variant="tertiary" href="#">View docs</Button>
                <Button>Get started</Button>
              </div>
            </div>

            <HeroVideoStage />
          </div>
          <HeroLanguageDock />
        </section>

        <ScenarioSection scenarios={scenarioCards} />

        <section className="feature-section">
          <div className="section-intro centered feature-section-intro">
            <h2 className="heading">
              Visual dubbing
              <br />
              that feels native
            </h2>
            <p>From studio workflows to automated APIs, Sync helps teams create multilingual video that looks natural, not edited.</p>
          </div>
          <div className="feature-grid">
            {featureHighlights.map((card, index) => (
              <article className="feature-card" key={card.title}>
                <div className={`feature-card-media feature-card-media-${index + 1}`} aria-hidden="true">
                  <img src={card.illustration} alt="" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <UseCaseSection useCases={useCases} />

        <section className="product-section">
          <div className="section-intro">
            <h2 className="heading">Everything you need to create better dubbed video</h2>
            <p>Sync gives creators, studios, and developers the tools to generate, test, and ship visual dubbing faster.</p>
          </div>
          <div className="product-rail" aria-label="Product cards">
            {productCards.map((card) => (
              <article className="product-card" key={card.title}>
                <div className="product-media">
                  <img src={card.image} alt="" loading="lazy" decoding="async" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-section">
          <div className="section-intro centered cta-section-intro">
            <div className="cta-copy">
              <h2 className="heading">
                Make every video
                <br />
                speak any language
              </h2>
              <p>Create natural visual dubbing for global audiences with AI lip sync built for real footage, real voices, and real workflows.</p>
            </div>
            <div className="button-pair">
              <Button variant="tertiary" href="#">View docs</Button>
              <Button>Start creating</Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="blue-footer">
      <div className="blue-footer-inner">
        <div className="footer-top">
          {footerColumns.map(([title, ...links]) => (
            <nav className="footer-column" aria-label={title} key={title}>
              <h3>{title}</h3>
              {links.map((link) => (
                <a href="#" key={link}>{link}</a>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-lower">
          <div className="footer-bottom">
            <span>© 2026 synchronicity labs inc</span>
            <nav aria-label="Footer legal links">
              <a href="https://sync.so/privacy" target="_blank">Privacy policy</a>
              <a href="#">Terms</a>
            </nav>
          </div>
          <div className="footer-brand-lockup">
            <FooterWordmarkReveal />
          </div>
        </div>
      </div>
    </footer>
  );
}
