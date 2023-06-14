import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./index.css"
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import { StateContext } from "../Context/StateContext"
import { createNewList } from "../../services/lists"
import { v4 as uuid } from "uuid"
import { AuthContext } from "../Context/AuthContext"
const AddList = () => {
	const { data, setData } = useContext(AuthContext)
	const { lists, setLists, board, setBoard, mapBoardAndData } =
		useContext(StateContext)
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

	const handleAddList = async () => {
		const newList = {
			_id: uuid(),
			listName: newListName,
			boardId: board._id,
			isArchived: false,
			positionCards: [],
		}
		console.log("add list", newList._id)

		const newBoard = {
			...board,
			positionLists: [...board.positionLists, newList._id],
		}
		setBoard(newBoard)

		const newData = data.map((board) => {
			if (board._id === newBoard._id) return newBoard
			return board
		})
		setData(newData)
		setNewListName("")
		await createNewList(newList)
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
