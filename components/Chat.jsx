import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
const bot =
  "https://drive.google.com/uc?export=download&id=1rqv--nJ3IMfRiFzWQHS7BXLacPW6VoD2";
const user =
  "https://drive.google.com/uc?export=download&id=1ikrhIBYa_JQgn9YJkFXzju54japeUD-9";
const initialstate = [
  {
    role: "system",
    content:
      "You are MovieBot an expert bot recommending movies to watch, an automated service to help people choose a movie. \
  You first greet the user, then collect some information as if the user is under or over 18 years all ,what are the two favorites movies, what kind of movie do the user like?(romantic,terror,accion,drama,suspence,anime,fantasy,comedy,etc), what language do he prefere, how much time does he have to see the movie, ask if he prefere a particular director \
  You wait to collect the hole information and only then you deliver the user two options of movies base on all the preference that the user provided \
  when you provide the two optiones, do it by listing them with the structure name of movie:(name), description:(short description of the movie, not more than 50 words), duration:(duration of the movie), language:(original language of the movie) \
  ask the user if the options are good for them or if they want another \
  if the user dont like the options and wants more options provide two more with the same structure than before\
  if the user is under 18 only provide options that are suitable for minors if the user ask for a movie that is porno or an ilegal content just respond that this app has not information of such things, that please ask for another content  \
  You respond in a short, very conversational friendly style. \
  you should take the information about the movies and by not means invent anything. the movies and all the content related to them should be real when the user is satisfy with the movies, ask the user if you can assist with anything else. if the user responds no, just say goodbye in a friendly way.",
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

  const inputRef = useRef(null);

  const handleInput = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    const chatHistory = [...messages, { role: "user", content: value }];
    const response = await fetch("/api/openAIChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
    });
    const data = await response.json();
    setValue("");
    setMessages([
      ...chatHistory,
      { role: "assistant", content: data.result.choices[0].message.content },
    ]);
  });

  //   const handleKeyDown = async (e) => {
  //     // e.preventDefault();
  //     if (e.key === "Enter") {
  //       const chatHistory = [...messages, { role: "user", content: value }];
  //       const response = await fetch("/api/openAIChat", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ messages: chatHistory }),
  //       });
  //       console.log("response that arrives from backend", response);
  //       const data = await response.json();
  //       setValue("");
  //       setMessages([
  //         ...chatHistory,
  //         { role: "assistant", content: data.result.choices[0].message.content },
  //       ]);
  //       console.log("messages final", messages);
  //     }
  //   };
  const handleRefresh = useCallback(() => {
    inputRef.current?.focus();
    setValue("");
    setMessages(initialstate);
  });
  return (
    <div className="flex flex-col h-screen w-full  rounded-2xl overflow-hidden  drop-shadow  shadow-md  shadow-richblack">
      <div className="flex-1 overflow-y-auto bg-light justify-center items-center">
        <div className="w-full flex justify-center p-2">
          <button
            onClick={handleRefresh}
            className="bg-red px-4 py-2 rounded-full text-light font-bold text-lg"
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
                  <div className="flex items-center justify-center bg-grayblue bg-opacity-30 p-4 rounded-full font-semibold drop-shadow shadow-sm shadow-grayblue ">
                    {message.content}
                    <img src={user} className="ml-2 rounded-full w-12 h-12" />
                  </div>
                ) : message.role === "assistant" ? (
                  <div className="flex items-center justify-center bg-red bg-opacity-20 p-4 rounded-full font-semibold drop-shadow shadow-sm shadow-grayblue ">
                    <img src={bot} className="mr-2 rounded-full w-12 h-12" />
                    {message.content}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className=" px-4 py-2 bg-blue"
      >
        <div className="flex items-center">
          <input
            name="message"
            type="text"
            placeholder="Type your message here..."
            onChange={handleInput}
            value={value}
            className="flex-1 rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring focus:ring-primary text-richblack"
          />
          <button
            type="submit"
            className="rounded-md px-4 py-2 bg-primary text-white font-semibold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;

// import React, { useState, useRef, useCallback } from "react";
// const bot =
//   "https://drive.google.com/uc?export=download&id=1rqv--nJ3IMfRiFzWQHS7BXLacPW6VoD2";
// const user =
//   "https://drive.google.com/uc?export=download&id=1ikrhIBYa_JQgn9YJkFXzju54japeUD-9";
// const initialstate = [
//   {
//     role: "system",
//     content:
//       "You are MovieBot an expert bot recommending movies to watch, an automated service to help people choose a movie. \
//   You first greet the user, then collect some information as if the user is under or over 18 years all ,what are the two favorites movies, what kind of movie do the user like?(romantic,terror,accion,drama,suspence,anime,fantasy,comedy,etc), what language do he prefere, how much time does he have to see the movie, ask if he prefere a particular director \
//   You wait to collect the hole information and only then you deliver the user two options of movies base on all the preference that the user provided \
//   when you provide the two optiones, do it by listing them with the structure name of movie:(name), description:(short description of the movie, not more than 50 words), duration:(duration of the movie), language:(original language of the movie) \
//   ask the user if the options are good for them or if they want another \
//   if the user dont like the options and wants more options provide two more with the same structure than before\
//   if the user is under 18 only provide options that are suitable for minors if the user ask for a movie that is porno or an ilegal content just respond that this app has not information of such things, that please ask for another content  \
//   You respond in a short, very conversational friendly style. \
//   you should take the information about the movies and by not means invent anything. the movies and all the content related to them should be real when the user is satisfy with the movies, ask the user if you can assist with anything else. if the user responds no, just say goodbye in a friendly way.",
//   },
//   {
//     role: "assistant",
//     content:
//       "Hey there! I am moviebot and I am here to assist you! Can you tell me your name?",
//   },
// ];

// const Chat = () => {
//   const [value, setValue] = useState("");
//   const [messages, setMessages] = useState(initialstate);

//   const inputRef = useRef(null);

//   const handleInput = useCallback((e) => {
//     setValue(e.target.value);
//   }, []);

//   const handleFormSubmit = useCallback(async () => {
//     const chatHistory = [...messages, { role: "user", content: value }];
//     const response = await fetch("/api/openAIChat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ messages: chatHistory }),
//     });
//     console.log("response that arrives from backend", response);
//     const data = await response.json();
//     setValue("");
//     setMessages([...chatHistory, { role: "assistant", content: data.content }]);
//     console.log("messages final", messages);
//   }, [messages, value]);

//   const handleRefresh = useCallback(() => {
//     inputRef.current?.focus();
//     setValue("");
//     setMessages(initialstate);
//   }, []);

//   return (
//     <div className="flex flex-col h-screen w-full  rounded-2xl overflow-hidden  drop-shadow  shadow-md  shadow-richblack">
//       <div className="flex-1 overflow-y-auto bg-light justify-center items-center">
//         <div className="w-full flex justify-center p-2">
//           <button
//             onClick={handleRefresh}
//             className="bg-red px-4 py-2 rounded-full text-light font-bold text-lg"
//           >
//             Start a new conversation
//           </button>
//         </div>
//         <div className="w-full mx-auto">
//           {messages.map((message, index) => (
//             <div key={index} className="flex">
//               <div
//                 className={`${
//                   message.role === "user" ? "ml-auto" : "mr-auto"
//                 } mb-4 rounded-md bg-primary text-richblack px-4 py-2  ${
//                   index === messages.length - 1 ? " animate-pulse-short " : ""
//                 } `}
//               >
//                 {message.role === "user" ? (
//                   <div className="flex items-center justify-center bg-grayblue bg-opacity-30 p-4 rounded-full font-semibold drop-shadow shadow-sm shadow-grayblue ">
//                     {message.content}
//                     <img src={user} className="ml-2 rounded-full w-12 h-12" />
//                   </div>
//                 ) : message.role === "assistant" ? (
//                   <div className="flex items-center justify-center bg-red bg-opacity-20 p-4 rounded-full font-semibold drop-shadow shadow-sm shadow-grayblue ">
//                     <img src={bot} className="mr-2 rounded-full w-12 h-12" />
//                     {message.content}
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//           ))}
//         </div>
//         <form
//           className="w-full mx-auto p-2"
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleFormSubmit();
//           }}
//         >
//           <input
//             ref={inputRef}
//             type="text"
//             className="w-full border-2 border-gray-300 p-2 rounded-md"
//             placeholder="Type your message here..."
//             value={value}
//             onChange={handleInput}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Chat;
