import { Container, Draggable } from "react-smooth-dnd"
import AddList from "../List/AddList"
import List from "../List/List"
import "./index.css"
import { useContext, useEffect } from "react"
import { applyDrag } from "../utils/dragDrop"
import { StateContext } from "../Context/StateContext"
import {
	getListsByBoardId,
	updatePositionCardsListById,
} from "../../services/lists"
import { updatePositionListsBoardById } from "../../services/boards"
import { getCards } from "../../services/cards"

const Lists = () => {
	const { board, lists, setLists } = useContext(StateContext)

	const getListsAndCards = async () => {
		let newLists = await getListsByBoardId(board._id)
		const cards = await getCards()
		newLists = newLists.map((list) => {
			return {
				...list,
				cards: list.positionCards.map((cardId) =>
					cards.find((card) => card._id === cardId)
				),
			}
		})
		// console.log(newLists)
		setLists(newLists)
	}

	useEffect(() => {
		getListsAndCards()
		// console.log("---- getListsDB")
	}, [board._id])

	const onColumnDrop = async (dropResult) => {
		const { addedIndex } = dropResult
		if (addedIndex < board.positionLists.length) {
			let newLists = [...lists]
			newLists = applyDrag(newLists, dropResult)
			setLists(newLists)
			console.log(newLists)
			await updatePositionListsBoardById(
				board._id,
				newLists.map((list) => list._id)
			)
		}
	}

	const onCardDrop = async (dropResult, listId) => {
		const { removedIndex, addedIndex } = dropResult
		if (addedIndex !== null || removedIndex !== null) {
			let newLists = [...lists]
			let currentList = newLists.find((list) => list._id === listId)
			currentList.cards = applyDrag(currentList.cards, dropResult)
			currentList.positionCards = currentList.cards.map(
				(card) => card._id
			)
			console.log(currentList)
			setLists(newLists)
			await updatePositionCardsListById(newLists)
			console.log(newLists)
		}
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
				{lists?.map(
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
