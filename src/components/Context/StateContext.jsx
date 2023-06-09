import { createContext, useState } from "react"

export const StateContext = createContext({})

const StateProvider = ({ children }) => {
	const [stateOpen, setStateOpen] = useState({
		createBoard: false,
		yourBoards: false,
		createCard: false,
	})

	const handleOpenBoards = () => {
		setStateOpen({
			...stateOpen,
			yourBoards: !stateOpen.yourBoards,
		})
	}

	return (
		<StateContext.Provider
			value={{
				stateOpen,
				setStateOpen,
				handleOpenBoards,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

export default StateProvider
