import { useState } from 'react';
const sculptureList= [
    {name : "a", description : "Still so much aa"  },
    {name : "bbbb", description : "Not so much bs"}
]
export function ButtonC({f, content}) {
return( <button onClick={f}>{content}</button>);
}

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);


 const nextClick = () => {
if ( index < sculptureList.length - 1) {
       setIndex(index + 1);
     } else {
       setIndex(0);
     }
     }
const backClick = () => {
if ( index ==1) {
        setIndex(index - 1);
      } else {
        setIndex(sculptureList.length -1);
      }
     }


  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
    <ButtonC f={nextClick} content="Next"/>

    <ButtonC f={backClick} content="Back"/>


      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </>
  );
}
