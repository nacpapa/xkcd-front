import Head from "next/head";
import { Inter } from "@next/font/google";
import { Card, Container, Row, Text } from "@nextui-org/react";
import Header from "../components/Header";
import fs from "fs/promises";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ lastComics }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        <h2 className='text-3xl font-bold text-center'>Latest Comics</h2>
        <section className='grid grid-cols-2 gap-2 max-w-md m-auto'>
          {lastComics.map((comic) => (
            <Link key={comic.id} href={`/comic/${comic.id}`}>
              <Image
                width='300'
                height='300'
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
