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
	renameCardById,
} from "../../services/cards"

const Card = (props) => {
	const { list, card } = props
	const { lists, setLists } = useContext(StateContext)
	const renameCardRef = useRef(null)
	const [isOpenCardOption, setIsOpenCardOption] = useState(false)
	const [newCardName, setNewCardName] = useState(card.cardName)
	const listId = list._id
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
		const newLists = lists.map((list) => {
			if (list._id === listId) {
				return {
					...list,
					cards: list.cards.map((card) => {
						if (card._id === cardId) {
							return {
								...card,
								cardName: newCardName,
							}
						}
						return card
					}),
				}
			}
			return list
		})
		setLists(newLists)
		setIsOpenCardOption(!isOpenCardOption)
		await renameCardById(cardId, newCardName)
	}

	const handleDeleteCard = async (listId, cardId) => {
		const newLists = lists.map((list) => {
			if (list._id === listId)
				return {
					...list,
					positionCards: list.positionCards.filter(
						(card) => card._id !== cardId
					),
					cards: list.cards.filter((card) => card._id !== cardId),
				}
			return list
		})
		console.log(newLists)
		setLists(newLists)
		setIsOpenCardOption(!isOpenCardOption)
		await deleteCardById(cardId)
	}

	const handleArchivedCard = async (listId, cardId) => {
		const newLists = lists.map((list) => {
			if (list._id === listId)
				return {
					...list,
					positionCards: list.positionCards.filter(
						(card) => card._id !== cardId
					),
					cards: list.cards.filter((card) => card._id !== cardId),
				}
			return list
		})
		setLists(newLists)
		setIsOpenCardOption(!isOpenCardOption)
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
						onClick={() => handleArchivedCard(list._id, card._id)}
					>
						<FontAwesomeIcon icon={faBoxArchive} />
						<span>Archive</span>
					</div>
					<div
						className="card-action"
						onClick={() => handleDeleteCard(list._id, card._id)}
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
