import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Container from './Container';
import './style.css';

const root = {
  type: 'container',
  nodes: [
    {
      type: 'container',
      nodes: [
        {
          type: 'tile', 
          tileId: 'ahoj',
        },
        {
          type: 'tile',
          tileId: 'nazdar',
        },
      ],
    },
    {
      type: 'tile',
      tileId: 'hello',
    },
  ],
};

const App = () => {
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setRect({
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="page">
      <Container rect={rect} node={root} dir="rows">
        {{
          ahoj: <p>AHOJ</p>,
          nazdar: <p>NAZDAR</p>,
          hello: <p>HELLO</p>,
        }}
      </Container>
    </div>
  );
};

createRoot(
  document.querySelector('#app'),
).render(<App />);
