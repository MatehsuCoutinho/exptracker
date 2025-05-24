import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from './pages/auth/login'
import SignUp from './pages/auth/signup'
import Home from './pages/dashboard/Home'
import Income from './pages/dashboard/Income'
import Expense from './pages/dashboard/expense'
import UserProvider from './context/userContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/signup' exact element={<SignUp />} />
            <Route path='/dashboard' exact element={<Home />} />
            <Route path='/income' exact element={<Income />} />
            <Route path='/expense' exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOpetions={{
          classname: '',
          style: {
            fontSize: '13px'
          }
        }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  //checar logo se o token existe
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}