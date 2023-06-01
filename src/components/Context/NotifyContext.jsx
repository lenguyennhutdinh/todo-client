// import { useSnackbar } from "notistack"
// import { createContext } from "react"

// export const NotifyContext = createContext({})

// export const NotifyProvider = ({ children }) => {
// 	const { enqueueSnackbar } = useSnackbar()

// 	const notify = (message, variant) => () => {
// 		enqueueSnackbar(message, { variant })
// 	}

// 	return (
// 		<NotifyContext.Provider value={{ notify, enqueueSnackbar }}>
// 			{children}
// 		</NotifyContext.Provider>
// 	)
// }
