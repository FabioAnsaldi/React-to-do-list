import React from 'react'
import Link from 'next/link'

const Header = () => (
    <div>
        <Link href="/">
            <a title="Home Page">Home</a>
        </Link>
        <span>&nbsp;</span>
        <Link href="/about">
            <a title="About Page">About</a>
        </Link>
    </div>
);

export default Header