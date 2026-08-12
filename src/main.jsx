import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  { label: 'Story', href: '#story' },
  { label: 'The journey', href: '#journey' },
  { label: 'Characters', href: '#characters' },
  { label: 'World', href: '#world' },
];

const asset = name => `${import.meta.env.BASE_URL}${name}`;

const characters = [
  { numeral: 'I', name: 'Odysseus', role: 'The wanderer', image: asset('odyssey.png'), alt: 'Odysseus, king of Ithaca', copy: 'A king shaped by war, known less for his strength than for the mind that refuses to surrender.' },
  { numeral: 'II', name: 'Penelope', role: 'The constant', image: asset('penelope.png'), alt: 'Penelope, queen of Ithaca', copy: 'For twenty years she keeps Ithaca intact, weaving patience into a weapon no invader can understand.' },
  { numeral: 'III', name: 'Poseidon', role: 'The adversary', image: asset('poseidon.png'), alt: 'Poseidon, god of the sea', copy: 'Lord of the sea and keeper of grudges. Every wave carries the weight of his anger.' },
];

const places = [
  ['01', 'Troy'],
  ['02', 'Ismarus'],
  ['03', 'Land of the Lotus-Eaters'],
  ['04', 'Island of the Cyclops'],
  ['05', 'Aeaea'],
  ['06', 'Hades'],
  ['07', 'Ogygia'],
  ['08', 'Ithaca'],
];

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }

