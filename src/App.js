import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Login from './pages/Login'
import { useState, useEffect } from 'react'
import { getCookie, setCookie, eraseCookie } from './cookies'

export default function App() {

  const [Tokens, setTokens] = useState({})

  const getTokens = tokens => setTokens(tokens)

  useEffect(_ => {
    const cookie = getCookie('tokens')
    if (!cookie) {
      setCookie('tokens', JSON.stringify(Tokens))
    }
    const tokens = JSON.parse(cookie)
    if (tokens) setTokens(tokens)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(_ => {
    if (Tokens.accessToken) {
      setCookie('tokens', JSON.stringify(Tokens))
    }
  }, [Tokens])

  if (!Tokens.accessToken) return <Login getTokens={getTokens} />

  const Logout = async () => {
    try {
      await fetch('http://localhost:3011/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })  
    } catch(err) {
      console.log(err.message)
    }
    eraseCookie('tokens')
    setTokens({})
  }

  return (
    <Router>
      <div>
        <nav>
          {Tokens.username}
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/' onClick={Logout} >Logout</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}
