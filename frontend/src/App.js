import { useEffect, useRef, useState } from "react";
import "@/App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Componente de partículas animadas
const ParticleField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Crear partículas
    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.8 + 0.2,
          pulse: Math.random() * Math.PI * 2,
          color: ['#ff6b35', '#4dabf7', '#ffd43b', '#ff8fab', '#69db7c'][Math.floor(Math.random() * 5)]
        });
      }
    };
    
    createParticles();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;
        
        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        const currentOpacity = p.opacity * (0.5 + Math.sin(p.pulse) * 0.5);
        const currentSize = p.size * (0.8 + Math.sin(p.pulse) * 0.4);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 3);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.5, p.color + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = currentOpacity * 0.3;
        ctx.fill();
        
        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="particle-canvas" />;
};

// Componente de ondas de radio animadas
const RadioWaves = () => {
  return (
    <div className="radio-waves-container">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="radio-wave"
          style={{ 
            animationDelay: `${i * 0.8}s`,
            opacity: 1 - (i * 0.15)
          }}
        />
      ))}
    </div>
  );
};

// Componente de notas musicales flotantes
const FloatingNotes = () => {
  const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
  
  return (
    <div className="floating-notes">
      {[...Array(12)].map((_, i) => (
        <span 
          key={i}
          className="music-note"
          style={{
            left: `${5 + (i * 8)}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
            fontSize: `${1.5 + Math.random() * 2}rem`,
            color: ['#ff6b35', '#4dabf7', '#ffd43b', '#ff8fab', '#69db7c', '#fff'][i % 6]
          }}
        >
          {notes[i % notes.length]}
        </span>
      ))}
    </div>
  );
};

// Glow orbs animados
const GlowOrbs = () => {
  return (
    <div className="glow-orbs">
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />
      <div className="glow-orb orb-3" />
      <div className="glow-orb orb-4" />
    </div>
  );
};

// Hero principal
const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 50;
    const y = (e.clientY - rect.top - rect.height / 2) / 50;
    setMousePos({ x, y });
  };

  return (
    <section 
      className="hero-section" 
      onMouseMove={handleMouseMove}
      data-testid="hero-section"
    >
      {/* Fondo con partículas */}
      <ParticleField />
      
      {/* Orbs de luz */}
      <GlowOrbs />
      
      {/* Ondas de radio */}
      <RadioWaves />
      
      {/* Notas musicales */}
      <FloatingNotes />
      
      {/* Imagen principal con parallax */}
      <div 
        className="hero-image-container"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}
      >
        <img 
          src="/assets/brand/hero-bg.png" 
          alt="Radio Conexión Latina Edmonton"
          className="hero-main-image"
          data-testid="hero-image"
        />
        
        {/* Reflection effect */}
        <div className="hero-reflection" />
      </div>
      
      {/* Overlay gradient */}
      <div className="hero-overlay" />
      
      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge" data-testid="hero-badge">
          <span className="live-dot" />
          EN VIVO 24/7
        </div>
        
        <h1 className="hero-title" data-testid="hero-title">
          <span className="title-line">La voz que</span>
          <span className="title-gradient">conecta, inspira</span>
          <span className="title-line">y eleva</span>
        </h1>
        
        <p className="hero-subtitle" data-testid="hero-subtitle">
          La primera emisora comunitaria latina en Edmonton, Alberta. 
          Música, cultura, noticias y conexión real con nuestra comunidad.
        </p>
        
        <div className="hero-buttons">
          <button className="btn-primary" data-testid="btn-listen-live">
            <span className="btn-icon">▶</span>
            Escuchar en vivo
          </button>
          <button className="btn-secondary" data-testid="btn-programs">
            Ver programación
          </button>
        </div>
        
        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-item" data-testid="stat-24-7">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Transmisión continua</span>
          </div>
          <div className="stat-item" data-testid="stat-community">
            <span className="stat-value">🌎</span>
            <span className="stat-label">Comunidad latina</span>
          </div>
          <div className="stat-item" data-testid="stat-edmonton">
            <span className="stat-value">📍</span>
            <span className="stat-label">Edmonton, Alberta</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator" data-testid="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Desliza para explorar</span>
      </div>
    </section>
  );
};

// Navegación
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} data-testid="navbar">
      <div className="nav-container">
        <div className="nav-brand" data-testid="nav-brand">
          <img src="/assets/brand/hero-bg.png" alt="Logo" className="nav-logo" />
          <div className="nav-brand-text">
            <span className="brand-name">Radio Conexión Latina</span>
            <span className="brand-location">Edmonton</span>
          </div>
        </div>
        
        <div className="nav-links" data-testid="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#envivo">En vivo</a>
          <a href="#programacion">Programación</a>
          <a href="#podcast">Podcast</a>
          <a href="#comunidad">Comunidad</a>
          <a href="#contacto">Contacto</a>
        </div>
        
        <button className="nav-cta" data-testid="nav-cta">
          <span className="live-dot" />
          Escuchar ahora
        </button>
      </div>
    </nav>
  );
};

// Reproductor flotante
const FloatingPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="floating-player" data-testid="floating-player">
      <div className="player-info">
        <span className="player-status">
          <span className="live-dot" />
          En vivo
        </span>
        <span className="player-title">Radio Conexión Latina</span>
      </div>
      <div className="player-now">
        <span className="now-playing">Ahora suena:</span>
        <span className="song-title">Música Latina Mix</span>
      </div>
      <div className="player-controls">
        <button 
          className={`play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={() => setIsPlaying(!isPlaying)}
          data-testid="play-button"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
      <div className="player-visualizer">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`bar ${isPlaying ? 'active' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

// WhatsApp flotante
const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/14384104046" 
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-button"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
};

function App() {
  return (
    <div className="App" data-testid="app-container">
      <Navbar />
      <Hero />
      <FloatingPlayer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
