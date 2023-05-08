import Image from "next/image";
import Chat from "@/components/Chat";
const logo =
  "https://drive.google.com/uc?export=download&id=1w11pXNy_2sfFc5uch_m4t9v4VE2tym2p";
const bg =
  "https://drive.google.com/uc?export=download&id=1BvBWtyAhqAKEnQBjdKAwMDYYQae0XYte";
export default function Home() {
  return (
    <div
      className={`h-screen w-screen  flex justify-center items-center py-6 bg-grayblue `}
    >
      <img
        src={bg}
        className="absolute top-0 left-0 h-full w-full object-cover opacity-80"
      />
      <div className="bg-lightred w-3/5 h-full  flex flex-col items-center justify-center p-6 rounded-3xl z-20 drop-shadow shadow-lg shadow-richblack">
        <img height={140} width={140} src={logo} />
        <h1 className="text-richblack font-sans font-bold text-3xl py-4">
          Let's talk a bit and I will recommend you a movie to watch!
        </h1>
        <Chat />
      </div>
    </div>
  );
}
