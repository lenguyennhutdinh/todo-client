import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { v4 as uuid } from "uuid"
import { StateContext } from "../Context/StateContext"

const AddCard = (props) => {
	const { list, isOpenAddCard, onClose, createCardRef } = props
	const { lists, setLists, mapBoardAndData } = useContext(StateContext)

	const [newTitleCard, setNewTitleCard] = useState("")
	const addCardRef = useRef(null)

	const handleChangeAddCard = (e) => {
		const { value } = e.target
		setNewTitleCard(value)
	}

	const handleAddCard = (listId) => {
		const newCard = {
			cardId: uuid(),
			cardName: newTitleCard,
			isArchived: false,
		}
		const newLists = lists.map((list) => {
			if (list.listId === listId)
				return {
					...list,
					cards: [...list.cards, newCard],
				}
			return list
		})
		setLists(newLists)
		mapBoardAndData(newLists)
	}

	useEffect(() => {
		if (isOpenAddCard) {
			addCardRef.current.focus()
		}
	}, [isOpenAddCard])

	return (
		<div
			className="new-card"
			ref={createCardRef}
			style={{
				display: isOpenAddCard ? "block" : "none",
			}}
		>
			<textarea
				ref={addCardRef}
				rows={4}
				placeholder="Enter a title for this card..."
				onChange={handleChangeAddCard}
				value={newTitleCard}
			></textarea>
			<div className="row">
				<button
					onClick={() => handleAddCard(list.listId)}
					className="btn-add-card"
				>
					Add card
				</button>
				<a href="#!" onClick={onClose}>
					<FontAwesomeIcon icon={faXmark} />
				</a>
			</div>
		</div>
	)
}

export default AddCard
