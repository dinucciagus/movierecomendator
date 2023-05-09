import Image from "next/image";
import Footer from "@/components/footer";
import Chat from "@/components/Chat";

const bg =
  "https://drive.google.com/uc?export=download&id=1BvBWtyAhqAKEnQBjdKAwMDYYQae0XYte";
export default function Home() {
  return (
    // <div className="flex items-center justify-center w-screen h-screen max-h-screen py-4 bg-grayblue ">
    <div className="flex flex-col items-center justify-center w-screen h-screen max-h-screen py-4 bg-grayblue ">
      <img
        src={bg}
        className="absolute top-0 left-0 object-cover w-full h-full opacity-80"
      />
      <div className="flex items-center justify-center w-full h-5/6">
        <Chat />
      </div>
      <div className="z-40 flex items-end justify-end h-1/6 ">
        <Footer />
      </div>
    </div>
  );
}
