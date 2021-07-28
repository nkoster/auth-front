import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Login from './pages/Login'
import { useState, useEffect } from 'react'

export default function App() {

  console.log(document.cookie)

  const [Tokens, setTokens] = useState({})
  const getTokens = tokens => setTokens(tokens)

  useEffect(_ => {
    console.log('AAP', Tokens)
  }, [Tokens])

  useEffect(_ => {
    const tokens = JSON.parse(document.cookie)
    if (tokens.accessToken) {
      setTokens(tokens)
    }
  }, [])

  if (!Tokens.accessToken) return <Login getTokens={getTokens} />

  document.cookie = JSON.stringify({ accessToken: Tokens.accessToken })

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
      console.log('AAAp', err)
    }
    setTokens({})
    document.cookie = JSON.stringify({})
  }

  return (
    <Router>
      <div>
        <nav>
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
          <Route path='/login'>
            <Login getTokens={getTokens} />
          </Route>
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

