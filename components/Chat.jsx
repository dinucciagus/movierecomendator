import React from "react";
import Optionmovies from "./optionmovies";
import { useChat } from "../hooks/useChat";
const logo =
  "https://drive.google.com/uc?export=download&id=1w11pXNy_2sfFc5uch_m4t9v4VE2tym2p";
const bot =
  "https://drive.google.com/uc?export=download&id=1rqv--nJ3IMfRiFzWQHS7BXLacPW6VoD2";
const user =
  "https://drive.google.com/uc?export=download&id=1ikrhIBYa_JQgn9YJkFXzju54japeUD-9";

const Chat = () => {
  const {
    handleInput,
    handleFormSubmit,
    handleRefresh,
    chatWindowRef,
    inputRef,
    loading,
    value,
    messages,
  } = useChat();
  return (
    <div className="z-20 flex flex-col items-center justify-center w-full h-full p-6 mx-2 shadow-lg lg:mx-0 lg:w-3/5 bg-lightred rounded-3xl drop-shadow shadow-richblack">
      <img
        height={140}
        width={140}
        src={logo}
        className="w-24 h-24 lg:h-32 lg:w-32"
      />
      <h1 className="w-full py-4 font-sans text-xl font-bold text-center lg:text-3xl text-richblack">
        Lets talk a little and I will recommend you a movie to watch!
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
                    <div className="flex items-center justify-center p-4 font-semibold shadow-sm rounded-2xl bg-grayblue bg-opacity-30 drop-shadow shadow-grayblue ">
                      {message.content}
                      <img src={user} className="w-12 h-12 ml-2 rounded-full" />
                    </div>
                  ) : message.role === "assistant" ? (
                    message.content.includes("|") ? (
                      <Optionmovies
                        bot={bot}
                        message={message}
                        length={messages.length - 1}
                        index={index}
                      />
                    ) : (
                      <div className="flex items-center justify-center p-4 font-semibold shadow-sm rounded-2xl bg-red bg-opacity-20 drop-shadow shadow-grayblue ">
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
