import { faBoxArchive, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./index.css"
import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContext"

const Card = ({ card }) => {
	const { setData } = useContext(AuthContext)

	const [isOpenCardActions, setIsOpenCardAction] = useState(false)

	const handleOpenCardActions = () => {
		setIsOpenCardAction(!isOpenCardActions)
	}

	const handleArchivedCard = (id) => {
		setData((prevBoards) =>
			prevBoards.map((board) => ({
				...board,
				lists: board.lists.map((list) => ({
					...list,
					cards: list.cards.map((card) => {
						if (card.cardId === id) {
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
				<span
					className="card-name-edit"
					onClick={handleOpenCardActions}
				>
					<FontAwesomeIcon
						icon={faPen}
						size="sm"
						style={{ color: "gray" }}
					/>
				</span>
			</div>

			<div
				className="overlay"
				style={{ display: isOpenCardActions ? "block" : "none" }}
				onClick={handleOpenCardActions}
			></div>
			<div
				className="card-actions"
				style={{ display: isOpenCardActions ? "block" : "none" }}
			>
				<div className="card-action">
					<FontAwesomeIcon icon={faTrash} />
					<span>Delete</span>
				</div>
				<div
					className="card-action"
					onClick={() => handleArchivedCard(card.cardId)}
				>
					<FontAwesomeIcon icon={faBoxArchive} />
					<span>Archive</span>
				</div>
			</div>
		</div>
	)
}

export default Card
