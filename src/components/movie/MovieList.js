import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";
// https://api.themoviedb.org/3/movie/now_playing
const MovieList = ({type = "now_playing"}) => {
  const [movies, setMovies] = useState([]);
  const { data} = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=cc272106f56d682df0e27b9810d9de53`,
    fetcher
  );
  console.log(movies);

  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    } 

  },[data]);
  return (
    <div className="movie-list">
      <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 && movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>    
  );
};

export default MovieList;
