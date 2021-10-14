import { useState } from "react"

const Connect = ({ onConnect }) => {

    const [name, setName] = useState('')

    return (
        <div className="container" >
            <h1>What's your name sir? </h1>
            <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => name ? onConnect({ name }) : null} >Connect</button>
      </div>
    )
}

export default Connect