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

const Card = ({ card }) => {
	const { setData } = useContext(AuthContext)
	const renameCardRef = useRef(null)
	const [isOpenCardOption, setIsOpenCardOption] = useState(false)
	const [newNameCard, setNewNameCard] = useState(card.cardName)
	useEffect(() => {
		if (isOpenCardOption) renameCardRef.current.select()
	}, [isOpenCardOption])

	const handleOpenCardOption = () => {
		setIsOpenCardOption(!isOpenCardOption)
	}

	const handleChangeRenameCard = (e) => {
		const { value } = e.target
		setNewNameCard(value)
	}

	const handleSaveRenameCard = () => {
		const { cardId } = card
		setData((prevBoards) =>
			prevBoards.map((board) => {
				if (board.boardId === prevBoards[0].boardId) {
					const updatedLists = board.lists.map((list) => {
						const updatedCards = list.cards.map((card) => {
							if (card.cardId === cardId) {
								return {
									...card,
									cardName: newNameCard,
								}
							}
							return card
						})
						return {
							...list,
							cards: updatedCards,
						}
					})
					return {
						...board,
						lists: updatedLists,
					}
				}
				return board
			})
		)
		setIsOpenCardOption(!isOpenCardOption)
	}

	const handleDeleteCard = (cardId) => {
		setData((prevBoards) =>
			prevBoards.map((board) => ({
				...board,
				lists: board.lists.map((list) => ({
					...list,
					cards: list.cards.filter((card) => {
						return card.cardId !== cardId
					}),
				})),
			}))
		)
	}

	const handleArchivedCard = (cardId) => {
		setData((prevBoards) =>
			prevBoards.map((board) => ({
				...board,
				lists: board.lists.map((list) => ({
					...list,
					cards: list.cards.map((card) => {
						if (card.cardId === cardId) {
							return {
								...card,
								isArchived: true,
							}
						}
						return card
					}),
				})),
			}))
		)
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
						onChange={handleChangeRenameCard}
					>
						{card.cardName}
					</textarea>
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
						onClick={() => handleArchivedCard(card.cardId)}
					>
						<FontAwesomeIcon icon={faBoxArchive} />
						<span>Archive</span>
					</div>
					<div
						className="card-action"
						onClick={() => handleDeleteCard(card.cardId)}
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
