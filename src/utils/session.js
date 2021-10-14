import Momemt from 'moment'
/*
    A Session contains the following
        - user: the Object that represents the User (in this example is just an object with a name attribute)
        - createdAt: the time when the Session has been created
        - lastTimeWasActive: the last time the user checked the website and was connected
*/


const MAX_INACTIVITY = 30
const MAX_TIME = null

const validate = session => {
    // This function verifies the Session Format, and Checks the Expiration Conditions
    if (!session) return null
    const { user, createdAt, lastTimeWasActive } = session
    if (!user || !createdAt || !lastTimeWasActive) return null 

    // check if 30 minutes inactivity
    const minutesPassed = (new Date() - new Date(lastTimeWasActive) ) / 60000
    if (minutesPassed >= MAX_INACTIVITY) return null

    // check if midnight has passed
    const currentMoment = Momemt()
    const createSessionMoment = Momemt(createdAt)

    // If its not the same day, than 00:00 has passed already
    if (currentMoment.date() !== createSessionMoment.date()) return null
    if (currentMoment.month() !== createSessionMoment.month()) return null
    if (currentMoment.year() !== createSessionMoment.year()) return null

    return session
}

export const createSession = user => {
    // This Function creates the Session Object then Stores it in the LocalStorage
    const session = { user, createdAt: new Date(), lastTimeWasActive: new Date() }
    localStorage.setItem('session', JSON.stringify(session))
}

const revisit = session => {
    // This Function updates the lastTimeWasActive attribute with the current time then Stores it in the LocalStorage
    if (!session) return
    console.log(session, typeof session)
    session.lastTimeWasActive = new Date()
    localStorage.setItem('session', JSON.stringify(session))
}

export const deleteSession = () => {
    // This Function deletes the Session from the LocalStorage if LoggedOut or the session Expired
    localStorage.removeItem('session')
}


export const getSession = () => {
    // This Function gets the Session from the LocalStorage and verifies it
    const sessionAsString = localStorage.getItem('session')
    const parsedSession = JSON.parse(sessionAsString)
    const validatedSession = validate(parsedSession)
    if (!validatedSession) deleteSession()
    revisit(validatedSession)
    return validatedSession
}
