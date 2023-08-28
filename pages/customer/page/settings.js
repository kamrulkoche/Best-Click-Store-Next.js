import Link from 'next/link';
import dynamic from "next/dynamic";

const Title= dynamic(()=>import('../../best_click_store/layout/title'),{
  ssr:false,
})
const Clayout= dynamic(()=>import( '../layout/clayout'),{
  ssr:false,
})
export default function Home() {
  return (

    <>
    <Title page="Setting"></Title>
    <Clayout>
    <h1 align="center">Settings</h1>
   
   
 
   
    
   </Clayout>




   
   
   </>
   
  )
}