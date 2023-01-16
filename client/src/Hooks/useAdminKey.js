import React, { createContext } from 'react'

export const adminKeyContext = createContext()   

export function AdminKeyProvider({children,adminKey}) {
    let obj = {
        key : adminKey
    }
    return (
      
      <adminKeyContext.Provider value={ adminKey ? obj : null }>
          { children }
      </adminKeyContext.Provider>
      
    )
}

export default AdminKeyProvider