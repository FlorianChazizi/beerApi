import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [ beer, setBeer ] = useState([]);
  const [ page, setPage ] = useState(1);    // Set the first page of the beers
  const [ size, setSize ] = useState(12);   // Set 12 beers by default.

  let URL = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${size}`; // API Link

  useEffect(() => {           // Use Effect triggers the function 
    pull()                    // to run from first load of the page
  });

  let displayData

  function pull(){
    fetch(URL)
    .then(response => response.json())
    .then(responseData => {
      displayData = responseData.map(function(todo){

        return(    
          
            <div className='card'>                                             
              <h2>{todo.name} </h2>
              <p> {todo.tagline} </p>
              <img className='img' src={todo.image_url} alt="I'm a beer"/>
            </div>  
        )
      })
          setBeer(displayData)
    })
  }

  const pageChange = event => {               // Event: on changing the number of the page
    setPage( event.target.value);
    pull();                                   // Running the updated url to show the new beers
  }

  const sizeChange = event => {               // Event: on changing the size/number of the beers showing up
    setSize(event.target.value);
    pull();                                    // Running the updated url to show the new beers
  }

  return (
    <div className="App">
      <div className="header">
        <p> Oaktyres Test</p>
      </div>
      <div className='inputs'>
        <input onChange={pageChange} value={page} placeholder='Page Number'/>
        <input onChange={sizeChange} value={size} placeholder='Page Size'/>
      </div>
      <h1> Beers </h1>
      <div className='wrapper'>
        {beer}                                         
      </div>
    </div>
  );
}

export default App;


