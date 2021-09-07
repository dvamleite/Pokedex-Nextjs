import Link from 'next/link'



export default function Menu(){
    return(
        <>
        <div className="menu">
        <ul className="ulMenu">
            <li className ="liMenu">
                <Link href="/">
                <a>Home</a>
                </Link>
            </li>
        </ul>
        </div>
        </>
    )
}