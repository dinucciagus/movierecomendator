import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import Optionmovies from "./optionmovies";
const logo =
  "https://drive.google.com/uc?export=download&id=1w11pXNy_2sfFc5uch_m4t9v4VE2tym2p";
const bot =
  "https://drive.google.com/uc?export=download&id=1rqv--nJ3IMfRiFzWQHS7BXLacPW6VoD2";
const user =
  "https://drive.google.com/uc?export=download&id=1ikrhIBYa_JQgn9YJkFXzju54japeUD-9";
const initialstate = [
  {
    role: "system",
    content:
      "You are MovieBot an expert bot recommending movies to watch, an automated service to help people choose a movie. \
  You first greet the user,\
   then collect some information as if the user is under or over 18 years all (if the user already provide the information, there is no need to do the questions) ,\
   then ask if the user prefer to be sugger a random movie or answear a few questions \
   if the user responds that he want a random movie please search for the most liked or best ranking movies and suggest two of those movies with the structure i will show you, i leave you an example so you use the same structure as a template: ```Great! Based on the most liked and best ranking movies, I have two options for you:| Name | Description | Duration  | Language | Image |The Godfather | The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. | 2h 55m | English | Image Link: https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg |The Shawshank Redemption | Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. | 2h 22m | English | Image Link: https://m.media-amazon.com/images/I/519NBNHX5BL._AC_UF894,1000_QL80_.jpg |What do you think of these options, Agustina? Are they good for you or do you want me to suggest something else?```   \
  if the user want to respond to the questions ask him the questions below\
   what are the two favorites movies, what kind of movie do the user like?(romantic,terror,accion,drama,suspence,anime,fantasy,comedy,etc), what language do he prefere, how much time does he have to see the movie, ask if he prefere a particular director \
  if the user ask for a special director be sure that the movies that you recomend are directed by that person, and if he ask for a specific actor be sure that that actor acts in the movies you suggest\
   You wait to collect the hole information and only then you deliver the user two options of movies base on all the preference that the user provided \
  when you provide the two optiones, do it with:( movie name), description:(short description of the movie, not more than 50 words), duration:(duration of the movie), language:(original language of the movie), image: image of the cover of the movie the link should end in `.jpg`. the answear with the two suggestion should always have this structure. I will give you an example with two diferent movies so that you can use it as template:```Alright then! Based on your preferences, I have two movie options for you:\
   | Name | Description | Duration | Language |  |\
  The Lord of the Rings: The Fellowship of the Ring | A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed. | 2h 58m | English | Image Link: https://m.media-amazon.com/images/I/A1abi3dnL9L._RI_.jpg\
  |Fantastic Beasts and Where to Find Them | The adventures of writer Newt Scamander in New York's secret community of witches and wizards seventy years before Harry Potter reads his book in school. | 2h 13m | English | Image Link: https://m.media-amazon.com/images/I/91PdOec4bFL._SY445_.jpg |\
  What do you think of these options? Are they good for you or do you want me to suggest something else?``` \
  ask the user if the options are good for them or if they want another \
  if the user dont like the options and wants more options provide two more with the same structure than before\
  if the user is under 18 only provide options that are suitable for minors if the user ask for a movie that is porno or an ilegal content just respond that this app has not information of such things, that please ask for another content  \
  You respond in a short, very conversational friendly style. \
  you should take the information about the movies and by not means invent anything. the movies and all the content related to them should be real when the user is satisfy with the movies, ask the user if you can assist with anything else. if the user responds no, just say goodbye in a friendly way. if the user is a minor between 4 and 12 years old please speak to him in a more informal and dont ask how much time does he got to see the movie, or if he prefers a particular director,or what kind of movie, just ask which are his favorite movies and sugger two diferent movies,  ",
  },
  {
    role: "assistant",
    content:
      "Hey there! I am moviebot and I am here to assist you! Can you tell me your name?",
  },
];
const Chat = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  // const lastMessageRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    chatWindowRef.current.scrollTo(0, chatWindowRef.current.scrollHeight);
  }, [messages]);

  const handleInput = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    const chatHistory = [...messages, { role: "user", content: value }];
    setMessages(chatHistory);
    // if (lastMessageRef.current) {
    //   lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    // }
    setValue("");
    setLoading(true);
    const response = await fetch("/api/openAIChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
    });
    const data = await response.json();
    setLoading(false);
    setMessages([
      ...chatHistory,
      {
        role: "assistant",
        content: data.result.choices[0].message.content,
      },
    ]);
    // if (lastMessageRef.current) {
    //   lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    // }
  });

  const handleRefresh = useCallback(() => {
    inputRef.current?.focus();
    setValue("");
    setMessages(initialstate);
  });

  return (
    <div className="z-20 flex flex-col items-center justify-center w-full h-full p-6 mx-2 shadow-lg lg:mx-0 lg:w-3/5 bg-lightred rounded-3xl drop-shadow shadow-richblack">
      <img
        height={140}
        width={140}
        src={logo}
        className="w-24 h-24 lg:h-32 lg:w-32"
      />
      <h1 className="w-full py-4 font-sans text-xl font-bold text-center lg:text-3xl text-richblack">
        Let's talk a little and I will recommend you a movie to watch!
      </h1>
      <div className="flex flex-col w-full h-screen overflow-hidden shadow-md rounded-2xl drop-shadow shadow-richblack">
        <div
          className="items-center justify-center flex-1 overflow-y-auto bg-light"
          ref={chatWindowRef}
        >
          <div className="flex justify-center w-full p-2">
            <button
              onClick={handleRefresh}
              className="fixed z-40 p-2 font-bold rounded-full lg:px-6 lg:py-4 text-md md:text-xl bg-red text-light"
            >
              Start a new conversation
            </button>
          </div>
          <div className="w-full mx-auto">
            {messages.map((message, index) => (
              <div key={index} className="flex">
                <div
                  className={`${
                    message.role === "user" ? "ml-auto" : "mr-auto"
                  } mb-4 rounded-md bg-primary text-richblack px-4 py-2  ${
                    index === messages.length - 1 ? " animate-pulse-short " : ""
                  } `}
                >
                  {message.role === "user" ? (
                    <div
                      // ref={messages.length - 1 === index ? lastMessageRef : null}
                      className="flex items-center justify-center p-4 font-semibold shadow-sm rounded-2xl bg-grayblue bg-opacity-30 drop-shadow shadow-grayblue "
                    >
                      {message.content}
                      <img src={user} className="w-12 h-12 ml-2 rounded-full" />
                    </div>
                  ) : message.role === "assistant" ? (
                    message.content.includes("|") ? (
                      <Optionmovies
                        bot={bot}
                        message={message}
                        // lastMessageRef={lastMessageRef}
                        length={messages.length - 1}
                        index={index}
                      />
                    ) : (
                      <div
                        // ref={
                        //   messages.length - 1 === index ? lastMessageRef : null
                        // }
                        className="flex items-center justify-center p-4 font-semibold shadow-sm rounded-2xl bg-red bg-opacity-20 drop-shadow shadow-grayblue "
                      >
                        <img
                          src={bot}
                          className="w-12 h-12 mr-2 rounded-full"
                        />
                        {message.content}
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            ))}
            {loading ? (
              <div key={"loading"} className="flex">
                <div
                  className={`
                  mr-auto
                 mb-4 rounded-md bg-primary text-richblack px-4 py-2  `}
                >
                  <div className="flex items-center justify-center p-4 font-semibold shadow-sm rounded-2xl bg-red bg-opacity-20 drop-shadow shadow-grayblue animate-pulse ">
                    <img src={bot} className="w-12 h-12 mr-2 rounded-full" />
                    Thinking ...
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
          className="px-4 py-2 bg-blue"
        >
          <div className="flex items-center">
            <input
              name="message"
              type="text"
              placeholder="Type your message here..."
              ref={inputRef}
              onChange={handleInput}
              value={value}
              className="flex-1 px-4 py-2 mr-2 rounded-md focus:outline-none focus:ring focus:ring-primary text-richblack"
            />
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white rounded-md bg-primary"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
