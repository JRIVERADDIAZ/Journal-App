import React from 'react'
import {AppRouter} from './AppRouter/AppRouter'
import AppTheme from './Theme/AppTheme'

const JournalApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  )
}

export default JournalApp