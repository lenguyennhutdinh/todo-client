import { useContext, useState } from "react"
import "./index.css"
import { faEllipsis, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AddCard from "../Card/AddCard"
import Card from "../Card/Card"
import { AuthContext } from "../Context/AuthContext"
import { v4 as uuid } from "uuid"

const List = ({ listId, listName, cards }) => {
	const { setData } = useContext(AuthContext)
	const [isOpenListActions, setIsOpenListActions] = useState(false)

	const [list, setList] = useState({
		name: "To Do",
		isRename: false,
		isOpenAddCard: false,
		newCard: {
			id: uuid(),
			name: "",
		},
	})
	const handleOpenAddCard = (e) => {
		setList({ ...list, isOpenAddCard: !list.isOpenAddCard })
		console.log(e.target)
	}

	const handleChangeAddCard = (e) => {
		setList({
			...list,
			newCard: {
				...list.newCard,
				name: e.target.value,
			},
		})
	}

	const handleOpenListActions = () => {
		setIsOpenListActions(!isOpenListActions)
	}

	const handleArchivedList = (id) => {
		setData((prevBoards) =>
			prevBoards.map((board) => ({
				...board,
				lists: board.lists.map((list) => ({
					...list,
					isArchived: list.listId === id ? true : list.isArchived,
				})),
			}))
		)
	}

	return (
		<div className="list">
			<h2 className="list-title">{listName}</h2>
			<input
				className="rename-list"
				value={list.listName}
				style={{
					display: "none",
				}}
			/>
			<div className="cards">
				<>
					{cards.map(
						(card) =>
							card.isArchived || (
								<Card key={card.cardId} card={card} />
							)
					)}
				</>
			</div>

			<div className="add-card">
				<div
					onClick={handleOpenAddCard}
					className="open-add-card"
					style={{ display: list.isOpenAddCard ? "none" : "flex" }}
				>
					<FontAwesomeIcon icon={faPlus} />
					<span>Add new card</span>
				</div>
				<AddCard
					list={list}
					onClose={handleOpenAddCard}
					onChange={handleChangeAddCard}
				/>
			</div>

			<span className="open-list-actions" onClick={handleOpenListActions}>
				<FontAwesomeIcon icon={faEllipsis} />
			</span>
			<div
				style={{ display: isOpenListActions ? "block" : "none" }}
				className="list-actions"
			>
				<span onClick={handleOpenListActions}>
					<FontAwesomeIcon icon={faXmark} />
				</span>
				<h3 className="list-actions-title">List actions</h3>
				<div className="vertical"></div>
				<div className="list-actions-detail">
					<span>Add card...</span>
					<span>Copy list...</span>
					<span>Move list...</span>
					<span>Watch</span>
					<div className="vertical"></div>
					<span>Sort by...</span>
					<div className="vertical"></div>
					<span onClick={() => handleArchivedList(listId)}>
						Archived this list
					</span>
				</div>
			</div>
		</div>
	)
}

export default List
