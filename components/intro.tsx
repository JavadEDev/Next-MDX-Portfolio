import Image from "next/image";

import authorImage from "@/public/images/authors/myself.png";
const Intro = () => {
  return (
    <section className="flex items-center justify-center gap-x-1 gap-y-4">
      <div className="mt-2 flex-1 md:mt-0">
        <h1 className="title no-underline">Hey, I&#34;m Javad.</h1>
        <p className="mt-3 text-xl font-light">
          I&#34;m a Frontend developer based in Kristiansand, Norway. I&#34;m
          passionate about learning new technologies.
        </p>
      </div>
      <div className="relative">
        <Image
          priority
          alt="Javad Esmati"
          className="flex-1 rounded-lg grayscale"
          height={175}
          src={authorImage}
          width={175}
        />
      </div>
    </section>
  );
};

export default Intro;
