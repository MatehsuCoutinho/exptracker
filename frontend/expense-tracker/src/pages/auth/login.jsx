import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/layouts/inputs/Input'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => { }

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
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login