import Image from 'next/image';
import { useRouter } from 'next/router';
import {useRef,useState} from 'react'
const EventPage = ({data}) => {
    const inputEmail = useRef()
    const router = useRouter();
    const [message,setMessage] = useState('')

    const onSubmit= async(e)=>{
        e.preventDefault();
        
        const emailValue = inputEmail.current.value;
        
        const eventId = router?.query.id;
        
        const validRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!emailValue.match(validRegex)){
            setMessage("Please introduce a correct email address")
        }   

        try{// fetch request
            const response = await fetch('/api/email-registration',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email:emailValue,eventId})
            });

          
            const data = await response.json();
            setMessage(data.message)
            inputEmail.current.value='';
        }catch(e){
            console.log("Error",e)
        }

    };

    return (
        <div>
            <Image src={data.image} width={1000} height={500} alt={data.title}/>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <form onSubmit={onSubmit} className='email_registration'>
        <input ref={inputEmail} id="email" placeholder='Please insert your email here'/>
        <button onClick={onSubmit} type="submit">submit</button>
        </form>
        <p>{message}</p>
        </div>
    )
}

export default EventPage;

export const getStaticPaths = async () => {
    const data = await import('/data/data.json');
    const allEvents = data.allEvents
    const allPaths = allEvents.map((path) => {
        return {
            params: {
                cat: path.city,
                id: path.id
            }
        }
    })
    return { paths: allPaths, fallback: false }
}

export const getStaticProps = async (context) => {
    
    const id = context.params.id;
    const {allEvents} = await import('/data/data.json')
    const eventData = allEvents.find(ev=>(
        id===ev.id
    ))
   
    return {
        props: {data:eventData}
    }
}