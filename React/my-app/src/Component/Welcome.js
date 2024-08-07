import React from 'react';

// Composant fonctionnel simple
function Welcome(props) {


   const handleClick = () => {
      alert(`Bonjour, ${props.name} !`);
    };

  return (
  <div>
  <h1>Hello, {props.name}</h1>
  <br/>
  Je suis un {props.metier}
  <br />
 <button onClick={handleClick}>Click me</button>

  </div>

  );
}

export default Welcome;