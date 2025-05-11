import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/layouts/inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/layouts/inputs/ProfilePhotoSelector'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ''

    if (!fullName) {
      setError('Porfavor insira o seu nome')
      return
    }


    if (!validateEmail(email)) {
      setError("Porfavor insira um email válido.")
      return
    }


    if (!password) {
      setError("Insira a senha.")
      return
    }

    setError('')


    // api pra cadastrar e tals
  }

  return (
    <AuthLayout>
      <div className=' lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className=' text-xl font-semibold text-black'>Criar uma Conta</h3>
        <p className=' text-xs text-slate-700 mt-[5px] mb-6'>
          Crie uma conta inserindo as informações abaixo.
        </p>

        <form onSubmit={handleSignUp}>
          <div className="flex flex-col md:flex-row gap-4 items-start mb-4">
            <div className="flex-1 w-full">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label='Nome Completo:'
                placeholder='Matheus'
                type='text'
              />
            </div>

            <div className="md:mt-0">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>
          </div>

          <div className="mt-4">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email:"
              placeholder="email@exemplo.com"
              type="text"
            />
          </div>

          <div className="mt-4">
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Senha:"
              placeholder="*******"
              type="password"
            />
          </div>

          {error && <p className=' text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className=' btn-primary'>
            CADASTRAR
          </button>

          <p className=' text-[13px] text-slate-800 mt-3'>
            Já tem uma conta? {' '}
            <Link className=' font-medium text-primary underline' to='/login'>
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp