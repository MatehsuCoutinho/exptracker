import React from 'react'
import CARD_2 from '../../assets/images/card2.png'
import { RiStairsLine } from "react-icons/ri";


const AuthLayout = ({ children }) => {
    return (
        <div className='flex h-screen bg-white'>
            <div className='w-full md:w-1/2 px-8 md:px-16 pt-12 pb-8 flex flex-col'>
                <div className='mb-8'>
                    <h2 className='text-3xl font-bold text-violet-800 mb-1'>Controle de Despesas</h2>
                    <p className='text-gray-600'>Organize suas finanças de forma inteligente</p>
                </div>
                <div className='flex-grow flex items-center justify-center'>
                    {children}
                </div>
            </div>

            <div className='hidden md:flex w-1/2 h-screen bg-gradient-to-b from-violet-400 to-violet-100 relative'>
                <div className='absolute top-0 left-0 w-full h-full opacity-10'>
                    <div className='absolute top-20 right-20 w-32 h-32 rounded-full bg-white'></div>
                    <div className='absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-white'></div>
                </div>
                
                <div className='relative z-10 bg-white rounded-2xl shadow-xl p-8 w-80 self-center mx-auto my-auto'>
                    <div className='text-center mb-6'>
                        <h3 className='text-2xl font-bold text-violet-800 mb-2'>Veja suas despesas</h3>
                        <p className='text-gray-600'>Acesse todas as funcionalidades</p>
                    </div>
                    
                    <div className='space-y-4'>
                        <div className='flex items-center p-3 rounded-lg bg-violet-50'>
                            <div className='bg-violet-100 p-2 rounded-lg mr-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <h4 className='font-semibold text-gray-800'>Adicionar Renda</h4>
                                <p className='text-xs text-gray-500'>Registre novos ganhos</p>
                            </div>
                        </div>
                        
                        <div className='flex items-center p-3 rounded-lg bg-violet-50'>
                            <div className='bg-violet-100 p-2 rounded-lg mr-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </div>
                            <div>
                                <h4 className='font-semibold text-gray-800'>Adicionar Gasto</h4>
                                <p className='text-xs text-gray-500'>Controle seus custos</p>
                            </div>
                        </div>
                        
                        <div className='flex items-center p-3 rounded-lg bg-violet-50'>
                            <div className='bg-violet-100 p-2 rounded-lg mr-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className='font-semibold text-gray-800'>Dashboard</h4>
                                <p className='text-xs text-gray-500'>Visualize seus dados</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mt-8 pt-6 border-t border-gray-100 flex justify-center'>
                        <img 
                            src={CARD_2} 
                            alt="Controle financeiro" 
                            className='h-20 object-contain opacity-90' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout