import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import { StateContext } from "../Context/StateContext"
import { createNewCard } from "../../services/cards"

const AddCard = (props) => {
	const { list, isOpenAddCard, onClose, createCardRef } = props
	const { lists, setLists } = useContext(StateContext)

	const [newTitleCard, setNewTitleCard] = useState("")
	const addCardRef = useRef(null)

	const handleChangeAddCard = (e) => {
		const { value } = e.target
		setNewTitleCard(value)
	}

	const handleAddCard = async (listId) => {
		const newCard = {
			_id: uuid(),
			listId: list._id,
			cardName: newTitleCard,
			isArchived: false,
		}
		const newLists = lists.map((list) => {
			if (list._id === listId)
				return {
					...list,
					positionCards: [...list.positionCards, newCard._id],
					cards: [...list.cards, newCard],
				}
			return list
		})
		setLists(newLists)
		await createNewCard(newCard)
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
					onClick={() => handleAddCard(list._id)}
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
