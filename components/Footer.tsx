import Image from "next/image";
import logo from "../public/logo.png";
import logoDark from "../public/logo-dark.png";

export default function Footer() {
  return (
    <footer className="p-6 flex justify-center absolute bottom-0 w-full">
      <div className="absolute -z-50 -bottom-[6rem] right-[60%] translate-x-1/2 translate-y-1/2 w-[25rem] h-[25rem] rounded-full opacity-50 filter blur-[100px] dark:bg-purple-950 bg-purple-400"></div>
      <div className="absolute -z-50 -bottom-[6rem] right-[40%] translate-x-1/2 translate-y-1/2 w-[25rem] h-[25rem] rounded-full opacity-50 filter blur-[100px] dark:bg-yellow-950 bg-yellow-300"></div>

      <a href="https://github.com/Drackass/" target="_blanck">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          className="z-10 hidden dark:inline"
        />
        <Image
          src={logoDark}
          alt="logo"
          width={50}
          height={50}
          className="z-10 dark:hidden"
        />
      </a>
    </footer>
  );
}
