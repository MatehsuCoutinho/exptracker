import React from 'react'
import CARD_2 from '../../assets/images/card2.png'

const AuthLayout = ({ children }) => {
    return (
        <div className='flex h-screen bg-white'>
            <div className='w-full md:w-[60vw] px-8 md:px-12 pt-8 pb-12 flex flex-col'>
                <h2 className='text-2xl font-bold text-violet-800 mb-2'>Controle de Despesas</h2>
                <p className='text-gray-600 mb-8'>Gerencie suas finanças de forma simples e eficiente</p>
                <div className='flex-grow flex items-center'>
                    {children}
                </div>
            </div>

            <div className='hidden md:flex w-[40vw] h-screen bg-gradient-to-br from-violet-100 to-indigo-100 relative overflow-hidden'>
                <div 
                    className='absolute inset-0 bg-auth-bg-img bg-cover bg-no-repeat bg-center opacity-20'
                    style={{ mixBlendMode: 'multiply' }}
                />
                
                <div className='absolute top-0 right-0 w-32 h-32 bg-violet-200 rounded-full transform translate-x-16 -translate-y-16'></div>
                <div className='absolute bottom-0 left-0 w-48 h-48 bg-indigo-200 rounded-full transform -translate-x-24 translate-y-24'></div>
                
                <div className='relative z-10 w-full flex items-center justify-center p-8'>
                    <img 
                        src={CARD_2} 
                        alt="gráfico" 
                        className='max-w-full max-h-[60vh] object-contain rounded-lg shadow-xl' 
                    />
                </div>
                
                <div className='absolute bottom-1/4 right-1/4 transform translate-x-1/4 bg-white p-6 rounded-xl shadow-2xl max-w-xs border border-violet-100'>
                    <div className='flex items-start'>
                        <div className='bg-violet-100 p-2 rounded-lg mr-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className='font-bold text-gray-800'>Gerencie suas despesas</h3>
                            <p className='text-2xl font-extrabold text-violet-700 mt-1'>R$ 4.200</p>
                            <p className='text-xs text-gray-500 mt-2'>Economize até 30% este mês</p>
                        </div>
                    </div>
                    <div className='mt-4 pt-4 border-t border-gray-100 flex justify-between items-center'>
                        <span className='text-xs font-medium text-gray-500'>Saldo disponível</span>
                        <span className='text-sm font-semibold text-green-500'>+12%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout