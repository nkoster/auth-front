import { useState } from 'react'

export default function Login({getTokens}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)

    const onChangeUsername = evt => setUsername(evt.target.value)
    const onChangePassword = evt => setPassword(evt.target.value)

    const onLogin = async _ => {
        const rawResponse = await fetch('https://auth.w3b.net/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
        const tokens = await rawResponse.json()
        if (tokens.error) setErr(true)
        tokens.username = username
        getTokens(tokens)
    }

    return (
        <div>
            <h2>login page</h2>
            {err ? <h2>error</h2> : null}
            <input value={username} type='text' onChange={onChangeUsername} />
            <input value={password} type='password' onChange={onChangePassword} />
            <button onClick={onLogin}>login</button>
            <div>{username}</div>
        </div>
    )

}