function App() {
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('story');

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    const motionItems = document.querySelectorAll('[data-motion]');
    const motionObserver = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    motionItems.forEach(item => motionObserver.observe(item));
    const sections = document.querySelectorAll('[data-nav-section]');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.dataset.navSection)),
      { rootMargin: '-42% 0px -52%' },
    );
    sections.forEach(section => observer.observe(section));
    return () => { cancelAnimationFrame(frame); motionObserver.disconnect(); observer.disconnect(); };
  }, []);

  const go = () => setMenu(false);

  const assetBase = import.meta.env.BASE_URL;
  const assetVars = {
    '--hero-bg': `url(${assetBase}tes.png)`,
    '--journey-one-bg': `url(${assetBase}journey-one.png)`,
    '--journey-two-bg': `url(${assetBase}journey-two.png)`,
    '--cyclops-bg': `url(${assetBase}cyclops-eye.png)`,
    '--map-bg': `url(${assetBase}odyssey-map.png)`,
  };

  return <div className={`page ${ready ? 'ready' : ''}`} style={assetVars}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#top" onClick={go} aria-label="Odyses home">ODYSES</a>
      <nav className={menu ? 'nav open' : 'nav'} aria-label="Main navigation">
        {navItems.map(item => {
          const id = item.href.slice(1);
          return <a className={active === id ? 'current' : ''} href={item.href} onClick={go} key={item.label}>{item.label}<span className="dot" /></a>;
        })}
      </nav>
      <a className="header-link" href="#journey">BEGIN THE JOURNEY <Arrow /></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Open navigation"><i /><i /></button>
    </header>

    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="art" role="img" aria-label="Odysseus overlooking a vast mythic landscape" />
        <div className="shade" />
        <div className="hero-content" data-motion="hero">
          <p className="kicker">A JOURNEY WRITTEN BY THE GODS</p>
          <h1 id="hero-title">The long way<br /><span>back <i>home,</i></span></h1>
          <p className="lede">Follow Odysseus across hostile seas, forgotten kingdoms<br className="wide" /> and the will of the gods on his journey back to Ithaca.</p>
          <a className="hero-link" href="#journey">BEGIN THE JOURNEY <Arrow /></a>
        </div>
        <div className="scroll"><span /> SCROLL TO EXPLORE</div>
        <div className="series">ODYSSES <b>•</b> THE EPIC SERIES</div>
      </section>

      <section className="journey" id="journey" data-nav-section="journey" aria-label="The journey of Odysseus" data-motion="section">
        <article className="chapter chapter-one" id="story" data-nav-section="story" data-motion="section">
          <div className="chapter-image" role="img" aria-label="A cinematic chapter from Odysseus's journey" />
          <div className="chapter-shade" />
          <div className="chapter-copy">
            <span className="chapter-number">CHAPTER I</span>
            <p className="kicker">THE CALL OF THE SEA</p>
            <h2>A kingdom left<br /><em>behind.</em></h2>
            <p className="chapter-description">Victory ended the war, but it did not bring him home. Beyond the shore waited a sea ruled by memory, monsters, and gods who never forget.</p>
            <a href="#trial">FOLLOW THE VOYAGE <Arrow /></a>
          </div>
          <div className="chapter-index">01 <span /> 03</div>
        </article>

        <article className="chapter chapter-two" id="trial" data-motion="section">
          <div className="chapter-image" role="img" aria-label="A dark red scene from the trials of Odysseus" />
          <div className="chapter-shade" />
          <div className="chapter-copy">
            <span className="chapter-number">CHAPTER II</span>
            <p className="kicker">TRIALS OF THE GODS</p>
            <h2>Every promise<br /><em>has a price.</em></h2>
            <p className="chapter-description">Each island offers refuge and danger in equal measure. To return to Ithaca, Odysseus must outlast the will of those who command the horizon.</p>
            <a href="#noman">FACE THE CYCLOPS <Arrow /></a>
          </div>
          <div className="chapter-index">02 <span /> 03</div>
        </article>

        <article className="noman" id="noman" data-motion="section">
          <div className="eye" role="img" aria-label="The single eye of the Cyclops Polyphemus" />
          <div className="noman-copy">
            <p className="kicker">THE CAVE OF POLYPHEMUS</p>
            <blockquote>“My name is<br /><em>No Man.</em>”</blockquote>
            <p>His greatest weapon was never the sword. It was the story his enemy chose to believe.</p>
          </div>
          <div className="chapter-index">03 <span /> 03</div>
        </article>
      </section>

      <section className="characters" id="characters" data-nav-section="characters" aria-labelledby="characters-title" data-motion="section">
        <header className="section-heading">
          <p className="kicker">MORTALS, MONSTERS &amp; GODS</p>
          <h2 id="characters-title">Bound by<br /><em>fate.</em></h2>
          <p>Three forces pull at the same thread: the man who travels, the woman who waits, and the god who stands between them.</p>
        </header>
        <div className="character-list" data-motion="list">
          {characters.map((character, index) => <article className="character" key={character.name} data-motion="card">
            <span className="character-numeral">{character.numeral}</span>
            <div className="portrait" data-motion="portrait"><img src={character.image} alt={character.alt} loading="lazy" /></div>
            <p className="character-role">{character.role}</p>
            <h3>{character.name}</h3>
            <p>{character.copy}</p>
          </article>)}
        </div>
      </section>

      <section className="world" id="world" data-nav-section="world" aria-labelledby="world-title" data-motion="section">
        <div className="world-copy">
          <p className="kicker">ACROSS THE WINE-DARK SEA</p>
          <h2 id="world-title">A world between<br /><em>myth and memory.</em></h2>
          <p>The route home is not measured in miles. It is marked by what Odysseus loses, what he learns, and who he becomes before seeing Ithaca again.</p>
        </div>
        <figure className="route">
          <div className="route-image" data-motion="image">
            <img src={asset('odyssey-map.png')} alt="Illustrated map tracing Odysseus's voyage across the Mediterranean toward Ithaca" loading="lazy" />
          </div>
          <figcaption>The voyage from fallen Troy to the long-awaited shores of Ithaca.</figcaption>
          <div className="places" aria-label="Places along Odysseus's journey">
            {places.map(([number, name]) => <a href="#journey" key={name}><span>{number}</span><strong>{name}</strong></a>)}
          </div>
        </figure>
      </section>

      <section className="homecoming" aria-labelledby="home-title" data-motion="section">
        <div className="home-image" role="img" aria-label="The distant coast of Ithaca" />
        <div className="home-shade" />
        <div className="home-copy" data-motion="copy">
          <p className="kicker">AFTER TWENTY YEARS</p>
          <h2 id="home-title">Ithaca<br /><em>waits.</em></h2>
          <p>Home is no longer the place he left. And he is no longer the man who left it.</p>
          <a href="#top">RETURN TO THE BEGINNING <Arrow /></a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">ODYSES</a>
        <p>THE LONG WAY BACK HOME</p>
        <div className="footer-links"><a href="#story">STORY</a><a href="#characters">CHARACTERS</a><a href="#world">WORLD</a></div>
        <p className="copyright">A DIGITAL HOMAGE TO HOMER'S ODYSSEY · MMXXVI</p>
      </footer>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
