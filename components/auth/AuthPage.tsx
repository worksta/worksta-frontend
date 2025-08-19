'use client'

import React, { useState } from 'react'
import { Login } from './Login'
import { Signup } from './Signup'

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="app-container">
      {isLogin ? (
        <Login onToggleMode={() => setIsLogin(false)} />
      ) : (
        <Signup onToggleMode={() => setIsLogin(true)} />
      )}
    </div>
  )
}
