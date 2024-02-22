import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import { SwiperSlide,Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

// https://api.themoviedb.org/3/movie/popular?api_key=cc272106f56d682df0e27b9810d9de53

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="text-center text-3xl font-bold mb-10">{title}</h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border rounded"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  console.log("🚀 ~ MovieCredits ~ cast:", cast);
  if (!cast && cast.length <= 0) return null;
  return (
    <>
      <h2 className="text-center text-2xl mb-10">Cast</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-items" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full"
            />
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  console.log("🚀 ~ MovieVideos ~ data:", data);
  if (!data) return null;
  const { results } = data;
  if (!results && results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 bg-primary inline-block text-white">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="935"
                height="526"
                src={`https://www.youtube.com/embed/${item.key}`}
                className=" w-full object-fill h-full"
                title="Thức khuya không xấu! Cách để ngủ trễ nhưng không mệt | Nguyễn Hữu Trí"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
              web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results && results.length <= 0) return null;
  return (
   <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar moives</h2>
      <div className="movie-list">
      <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
        {results.length > 0 && results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
      </Swiper>
    </div> 
   </div>
  );
}

export default MovieDetailsPage;
