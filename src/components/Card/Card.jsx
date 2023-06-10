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
import { AuthContext } from "../Context/AuthContext"
import { StateContext } from "../Context/StateContext"

const Card = (props) => {
	const { listId, card } = props
	const { setData } = useContext(AuthContext)
	const { lists, setLists, mapBoardAndData } = useContext(StateContext)
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

	const handleSaveRenameCard = () => {
		const { cardId } = card
		const newLists = lists.map((list) => {
			if (list.listId === listId)
				return {
					...list,
					cards: list.cards.map((card) => {
						if (card.cardId === cardId)
							return {
								...card,
								cardName: newCardName,
							}
						return card
					}),
				}
			return list
		})
		setLists(newLists)

		mapBoardAndData(newLists)
		setIsOpenCardOption(!isOpenCardOption)
	}

	const handleDeleteCard = (listId, cardId) => {
		const newLists = lists.map((list) => {
			if (list.listId === listId)
				return {
					...list,
					cards: list.cards.filter((card) => card.cardId !== cardId),
				}
			return list
		})
		setLists(newLists)

		mapBoardAndData(newLists)
	}

	const handleArchivedCard = (listId, cardId) => {
		const newLists = lists.map((list) => {
			if (list.listId === listId)
				return {
					...list,
					cards: list.cards.map((card) => {
						if (card.cardId === cardId)
							return {
								...card,
								isArchived: true,
							}
						return card
					}),
				}
			return list
		})
		setLists(newLists)

		mapBoardAndData(newLists)
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
				style={{ display: isOpenCardOption ? "block" : "none" }}
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
						onClick={() => handleArchivedCard(listId, card.cardId)}
					>
						<FontAwesomeIcon icon={faBoxArchive} />
						<span>Archive</span>
					</div>
					<div
						className="card-action"
						onClick={() => handleDeleteCard(listId, card.cardId)}
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
