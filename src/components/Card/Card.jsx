import {
	faBoxArchive,
	faCopy,
	faPen,
	faRightLong,
	faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./index.css"
import { useContext, useEffect, useRef, useState } from "react"
import { StateContext } from "../Context/StateContext"
import {
	archivedCardById,
	deleteCardById,
	getCardsByListId,
	renameCardById,
} from "../../services/cards"

const Card = (props) => {
	const { card, setCards } = props
	const { lists, setLists } = useContext(StateContext)
	const renameCardRef = useRef(null)
	const [isOpenCardOption, setIsOpenCardOption] = useState(false)
	const [newCardName, setNewCardName] = useState(card.cardName)
	useEffect(() => {
		if (isOpenCardOption) renameCardRef.current.select()
	}, [isOpenCardOption])

	const handleOpenCardOption = () => {
		setIsOpenCardOption(!isOpenCardOption)
	}

	const handleChangeRenameCard = (e) => {
		const { value } = e.target
		setNewCardName(value)
	}

	const handleSaveRenameCard = async () => {
		const cardId = card._id
		await renameCardById(cardId, newCardName)
		const cardsDB = await getCardsByListId(card.listId)
		setCards(cardsDB)
		setIsOpenCardOption(!isOpenCardOption)
	}

	const handleDeleteCard = async (listId, cardId) => {
		const newLists = lists.map((list) => {
			if (list.listId === listId)
				return {
					...list,
					positionCards: list.positionCards.filter(
						(card) => card._id !== cardId
					),
				}
			return list
		})
		setLists(newLists)
		setIsOpenCardOption(!isOpenCardOption)
		await deleteCardById(cardId)
	}

	const handleArchivedCard = async (listId, cardId) => {
		const newLists = lists.map((list) => {
			if (list.listId === listId)
				return {
					...list,
					positionCards: list.positionCards.filter(
						(card) => card._id !== cardId
					),
				}
			return list
		})
		setLists(newLists)
		await archivedCardById(cardId)
	}

	return (
		<div className="card">
			<p className="card-name">{card.cardName}</p>
			<div className="icons">
				<span className="card-name-edit" onClick={handleOpenCardOption}>
					<FontAwesomeIcon
						icon={faPen}
						size="sm"
						style={{ color: "gray" }}
					/>
				</span>
			</div>

			<div
				className="overlay"
				style={{ display: isOpenCardOption ? "block" : "none" }}
				onClick={handleOpenCardOption}
			></div>
			<div
				className="card-option"
				style={{ display: isOpenCardOption ? "flex" : "none" }}
			>
				<div className="rename-card">
					<textarea
						ref={renameCardRef}
						rows={4}
						value={newCardName}
						onChange={handleChangeRenameCard}
					></textarea>
					<button
						className="btn-save-card"
						onClick={handleSaveRenameCard}
					>
						Save
					</button>
				</div>
				<div className="card-actions">
					<div className="card-action">
						<FontAwesomeIcon icon={faCopy} />
						<span>Copy</span>
					</div>
					<div className="card-action">
						<FontAwesomeIcon icon={faRightLong} />
						<span>Move</span>
					</div>
					<div
						className="card-action"
						onClick={() => handleArchivedCard(listId, card._id)}
					>
						<FontAwesomeIcon icon={faBoxArchive} />
						<span>Archive</span>
					</div>
					<div
						className="card-action"
						onClick={() => handleDeleteCard(listId, card._id)}
					>
						<FontAwesomeIcon icon={faTrash} />
						<span>Delete</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
