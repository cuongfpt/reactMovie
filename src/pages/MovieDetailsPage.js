import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { apiKey, fetcher } from '../config';

// https://api.themoviedb.org/3/movie/popular?api_key=cc272106f56d682df0e27b9810d9de53

const MovieDetailsPage = () => {
    const {movieId} = useParams();
    const {data,error} = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,fetcher
      );
    return (
      <>
        <div className="w-full h-screen" style={{backgroundImage:`url()`}}></div>
      </>
    );
};

export default MovieDetailsPage;