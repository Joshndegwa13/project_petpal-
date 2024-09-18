import React from 'react'
import landing from '../assets/images/landing.jpg'

const Landing = () => {
  return (
    <div>
        <div style={{
            backgroundImage : `url(${landing})`,
            backgroundSize : 'cover',   
            backgroundPosition : 'center',
            backgroundRepeat : 'no-repeat',
            height : '100vh',
            }}>
         <div>
            <nav className="relative">
              
                <div className="absolute top-8 left-8 text-red-500 font-extrabold text-4xl">
                    <button>PetPal</button>
                </div>

                
                <div className="absolute top-8 right-8 flex space-x-2">
                    
                    <div className="bg-red-600 rounded-xl py-3 px-5 w-28 h-14 text-xl text-white border-solid border-2 border-light-grey-500 text-center">
                        <button>Login</button>
                    </div>
                </div>
            </nav>
        </div>
        <div className="p-8 text-center">
            <div className="text-7xl font-black m-16">
                Take Better Care of Your Pet
            </div>
            <div className="flex justify-center my-4">
                <div className="bg-red-600 rounded-xl w-1/2 h-20 text-4xl text-white p-5 w11/12 max-w-lg">
                    <button>Get Started</button>
                </div>
            </div>
        </div>
        </div>
      
        <div className="border-solid border-2 border-light-grey-200 m-8 p-8 flex bg-red-600 rounded-xl">
            <div className="border-solid border-2 border-light-grey-200 m-4 p-4 bg-white text-xl text-black rounded-lg text-balance font-bold text-center">
                Manage your pet's daily needs all in one place
            </div>
            <div className="border-solid border-2 border-light-grey-200 m-4 p-4 text-xl bg-white rounded-lg text-balance font-bold text-center">
                Set your veterinary appointments so you don't forget them
            </div>
            <div className="border-solid border-2 border-light-grey-200 m-4 p-4 text-xl bg-white rounded-lg text-balance font-bold text-center">
                Check your pet's history so that you never forget what they need
            </div>
        </div>
    </div>
  )
}

export default Landing









