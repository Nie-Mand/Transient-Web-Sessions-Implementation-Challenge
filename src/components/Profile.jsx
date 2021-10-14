
const Profile = ({ user, onDisconnect }) => {
    return (
        <div className="container" >
            <h1>Hello {user.name}</h1>
            <button onClick={onDisconnect} >Logout</button>
      </div>
    )
}

export default Profile
