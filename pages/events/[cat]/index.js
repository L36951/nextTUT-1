import Image from 'next/image';
import Link from 'next/link';

const EventsCatPage = ({data,pageName}) => {

    return (
        <div>

            <h1>Event in {pageName}</h1>
            <div>
                
                {data.map(ev=>(
                    
                    <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
                        <Image width={300} height={300} alt={ev.title} src={ev.image} />
                        <h2>{ev.title}</h2>
                        <p>{ev.description}</p>
                    </Link>
                ))}
            </div>
    

        </div>
    )
}

export default EventsCatPage;


export const getStaticPaths = async () => {
    const { events_categories } = await import('/data/data.json');
    const allPaths = events_categories.map((ev) => {
        return {

            params: {
                cat: ev.id.toString()
            }
        }


    })
    
    return {
        paths:allPaths,
        fallback:false
    }
}

export const getStaticProps= async(context)=>{
   
    const id = context?.params.cat;
    const { allEvents } = await import('/data/data.json');
    const data = allEvents.filter(ev=>ev.city===id)
   
    return{
        props:{data,pageName:id}
    };
}