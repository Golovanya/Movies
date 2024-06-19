import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import MovieCard from './Cards';
import { Container, Grid, Typography } from '@mui/material';
const FavoritesList: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
    console.log(favorites);
    
  return (
    <Container>
       {favorites.length ?    <Grid
         container
         justifyContent="center"
         rowSpacing={4}
         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
         maxWidth={"lg"}
         mt={2}
         mb={6}
         alignItems="stretch">






      {favorites.map(movie => (
            <Grid key={movie.id} item xs={12} sm={4}>
                <MovieCard  {...movie} />

            </Grid>
      ))}
        </Grid>:
        <Typography variant='h1'>Список избранного пуст</Typography>
        } 
     
    </Container>
  );
};

export default FavoritesList;