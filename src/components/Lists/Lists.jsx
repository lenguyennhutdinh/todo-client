import { Container, Draggable } from "react-smooth-dnd"
import AddList from "../List/AddList"
import List from "../List/List"
import "./index.css"
import { useContext, useEffect } from "react"
import { applyDrag } from "../utils/dragDrop"
import { StateContext } from "../Context/StateContext"
import { getListsByBoardId } from "../../services/lists"
import { updatePositionListsBoardById } from "../../services/boards"

const Lists = () => {
	const { board, setBoard, lists, setLists } = useContext(StateContext)
	const swapElements = (array, indices) => {
		const temp = array[indices[0]]
		array[indices[0]] = array[indices[1]]
		array[indices[1]] = temp
		return array
	}

	const getListsDB = async (boardId) => {
		const listsDB = await getListsByBoardId(boardId)
		// console.log(listsDB)
		setLists(listsDB)
	}

	useEffect(() => {
		getListsDB(board._id)
		// console.log("getListsDB", board)
	}, [board])

	const onColumnDrop = async (dropResult) => {
		const { removedIndex, addedIndex } = dropResult
		if (addedIndex < board.positionLists.length) {
			const newBoard = {
				...board,
				positionLists: swapElements(board.positionLists, [
					addedIndex,
					removedIndex,
				]),
			}
			setBoard(newBoard)
			await updatePositionListsBoardById(
				newBoard._id,
				newBoard.positionLists
			)
		}
	}

	const onCardDrop = (dropResult, listId) => {
		let newLists = [...lists]

		let currentList = newLists.find((list) => list._id === listId)
		currentList.positionCards = applyDrag(
			currentList.positionCards,
			dropResult
		)
		console.log(currentList)
		setLists(newLists)

		// mapBoardAndData(newLists)
	}

	return (
		<div className="lists">
			<Container
				orientation="horizontal"
				onDrop={onColumnDrop}
				getChildPayload={(index) => lists[index]}
				dragHandleSelector=".list-title"
				dropPlaceholder={{
					animationDuration: 150,
					showOnTop: true,
					className: "list-drop-preview",
				}}
			>
				{lists &&
					lists.map(
						(list) =>
							list.isArchived || (
								<Draggable key={list._id}>
									<List
										key={list._id}
										list={list}
										onCardDrop={onCardDrop}
									/>
								</Draggable>
							)
					)}
				<AddList />
			</Container>
		</div>
	)
}

export default Lists
