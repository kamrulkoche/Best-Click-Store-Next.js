import Link from 'next/link';
import dynamic from "next/dynamic";
import React from 'react';
const Title= dynamic(()=>import('./best_click_store/layout/title'),{
  ssr:false,
})
const Layout= dynamic(()=>import( './best_click_store/layout/layout'),{
  ssr:false,
})
const Home = () => {
  // Your component code here
  return (
    <>
    <Title page="Home"></Title>
    <Layout>
    <h1>
      you can shop from here
    </h1>
    </Layout>


   
   
   </>
   
  );
};
export default Home;



  
 