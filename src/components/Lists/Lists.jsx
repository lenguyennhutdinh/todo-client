import { Container, Draggable } from "react-smooth-dnd"
import AddList from "../List/AddList"
import List from "../List/List"
import "./index.css"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { applyDrag } from "../utils/dragDrop"
import { StateContext } from "../Context/StateContext"

const Lists = () => {
	const { lists, setLists, mapBoardAndData } = useContext(StateContext)
	const onColumnDrop = (dropResult) => {
		let newLists = [...lists]
		newLists = applyDrag(newLists, dropResult)
		setLists(newLists)

		mapBoardAndData(newLists)
	}

	const onCardDrop = (dropResult, listId) => {
		if (
			dropResult.removedIndex !== null ||
			dropResult.addedIndex !== null
		) {
			let newLists = [...lists]

			let currentList = newLists.find((list) => list.listId === listId)
			currentList.cards = applyDrag(currentList.cards, dropResult)
			setLists(newLists)

			mapBoardAndData(newLists)
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
				{lists.map(
					(list) =>
						list.isArchived || (
							<Draggable key={list.listId}>
								<List
									listId={list.listId}
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
