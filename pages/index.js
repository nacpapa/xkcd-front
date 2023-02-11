import Head from "next/head";
import { Inter } from "@next/font/google";
import Header from "../components/Header";
import fs from "fs/promises";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ lastComics }) {
  return (
    <>
      <Head>
        <title>XKCD - comics</title>
        <meta name='description' content='Comics for developers' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        <h2 className='text-3xl font-bold text-center mb-10'>Latest Comics</h2>
        <section className='grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3'>
          {lastComics.map((comic) => (
            <Link
              key={comic.id}
              href={`/comic/${comic.id}`}
              className='mb-4 pb-4 m-auto'>
              <h3 className='font-bold text-sm text-center pb-2'>
                {comic.title}
              </h3>
              <Image
                width={comic.width}
                height={comic.height}
                layout='intrinsic'
                objectFit='contain'
                src={comic.img}
                alt={comic.alt}
              />
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir("./comics");
  const lastComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = lastComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf-8");
    return JSON.parse(content);
  });
  const lastComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      lastComics,
    },
  };
}
