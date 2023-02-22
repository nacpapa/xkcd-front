import Link from "next/link";

export default function Footer() {
  return (
    <footer className='text-center'>
      <Link href='https://xkcd.com/' target={"_blank"}>
        All comics by xkcd
      </Link>
    </footer>
  );
}
