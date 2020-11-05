import { SnackbarProvider } from 'notistack'
import React from 'react'

export default ({ children }) => (
	<SnackbarProvider maxSnack={2} dense={true}>
		{children}
	</SnackbarProvider>
)
