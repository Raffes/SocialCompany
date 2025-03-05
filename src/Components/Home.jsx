import React from 'react'
import Feed from './Feed/Feed'
import Head from './Helper/Head'

const Home = () => {
  return (
    <section className='container mt-2rem'>
      <Head title="Fotos" description="Home do site Social Company" />
      <Feed />
    </section>
  )
}

export default Home
