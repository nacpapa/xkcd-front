import Head from "next/head";
import Header from "components/Header";
import Image from "next/image";
import { readFile, stat } from "fs/promises";
import Link from "next/link";

export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  hasNext,
  prevId,
  nextId,
}) {
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
        <section className='max-w-lg m-auto'>
          <h1 className='font-bold'>{title}</h1>
          <Image width={width} height={height} src={img} alt={alt} />
          <p>{alt}</p>
          {/* Create pagination with nextId and prevId if available */}
          <div className='flex justify-between'>
            {hasPrevious && (
              <Link href={`/comic/${prevId}`} className='text-blue-500'>
                Previous
              </Link>
            )}
            {hasNext && (
              <Link href={`/comic/${nextId}`} className='text-blue-500'>
                Next
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const files = await fs.readdir("./comics");

  return {
    paths: [{ params: { id: "2500" } }],
    // si intentas entrar a una ruta que no existe, te va a mostrar la página de error 404
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf-8");
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId,
    },
  };
}
