import { useState, useEffect } from "react";
import parseMovieOptions from "@/utils/parsemovieopt";
const Optionmovies = ({ bot, message }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const movies = parseMovieOptions(message.content);
  return (
    <div className="flex items-center justify-center p-4 font-semibold shadow-sm rounded-2xl bg-red bg-opacity-20 drop-shadow shadow-grayblue ">
      {width > 600 ? (
        <div>
          <img src={bot} className="w-12 h-12 mr-2 rounded-full" />
          <div>
            <h1 className="py-2 text-xl">{message.content.split("|")[0]}</h1>
            <table className="bg-light rounded-xl ">
              <thead>
                <tr className="bg-lightred">
                  <th className="px-2">Name</th>
                  <th className="px-2">Description</th>
                  <th className="px-2">Duration</th>
                  <th className="px-2">Language</th>
                  {/* <th className="px-2">Image</th> */}
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.name}>
                    <td className="p-2 text-xl">{movie.name}</td>
                    <td className="p-2 px-4">{movie.description}</td>
                    <td className="p-2">{movie.duration}</td>
                    <td className="p-2">{movie.language}</td>
                    {/* <td>
                      <img
                        src={movie.imageLink}
                        alt={movie.name}
                        height={100}
                        width={100}
                      />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 className="py-2 text-xl">{message.content.split("\n")[7]}</h2>
          </div>
        </div>
      ) : (
        <div>
          <img src={bot} className="w-12 h-12 mr-2 rounded-full" />
          <div>
            <h1 className="py-2 text-xl">{message.content.split("|")[0]}</h1>
            <div className="bg-light rounded-xl ">
              {movies.map((movie) => (
                <div key={movie.name}>
                  <h1 className="p-2 text-xl">{movie.name}</h1>
                  <p className="p-2 px-4">description: {movie.description}</p>
                  <p className="p-2">duration: {movie.duration}</p>
                  <p className="p-2">language: {movie.language}</p>
                  <hr />
                </div>
              ))}
              <h2 className="py-2 text-xl">{message.content.split("\n")[7]}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Optionmovies;
