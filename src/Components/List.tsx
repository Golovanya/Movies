import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MovieCard from "./Cards";
import axios from "axios";
import { useEffect, useState } from "react";
import { IData } from "../types/types";
import mockGenres from "../MockData/mockGenres";
const URL = "https://api.kinopoisk.dev/v1.4/movie";
const TOKEN = "JGRCFEX-KZNM1K7-QYTF2J9-GNQ7XJ8";
const limit = 50;
const selectFields = [
  "id",
  "name",
  "year",
  "rating",
  "poster",
  "description",
  "genres",
];
const notNullFields = [
  "id",
  "name",
  "description",
  "year",
  "rating.kp",
  "poster.url",
  "genres.name",
];

function List() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<null | IData>(null);
  const [sortField, setSortField] = useState("");
  const [years, setYears] = useState<number[]>([2005, 2024]);
  const [genres, setGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<number[]>([6, 10]);

  function valuetextYEAR(value: number) {
    return `${value} год`;
  }
  function valuetextRAITING(value: number) {
    return `${value} рейтинг`;
  }

  const handleChangeYear = (_event: Event, newValue: number | number[]) => {
    setYears(newValue as number[]);
  };
  const handleChangeRating = (_event: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
  };

  const handleChangeGenre = (
    _event: React.MouseEvent<HTMLElement>,
    genre: string
  ) => {
    setGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, `+${genre}`];
      }
    });
    console.log(genres);
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChangeRait = (
    _event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setSortField(value);
  };

  async function fetchMovies() {
    try {
      const { data } = await axios.get(URL, {
        headers: {
          "X-API-KEY": TOKEN,
        },
        paramsSerializer: {
          indexes: null,
        },
        params: {
          page,
          limit,
          selectFields,
          notNullFields,
          sortType: "-1",
          sortField,
          year: years.join("-"),
          "genres.name": genres,
          "rating.kp": rating.join("-"),
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return { error };
    }
  }

  const fetchMoviesAsync = async () => {
    const fetchedData = await fetchMovies();
    setData(fetchedData);
  };
  useEffect(() => {
    fetchMoviesAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortField, years, genres, page, rating]);
  console.log(data);
  
  return (
    <div className="list w-full overflow-scroll">
      <div className="flex justify-between flex-wrap px-10 mt-10 gap-x-3  ">
      <Box sx={{ width: 1/3, borderRadius: '16px', px:3, py:1 }}>
      
        <Typography variant="body1">{`Года выпуска: ${years[0]}-${years[1]}`}</Typography>
        <Slider
          value={years}
          onChange={handleChangeYear}
          getAriaValueText={valuetextYEAR}
          valueLabelDisplay="auto"
          min={1990}
          max={2024}
          step={1}
        />
        <Typography variant="body1">{`Рейтинг: от ${rating[0]} до ${rating[1]}`}</Typography>
        <Slider
          value={rating}
          onChange={handleChangeRating}
          getAriaValueText={valuetextRAITING}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          step={1}
        />
        <ToggleButton value={"rating.kp"} onChange={handleChangeRait} selected = {!!sortField}>
        Рейтинг
        <ArrowDownwardIcon />
      </ToggleButton>
      </Box>
         
      <Box sx={{ width: 1/3, mb:10 }}>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={genres}
        aria-label="Platform"
      >
        <Grid >
          {mockGenres.map((el) => {
            return (
              <ToggleButton
                value={el.name}
                key={el.name}
                selected={genres.includes(`+${el.name}`)}
                onChange={handleChangeGenre}
                size="small"
              >
                {el.name}
              </ToggleButton>
            );
          })}
        </Grid>
      </ToggleButtonGroup>

      </Box>

      </div>


      <Container>
        <Stack alignItems="center">
          <Pagination
            count={data ? data.pages : 0}
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        </Stack>
      
        <Grid
          container
          justifyContent="center"
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          maxWidth={"lg"}
          mt={2}
          mb={6}
          alignItems="stretch"
        >
          {data ? (
            data.docs.map((film) => {
              return (
                <Grid key={film.id} item xs={12} sm={4}>
                  <MovieCard
                    id={film.id}
                    name={film.name}
                    year={film.year}
                    genres={film.genres}
                    rating={film.rating}
                    poster={film.poster}
                  />
                </Grid>
              );
            })
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default List;
