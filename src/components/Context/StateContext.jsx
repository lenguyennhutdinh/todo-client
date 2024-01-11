import { createContext, useContext, useRef, useState } from "react"
import { AuthContext } from "./AuthContext"

export const StateContext = createContext({})

const StateProvider = ({ children }) => {
	const { data, setData } = useContext(AuthContext)
	const [board, setBoard] = useState()
	const [lists, setLists] = useState()
	const createBoardRef = useRef(null)
	const yourBoardsRef = useRef(null)
	const yourBoardsIconRef = useRef(null)
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

	const handleInOutElement = (e) => {
		// if (
		// 	!yourBoardsRef.current.contains(e.target) &&
		// 	!yourBoardsIconRef.current.contains(e.target)
		// ) {
		// 	setStateOpen({
		// 		...stateOpen,
		// 		yourBoards: false,
		// 	})
		// }
		// if (!createBoardRef.current.contains(e.target)) {
		// 	setStateOpen({
		// 		...stateOpen,
		// 		createBoard: false,
		// 	})
		// }
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
				createBoardRef,
				yourBoardsRef,
				yourBoardsIconRef,
				handleInOutElement,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

export default StateProvider
