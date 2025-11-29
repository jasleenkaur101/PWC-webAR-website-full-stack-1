// frontend/src/pages/Landing.jsx
import { Link } from "react-router-dom";
import { Brain, Sparkles, QrCode, Zap } from "lucide-react";
import "../legacy-styles/business-portal.css";

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-title">
            <span className="landing-title-gradient">Transform Your Network</span>
            <br />
            <span>with AR Business Cards</span>
          </h1>

          <p className="landing-subtitle">
            Create intelligent 3D avatars that represent you in augmented reality.
            Let them speak, interact, and leave lasting impressions.
          </p>

          <div className="landing-cta-group">
            <Link to="/register">
              <button className="btn btn-primary btn-lg">Get Started</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-ghost btn-lg">Sign In</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-section">
        <div className="landing-section-header">
          <h2 className="landing-section-title">Powerful Features</h2>
          <p className="landing-section-subtitle">
            Everything you need to create engaging AR experiences
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon feature-icon-primary">
              <Brain size={24} />
            </div>
            <h3 className="feature-title">AI-Powered Conversations</h3>
            <p className="feature-description">
              Your avatar can engage in natural voice and text conversations, powered by advanced AI
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon feature-icon-accent">
              <Sparkles size={24} />
            </div>
            <h3 className="feature-title">Custom 3D Avatars</h3>
            <p className="feature-description">
              Create photorealistic avatars with Ready Player Me integration in minutes
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon feature-icon-glow">
              <QrCode size={24} />
            </div>
            <h3 className="feature-title">Instant AR Experience</h3>
            <p className="feature-description">
              Share your unique QR code and let people interact with your avatar immediately
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon feature-icon-secondary">
              <Zap size={24} />
            </div>
            <h3 className="feature-title">Easy Setup</h3>
            <p className="feature-description">
              Configure your AR business card in minutes without any coding required
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="landing-section">
        <div className="landing-section-header">
          <h2 className="landing-section-title">How It Works</h2>
          <p className="landing-section-subtitle">Get started in four simple steps</p>
        </div>

        <div className="steps-container">
          {[
            { step: "1", title: "Create Your Account", description: "Sign up in seconds and access your personal dashboard" },
            { step: "2", title: "Customize Your Avatar", description: "Design your 3D avatar and configure its AI personality to match your brand" },
            { step: "3", title: "Generate Your QR Code", description: "Get your unique QR code that links to your AR experience" },
            { step: "4", title: "Share Your AR Business Card", description: "Let people scan and interact with your intelligent avatar anywhere" }
          ].map((item, index) => (
            <div key={index} className="step-card glass">
              <div className="step-number">{item.step}</div>
              <div className="step-content">
                <h3 className="step-title">{item.title}</h3>
                <p className="step-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="landing-cta-center">
          <Link to="/register">
            <button className="btn btn-primary btn-lg">Start Creating Now</button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-brand">PWC WebAR</h3>
              <p className="footer-text">
                Transforming professional networking with AI-powered AR business cards that create memorable experiences.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Quick Links</h4>
              <nav className="footer-nav">
                <Link to="/login" className="footer-link">Sign In</Link>
                <Link to="/register" className="footer-link">Register</Link>
                <Link to="/forgot" className="footer-link">Forgot Password</Link>
              </nav>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">About</h4>
              <p className="footer-text-small">
                Built with cutting-edge AR technology and AI to revolutionize how professionals connect and engage.
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} PWC WebAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}