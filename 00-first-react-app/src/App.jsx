import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [advice, setAdvice] = useState('');
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount(count => count + 1);
  }

  (function setGlowEffectRx() {
    const glowEffects = document.querySelectorAll('.glow-effect');

    glowEffects.forEach(glowEffect => {
      const glowLines = glowEffect.querySelectorAll('rect');
      const rx = getComputedStyle(glowEffect).borderRadius;

      glowLines.forEach(line => {
        line.setAttribute('rx', rx);
      });
    });
  })();

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="card-container">
      <div className="card">
        <h1>{advice}</h1>
        <button className="button" onClick={getAdvice}>
          Get Advices ⚡
        </button>
        <Message count={count} />
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Message({ count }) {
  return <p>You have read {count} piece of advice</p>;
}
