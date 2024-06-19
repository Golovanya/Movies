
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFavorite, addFavorite } from "../store/favoritesSlice";

interface MovieCardProps {
  id: number;
  name: string;
  year: number;
  genres: { name: string }[];
  rating: { kp: number };
  poster: {url: string, previewUrl: string}
}



const MovieCard: React.FC<MovieCardProps> = ({ id, name, year, genres, rating, poster }) => {
 
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  
  const isFavorite = favorites.some(movie => movie.id === id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite({ id, name, year, genres, rating, poster }));
    }
  };

  return (


    <Card key={id} sx={{ pb:2 }} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardMedia
        image= {poster.previewUrl}
        sx={{ height: 500 }}
        />
      <CardContent style={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h6">
          {year}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx = {{overflow: 'hidden', textOverflow: 'ellipsis',}} noWrap  >
          Жанр: {genres.map((genre) => genre.name).join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Рейтинг фильма: {rating.kp || "Рейтинга пока нет"}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to = {`/movie/${id}`}>
         <Button size="small">Подробнее</Button>
        </Link>
        <Button size="small" onClick={handleFavoriteClick}>
          {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;