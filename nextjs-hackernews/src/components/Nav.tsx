import Link from 'next/link'

function Nav() {
  return (
    <header className="header">
      <nav className="inner">
        <Link href="/">
          <strong>HN</strong>
        </Link>
        <Link href="/new">
          <strong>New</strong>
        </Link>
        <Link href="/show">
          <strong>Show</strong>
        </Link>
        <Link href="/ask">
          <strong>Ask</strong>
        </Link>
        <Link href="/job">
          <strong>Jobs</strong>
        </Link>
        <a className="github" href="https://nextjs.org/" target="_blank" rel="noreferrer">
          Built with Next.js
        </a>
      </nav>
    </header>
  );
}

export default Nav;
