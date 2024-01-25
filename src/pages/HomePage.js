import React from "react";
import { Fragment } from "react";

import { Swiper } from "swiper/react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container py-10">
        <h2 className="capitalize text-white mb-5 text-3xl font-bold">
          Now Plaing
        </h2>
        <div className="movie-list">
          <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
            <MovieList></MovieList>
          </Swiper>
        </div>
      </section>
      <section className="movies-layout page-container py-10 ">
        <h2 className="capitalize text-white mb-5 text-3xl font-bold">
          Top rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-layout page-container py-10 ">
        <h2 className="capitalize text-white mb-5 text-3xl font-bold">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
