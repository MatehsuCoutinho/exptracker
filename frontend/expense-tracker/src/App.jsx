import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from './pages/auth/Login.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import Home from './pages/dashboard/Home.jsx'
import Income from './pages/dashboard/Income.jsx'
import Expense from './pages/dashboard/Expense.jsx'
import UserProvider from './context/userContext.jsx'
import { Toaster } from 'react-hot-toast'
import RecentTransactionsPage from './pages/dashboard/RecentTransactionsPage.jsx'

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
            <Route path='/recent' exact element={<RecentTransactionsPage/>}/>
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