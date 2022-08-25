import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/poke">
        <a>GO Poke Page</a>
      </Link>
    </div>
  );
};

export default Home;
