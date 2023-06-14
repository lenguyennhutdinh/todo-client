import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./index.css"
import {
	faBars,
	faBell,
	faCheckDouble,
	faChevronDown,
	faCircleHalfStroke,
	faCircleQuestion,
	faMagnifyingGlass,
	faTrash,
	faUser,
	faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../components/Context/AuthContext"
import { StateContext } from "../../components/Context/StateContext"
import {
	createNewBoard,
	deleteBoardById,
	getBoardById,
} from "../../services/boards"

const Header = () => {
	const { data, setData, alert, setAlert } = useContext(AuthContext)
	const {
		setLists,
		board,
		setBoard,
		stateOpen,
		setStateOpen,
		handleOpenBoards,
	} = useContext(StateContext)
	const [newBoardName, setNewBoardName] = useState("")
	const createBoardRef = useRef(null)

	useEffect(() => {
		if (stateOpen.createBoard) createBoardRef.current.focus()
	}, [stateOpen.createBoard])

	const handleOpenCreateBoard = () => {
		setStateOpen({
			...stateOpen,
			createBoard: !stateOpen.createBoard,
		})
	}

	const handleChangeBoardName = (e) => {
		const { value } = e.target
		setNewBoardName(value)
	}

	const handleCreateBoard = async () => {
		if (newBoardName.length < 3) {
			setAlert({
				isAlert: !alert.isAlert,
				message: "Enter at least 3 characters in the title board",
				severity: "warning",
			})
		} else {
			const newBoard = {
				boardName: newBoardName,
				positionLists: [],
			}
			const newData = await createNewBoard(newBoard)
			setData(newData)
			setBoard(newData[newData.length - 1])
			setStateOpen({
				...stateOpen,
				createBoard: !stateOpen.createBoard,
			})
			setNewBoardName("")
		}
	}

	const handleMoveBoard = async (boardId) => {
		if (board._id !== boardId) {
			const currentBoard = await getBoardById(boardId)
			setBoard(currentBoard)
		}
	}

	const handleDeleteBoard = async (boardId) => {
		if (data.length === 1) {
			setAlert({
				isAlert: !alert.isAlert,
				message: "All data cannot be deleted",
				severity: "error",
			})
		} else {
			try {
				await deleteBoardById(boardId)
				const newData = data.filter((board) => board._id !== boardId)
				setData(newData)
				if (boardId === board._id) {
					setTimeout(() => {
						setBoard(newData[newData.length - 1])
					}, 1000)
				}
			} catch (err) {
				setAlert({
					isAlert: !alert.isAlert,
					message: err.message,
					severity: "error",
				})
			}
		}
	}

	return (
		<div className="header">
			<div className="left">
				<span onClick={handleOpenBoards}>
					<FontAwesomeIcon icon={faBars} />
				</span>

				<div
					className="boards"
					style={{ display: stateOpen.yourBoards ? "block" : "none" }}
				>
					<span onClick={handleOpenBoards}>
						<FontAwesomeIcon icon={faXmark} />
					</span>
					<h3 className="your-boards">Your boards</h3>
					<ul className="list-boards">
						{data.map((board) => (
							<li
								key={board._id}
								onClick={() => handleMoveBoard(board._id)}
							>
								<a href="#!">{board.boardName}</a>
								<span
									onClick={(e) => {
										e.stopPropagation()
										handleDeleteBoard(board._id)
									}}
								>
									<FontAwesomeIcon icon={faTrash} />
								</span>
							</li>
						))}
					</ul>
				</div>

				<div
					className="logo"
					onClick={() => {
						location.reload()
					}}
				>
					<FontAwesomeIcon icon={faCheckDouble} />
					<h2 className="name-app">Todo</h2>
				</div>
				<ul className="list">
					<li className="item">
						<span>Workspaces</span>
						<FontAwesomeIcon icon={faChevronDown} />
					</li>
					<li className="item">
						<span>Recent</span>
						<FontAwesomeIcon icon={faChevronDown} />
					</li>
					<li className="item">
						<span>Starred</span>
						<FontAwesomeIcon icon={faChevronDown} />
					</li>
					<li className="item">
						<span>Templates</span>
						<FontAwesomeIcon icon={faChevronDown} />
					</li>
				</ul>

				<button
					onClick={handleOpenCreateBoard}
					className="open-new-board"
				>
					Create
				</button>
				<div
					style={{ display: stateOpen.createBoard ? "flex" : "none" }}
					className="new-board"
				>
					<span onClick={handleOpenCreateBoard}>
						<FontAwesomeIcon icon={faXmark} />
					</span>
					<h3 className="new-board-title">Board title</h3>
					<input
						ref={createBoardRef}
						type="text"
						name="new-board-title"
						value={newBoardName}
						onChange={handleChangeBoardName}
					/>
					<button
						onClick={handleCreateBoard}
						className="add-new-board"
					>
						Create
					</button>
				</div>
			</div>

			<div className="right">
				<div className="search-box">
					<FontAwesomeIcon icon={faMagnifyingGlass} />
					<span>Search</span>
				</div>
				<FontAwesomeIcon icon={faBell} />
				<FontAwesomeIcon icon={faCircleQuestion} />
				<FontAwesomeIcon icon={faCircleHalfStroke} />
				<FontAwesomeIcon icon={faUser} />
			</div>
		</div>
	)
}

export default Header
