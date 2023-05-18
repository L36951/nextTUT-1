import Link from "next/link"
import Image from "next/image"
export const HomePage = ({data})=>{
    return(
    <main className={``}>
    {data.map(ev=><Link href={`/events/${ev.id}`} key={ev.id} passHref><Image width={200} height={200} alt={ev.title} src={ev.image} /><h2>{ev.title}</h2><p>{ev.description}</p></Link>)}

  </main>
  )
}