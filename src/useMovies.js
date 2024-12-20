import { useState, useEffect } from "react";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "1e75e89a";
  // use useEffect to fetch data so it only fetch once
  useEffect(
    function () {
      // controller  will be use to abort the preview fetch request if another fetch request created, special when a fetch create in search while every letter being typed
      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        setError("");
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          // check if there is data\
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      // if there is no search query setmovis to empty array and seterror to empty string
      // so it does show no movies found an no fetch will be made; only fetch when there is a valid query
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //use to close an open movie if there is a typing for a new search before
      //   handleCloseMovie();
      // call the fetch function
      fetchMovies();
      // returning the abort funcion
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, error, isLoading };
}
