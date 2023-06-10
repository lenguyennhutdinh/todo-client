import { createContext, useContext, useState } from "react"
import { AuthContext } from "./AuthContext"

export const StateContext = createContext({})

const StateProvider = ({ children }) => {
	const { data, setData } = useContext(AuthContext)
	const [board, setBoard] = useState()
	const [lists, setLists] = useState()
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

	const mapBoardAndData = (newLists) => {
		const { boardId } = board
		const newBoard = {
			...board,
			lists: newLists,
		}
		setBoard(newBoard)

		const newData = data.map((board) => {
			if (board.boardId === boardId) return newBoard
			return board
		})
		setData(newData)
	}

	return (
		<StateContext.Provider
			value={{
				stateOpen,
				setStateOpen,
				handleOpenBoards,
				board,
				setBoard,
				lists,
				setLists,
				mapBoardAndData,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

export default StateProvider
