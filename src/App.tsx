/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Instagram, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Target, 
  Sparkles, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline();
    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.2
    })
    .from('.hero-sub', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-cta', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Bento Grid Hover Effects (handled by CSS/Tailwind mostly, but GSAP for subtle parallax)
    gsap.to('.bento-item', {
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: (i) => (i % 2 === 0 ? -20 : 20),
      ease: 'none'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-dark overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tighter uppercase italic">
            Gisele <span className="text-brand-gold">Novaes</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/70">
          <a href="#home" className="hover:text-white transition-colors">Início</a>
          <a href="#metodo" className="hover:text-white transition-colors">O Método</a>
          <a href="#guerreiras" className="hover:text-white transition-colors">Guerreiras</a>
          <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/ginovaestreinadora_" 
            target="_blank" 
            className="hidden sm:flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter hover:bg-white/10 transition-all"
          >
            <Instagram size={14} />
            @ginovaestreinadora_
          </a>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase italic">Início</a>
          <a href="#metodo" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase italic">O Método</a>
          <a href="#guerreiras" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase italic">Guerreiras</a>
          <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase italic">Sobre</a>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" 
            alt="Fitness Background" 
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/60 to-brand-dark" />
        </div>

        <div className="relative z-10 max-w-5xl text-center">
          <span className="hero-sub inline-block glass px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-brand-gold">
            Disciplina além da estética
          </span>
          <h1 className="hero-title text-5xl md:text-8xl lg:text-9xl font-display font-black uppercase italic leading-[0.85] tracking-tighter mb-8 text-gradient">
            SIM, É POSSÍVEL <br />
            <span className="text-brand-gold">EVOLUIR</span> APÓS OS 40+
          </h1>
          <p className="hero-sub text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Transformando histórias de mulheres em resultados reais. Especialista em glúteos e hipopressivos para quem busca saúde, mentalidade e estética.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-tighter rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Comece sua mudança <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="glass px-8 py-4 rounded-full font-bold uppercase tracking-tighter hover:bg-white/10 transition-all">
              Conheça o Método
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Authority Marquee */}
      <section className="py-12 border-y border-white/5 bg-white/2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-5xl font-display font-bold italic">141K+</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Seguidoras no Instagram</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-5xl font-display font-bold italic">7.5K+</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Posts de Conteúdo</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-5xl font-display font-bold italic">40+</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Evolução Real</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-5xl font-display font-bold italic">GLÚTEO</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Expertise Técnica</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentials - Bento Grid */}
      <section id="metodo" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase italic mb-4">O Diferencial <span className="text-brand-gold">Gisele Novaes</span></h2>
          <p className="text-white/40 uppercase tracking-[0.2em] text-xs">Por que somos diferentes de tudo o que você já viu</p>
        </div>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[800px]">
          {/* Main Card */}
          <div className="bento-item md:col-span-2 md:row-span-2 glass rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop" 
              alt="Glute Training" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center mb-6">
                <Target className="text-brand-gold" />
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-bold uppercase italic mb-4">Expertise em <br /> <span className="text-brand-gold">Glúteos</span></h3>
              <p className="text-white/60 max-w-md leading-relaxed">
                Treinos específicos desenhados para a fisiologia feminina 40+. Não é apenas sobre estética, é sobre funcionalidade e força onde você mais precisa.
              </p>
            </div>
            <div className="relative z-10 mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
              Ver detalhes <ChevronRight size={14} />
            </div>
          </div>

          {/* Hypopressives Card */}
          <div className="bento-item glass rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-display font-bold uppercase italic mb-2">Hipopressivos</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                A técnica que transforma sua linha de cintura e saúde interna. Essencial para a evolução pós-40.
              </p>
            </div>
          </div>

          {/* Community Card */}
          <div className="bento-item glass rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-display font-bold uppercase italic mb-2">Comunidade</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Você não está sozinha. Um exército de mulheres com o mesmo propósito e mentalidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guerreiras em Ação Section */}
      <section id="guerreiras" className="py-24 bg-white/2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px] mb-4 block">Melhores Amigos Instagram</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase italic leading-none mb-8">
              Guerreiras <br /> em <span className="text-brand-gold">Ação</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Um grupo fechado e exclusivo voltado para mulheres 45+ que buscam uma mudança radical de saúde e mentalidade. Acesso direto aos meus treinos diários e rotina.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Treinos guiados específicos",
                "Dicas diárias de mentalidade",
                "Técnicas de hipopressivos",
                "Acompanhamento nos Melhores Amigos",
                "Foco total em resultados reais"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 size={18} className="text-brand-gold" />
                  <span className="text-sm uppercase tracking-tight font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button className="w-full sm:w-auto px-10 py-5 bg-brand-gold text-black font-black uppercase tracking-tighter rounded-full hover:scale-105 transition-transform">
              Quero ser uma Guerreira
            </button>
          </div>

          <div className="relative reveal">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden glass p-2">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
                alt="Gisele Training" 
                className="w-full h-full object-cover rounded-[1.8rem]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 glass p-6 rounded-3xl max-w-[200px] animate-bounce-slow">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Próxima Turma</p>
              <p className="text-xl font-display font-bold italic">Vagas Limitadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase italic mb-4">Transformando <span className="text-brand-gold">Histórias</span></h2>
          <p className="text-white/40 uppercase tracking-[0.2em] text-xs">O que dizem as nossas guerreiras</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Maria Silva",
              age: "48 anos",
              text: "Depois dos 45 achei que não veria mais mudanças. A Gisele me provou o contrário. Minha cintura e glúteos nunca estiveram tão bem!",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
            },
            {
              name: "Ana Paula",
              age: "52 anos",
              text: "Os hipopressivos mudaram minha vida. Além da estética, minha saúde interna e postura melhoraram 100%. Gratidão eterna.",
              img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop"
            },
            {
              name: "Carla Mendes",
              age: "42 anos",
              text: "O grupo Guerreiras em Ação é o que me mantém focada. A energia e os treinos da Gisele são contagiantes. Recomendo muito!",
              img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
            }
          ].map((item, i) => (
            <div key={i} className="reveal glass p-8 rounded-3xl flex flex-col gap-6 hover:border-brand-gold/30 transition-colors">
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-white/20" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold text-sm uppercase tracking-tighter">{item.name}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.age}</p>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed italic">"{item.text}"</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Sparkles key={j} size={12} className="text-brand-gold" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-transparent opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase italic mb-8 reveal">Pronta para sua <br /> <span className="text-brand-gold">Melhor Versão?</span></h2>
            <p className="text-white/60 mb-12 max-w-xl mx-auto reveal">
              Não importa sua idade, importa sua decisão. Comece hoje a transformar seu corpo e sua mente com o método Gisele Novaes.
            </p>
            <button className="reveal px-12 py-6 bg-white text-black font-black uppercase tracking-tighter rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Quero começar agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display text-xl font-bold tracking-tighter uppercase italic">
              Gisele <span className="text-brand-gold">Novaes</span>
            </span>
            <p className="text-[10px] uppercase tracking-widest text-white/20">© 2026 Influenciadora do Meio Fitness</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
            </a>
          </div>

          <nav className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
