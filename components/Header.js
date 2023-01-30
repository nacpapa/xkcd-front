import { Container, Text } from "@nextui-org/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className='flex justify-between align-center p-4 max-w-xl m-auto'>
      <h1 className='font-bold'>
        next <span className='font-light'>xkcd</span>
      </h1>

      <nav>
        <ul className='flex flex-row gap-2 '>
          <li>
            <Link href='/' className='text-sm font-bold'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/about' className='text-sm font-bold'>
              About
            </Link>
          </li>
          <li>
            <Link href='/search' className='text-sm font-bold'>
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
