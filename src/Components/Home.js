import React from 'react'
import { app } from 'firebase'


const Home = () => {
    return(
        <div>
            <h1> Home</h1>
            <button onclick={() => app.auth().signOut()}> Sign Out</button>
        </div>
    )
}

export default Home