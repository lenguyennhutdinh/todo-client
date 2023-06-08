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
import { initNewBoard } from "../../components/Initial/initialData"
import { useContext, useState } from "react"
import { AuthContext } from "../../components/Context/AuthContext"
import { v4 as uuid } from "uuid"

const Header = () => {
	const { data, setData, alert, setAlert } = useContext(AuthContext)
	const [newBoard, setNewBoard] = useState(initNewBoard)
	const [isOpenCreateBoard, setIsOpenCreateBoard] = useState(false)
	const [isOpenBoards, setIsOpenBoards] = useState(false)

	const handleOpenCreateBoard = () => {
		setIsOpenCreateBoard(!isOpenCreateBoard)
	}

	const handleChangeBoardName = (e) => {
		const { value } = e.target
		setNewBoard({
			...newBoard,
			boardName: value,
		})
	}

	const resetNewBoard = () => {
		setNewBoard({
			boardId: uuid(),
			boardName: "",
			lists: [
				{
					listId: uuid(),
					listName: "To Do",
					isArchived: false,
					cards: [],
				},
				{
					listId: uuid(),
					listName: "Doing",
					isArchived: false,
					cards: [],
				},
				{
					listId: uuid(),
					listName: "Done",
					isArchived: false,
					cards: [],
				},
			],
		})
	}

	const handleCreateBoard = () => {
		if (newBoard.boardName.length < 3) {
			setAlert({
				isAlert: !alert.isAlert,
				message: "Enter at least 3 characters in the title board",
				severity: "warning",
			})
		} else {
			setData([newBoard, ...data])
			setIsOpenCreateBoard(!isOpenCreateBoard)
			resetNewBoard()
		}
	}

	const handleChangeBoard = (id) => {
		const currentBoard = []
		const restBoards = []
		data.forEach((board) => {
			if (board.boardId === id) {
				currentBoard.push(board)
			} else {
				restBoards.push(board)
			}
		})
		const newBoards = [...currentBoard, ...restBoards]
		setData(newBoards)
	}

	const handleDeleteBoard = (id) => {
		console.log(`Deleting ${id}`)
		setData((prevBoards) =>
			prevBoards.filter((board) => board.boardId !== id)
		)
	}

	const handleOpenBoards = () => {
		setIsOpenBoards(!isOpenBoards)
	}

	return (
		<div className="header">
			<div className="left">
				<span onClick={handleOpenBoards}>
					<FontAwesomeIcon icon={faBars} />
				</span>

				<div
					className="boards"
					style={{ display: isOpenBoards ? "block" : "none" }}
				>
					<span onClick={handleOpenBoards}>
						<FontAwesomeIcon icon={faXmark} />
					</span>
					<h3 className="your-boards">Your boards</h3>
					<ul className="list-boards">
						{data.map((board) => (
							<li
								key={board.boardId}
								onClick={() => handleChangeBoard(board.boardId)}
							>
								<a href="#!">{board.boardName}</a>
								<span
									onClick={(e) => {
										e.stopPropagation()
										handleDeleteBoard(board.boardId)
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
					style={{ display: isOpenCreateBoard ? "flex" : "none" }}
					className="new-board"
				>
					<span onClick={handleOpenCreateBoard}>
						<FontAwesomeIcon icon={faXmark} />
					</span>
					<h3 className="title-new-board">Board title</h3>
					<input
						type="text"
						name="new-board-title"
						value={newBoard.boardName}
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
