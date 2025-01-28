import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTYxNzNlODI2MDM0MTFiMDBjMjcxZmU5NzZjNTcxZCIsIm5iZiI6MTczODA3NDI5MS41MzUsInN1YiI6IjY3OThlOGIzZGY0YjAxOTFjZTJiMmY4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eulYFZMH6TWIZ_ybVK0h2cFdUHdyiigpTWm6CHMGNWY'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault(); //vertical 
    cardsRef.current.scrollLeft += event.deltaY; //horizontal
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category? category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  },[])
  
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index) =>{
          return <div className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards