import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { Imovie } from "../types/types";
const URL = "https://api.kinopoisk.dev/v1.4/movie";
const TOKEN = "K6ZYE04-Y7V4H63-PJRT2D6-P4ST2G0";

function MovieDetail() {
  const [movie, setMovie] = useState<null | Imovie>(null);
  const { id } = useParams();
  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${URL}/${id}`, {
        headers: {
          "X-API-KEY": TOKEN,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return { error };
    }
  }

  const fetchMovieAsync = async () => {
    const fetchedData = await fetchMovie();
    setMovie(fetchedData);
  };
  useEffect(() => {
    fetchMovieAsync();
  }, );

  console.log(movie);
  
   return (
      <Container sx = {{mt:10}}>
        {movie ?
        <div className="flex justify-around">
            <div className="flex flex-col">
            <Typography variant="h3" sx = {{mb:4}}>{movie.name}</Typography>
            <Typography variant="overline" display="block"><b>Год выпуска</b>: {movie.year}</Typography> 
            <Typography variant="overline" display="block"><b>Жанры: </b>: {movie.genres.map((el) => el.name).join(",")}</Typography> 
            <Typography variant="overline" display="block" sx = {{mb:4}}><b>Рейтинг кинопоиска</b>: {movie.rating.kp || "Рейтинга пока нет"}</Typography> 
            <Typography variant="body1" display="block"><b>Описание</b>: {movie.description} </Typography>
            </div>
           <img src= {movie.poster.url}  className="max-w-md"/> 
        </div>
       
        
        :
        0

      
      
      }
        
      </Container>
   )
}




export default MovieDetail;
