import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/layouts/inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axios.instance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Porfavor insira um email válido.")
      return
    }


    if (!password) {
      setError("Insira a senha.")
      return
    }

    setError('')

    //chamar a api de login aq depois
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })
      const { token, user } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      }
      else {
        setError('Alguma coisa deu errado. Tente novamente mais tarde')
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Bem vindo de volta!</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Coloque seu usuário e senha para entrar</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email:"
            placeholder="email@exemplo.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Senha:"
            placeholder="*******"
            type="password"
          />

          {error && <p className=' text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className=' btn-primary'>
            LOGIN
          </button>

          <p className=' text-[13px] text-slate-800 mt-3'>
            Não tem uma conta? {' '}
            <Link className=' font-medium text-primary underline' to='/signup'>
              Cadastrar
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login