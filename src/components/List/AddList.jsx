import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./index.css"
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { v4 as uuid } from "uuid"
import { StateContext } from "../Context/StateContext"

const AddList = () => {
	const { data, setData } = useContext(AuthContext)
	const { lists, setLists, board, setBoard } = useContext(StateContext)
	const [isOpenAddList, setIsOpenAddList] = useState(false)
	const [newListName, setNewListName] = useState("")
	const addListRef = useRef(null)

	useEffect(() => {
		if (isOpenAddList) {
			addListRef.current.focus()
		}
	}, [isOpenAddList])

	const handleOpenAddList = () => {
		setIsOpenAddList(!isOpenAddList)
	}

	const handleChangeAddList = (e) => {
		const { value } = e.target
		setNewListName(value)
	}

	const handleAddList = () => {
		const boardId = board.boardId
		const newList = {
			listId: uuid(),
			listName: newListName,
			isArchived: false,
			cards: [],
		}
		const newBoard = { ...board }
		newBoard.lists.push(newList)

		const newData = data.map((board) => {
			if (board.boardId === boardId) {
				return newBoard
			}
			return board
		})
		setData(newData)
		setNewListName("")
	}

	return (
		<>
			<div
				className="list add-list"
				style={{ display: isOpenAddList ? "none" : "flex" }}
				onClick={handleOpenAddList}
			>
				<FontAwesomeIcon icon={faPlus} size="sm" />
				<span>Add another list</span>
			</div>
			<div
				className="new-list"
				style={{
					display: isOpenAddList ? "block" : "none",
				}}
			>
				<input
					ref={addListRef}
					onChange={handleChangeAddList}
					value={newListName}
					placeholder="Enter list title..."
				/>
				<div className="row">
					<button onClick={handleAddList} className="btn-add-list">
						Add list
					</button>
					<a href="#!" onClick={handleOpenAddList}>
						<FontAwesomeIcon icon={faXmark} />
					</a>
				</div>
			</div>
		</>
	)
}

export default AddList
