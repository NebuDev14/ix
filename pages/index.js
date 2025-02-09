import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link.js";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { ordinal_suffix_of } from "../lib/ordinal.js";
import Image from "next/image";
import Logo from "../public/assets/logo.png";
import ShapeRain from "../components/effects/ShapeRain.js";
import { Parallax } from "react-scroll-parallax";
import styles from "../styles/Home.module.css";
import Bg from "../public/atomhackspic.jpg";
import About from "../components/landing/about.js";
import Sponsors from "../components/landing/sponsor.js";

function Index() {
  const { data: session } = useSession();
  const years = useMotionValue(1);
  const yearsRender = useTransform(years, (latest) => ordinal_suffix_of(Math.round(latest)));

  useEffect(() => {
    const animation = animate(years, 9, { duration: 2 });

    return animation.stop;
  }, [years]);

  return (
    <div className="overflow-hidden text-white ">
      <div className="absolute top-0 left-0 !w-full !h-full bg-black opacity-[.82] border-b-8 border-green-500" />
      <div className="top-0 left-0 overflow-hidden !w-full !h-full absolute">
        <Image
          layout="responsive"
          src={Bg}
          alt="atomhacks 2019"
          priority
          quality={40}
          objectFit="cover"
          objectPosition={"center"}
          className="absolute -z-10"
        />
      </div>
      <div className="z-50 text-white opacity-100">
        <ShapeRain count={10} />
        <Parallax y={[20, -20]}>
          <div className="flex grow items-center  justify-center min-h-[calc(100vh-64px)] ">
            {/* Left side of page */}
            <div className="flex items-end justify-end mr-12 basis-1/2">
              <div className={styles.logo}>
                <Image className="w-64 h-72" src={Logo} alt="AtomHacks"></Image>
              </div>
            </div>

            {/* Right side of page */}
            <div className="flex flex-col items-start justify-start ml-6 basis-1/2">
              <h1 className="mb-2 text-5xl font-thin">
                Bronx Science&apos;s <motion.b className="text-green-500">{yearsRender}</motion.b>
                <br />
                Annual Hackathon
              </h1>
              <h1 className="py-2 text-xl font-semibold">March 18th, 2023</h1>
              <p className="mb-4 font-medium break-words">
                Explore, build, innovate. Come join us for 12 full hours <br /> of creativity, excitement, and building!
              </p>
              {session ? (
                <Link href="/dashboard">
                  <button className="relative font-bold border-yellow-400 border-2 rounded-lg bg-transparent py-2.5 px-5 uppercase transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-yellow-400 before:transition-transform before:duration-300 before:content-[''] before:hover:scale-x-100">
                    CONTINUE TO DASHBOARD
                  </button>
                </Link>
              ) : (
                <button
                  className="relative font-bold border-green-500 border-2 rounded-lg bg-transparent py-2.5 px-5 uppercase transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-500 before:transition-transform before:duration-300 before:content-[''] before:hover:scale-x-100"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                  REGISTER
                </button>
              )}
            </div>
          </div>
        </Parallax>
      </div>
      <div className=" bg-zinc-900">
        <About />
        <Sponsors />
      </div>
    </div>
  );
}

export default Index;
