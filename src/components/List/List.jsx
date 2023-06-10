import { useContext, useEffect, useRef, useState } from "react"
import "./index.css"
import { faEllipsis, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AddCard from "../Card/AddCard"
import Card from "../Card/Card"
import { AuthContext } from "../Context/AuthContext"
import { v4 as uuid } from "uuid"
import { StateContext } from "../Context/StateContext"
import { Container, Draggable } from "react-smooth-dnd"

const List = (props) => {
	const { listId, list, onCardDrop } = props
	const { lists, setLists, mapBoardAndData, createCardRef } =
		useContext(StateContext)
	const renameListRef = useRef(null)
	const [isOpenListActions, setIsOpenListActions] = useState(false)
	const [isOpenAddCard, setIsOpenAddCard] = useState(false)
	const [isOpenRenameList, setIsOpenRenameList] = useState(false)

	useEffect(() => {
		if (isOpenRenameList) renameListRef.current.focus()
	}, [isOpenRenameList])

	const handleOpenRenameList = () => {
		setIsOpenRenameList(!isOpenRenameList)
	}

	const handleChangeRenameList = (e) => {
		const { listId } = list
		const { value } = e.target
		const newLists = lists.map((list) => {
			if (list.listId === listId) {
				return {
					...list,
					listName: value,
				}
			}

			return list
		})
		setLists(newLists)

		mapBoardAndData(newLists)
	}

	const handleOpenAddCard = () => {
		setIsOpenAddCard(!isOpenAddCard)
	}

	const handleOpenListActions = () => {
		setIsOpenListActions(!isOpenListActions)
	}

	const handleDeleteList = (listId) => {
		const newLists = lists.filter((list) => {
			return list.listId !== listId
		})
		setLists(newLists)

		mapBoardAndData(newLists)
	}

	const handleArchivedList = (listId) => {
		const newLists = lists.map((list) => {
			if (list.listId === listId) {
				return {
					...list,
					isArchived: true,
				}
			}
			return list
		})
		setLists(newLists)

		mapBoardAndData(newLists)
	}

	return (
		<div className="list">
			<h2
				className="list-title"
				onClick={handleOpenRenameList}
				style={{ display: isOpenRenameList ? "none" : "block" }}
			>
				{list.listName}
			</h2>
			<input
				ref={renameListRef}
				className="rename-list"
				onChange={handleChangeRenameList}
				onBlur={handleOpenRenameList}
				value={list.listName}
				style={{ display: isOpenRenameList ? "block" : "none" }}
			/>

			<div className="cards">
				<Container
					groupName="col"
					onDrop={(dropResult) => onCardDrop(dropResult, listId)}
					getChildPayload={(index) => list.cards[index]}
					dragClass="card-ghost"
					dropClass="card-ghost-drop"
					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: "card-drop-preview",
					}}
					dropPlaceholderAnimationDuration={200}
				>
					{list.cards.map(
						(card) =>
							card.isArchived || (
								<Draggable key={card.cardId}>
									<Card listId={list.listId} card={card} />
								</Draggable>
							)
					)}

					<div className="add-card">
						<div
							onClick={handleOpenAddCard}
							className="open-add-card"
							style={{ display: isOpenAddCard ? "none" : "flex" }}
						>
							<FontAwesomeIcon icon={faPlus} />
							<span>Add new card</span>
						</div>
						<AddCard
							key={uuid()}
							createCardRef={createCardRef}
							list={list}
							onClose={handleOpenAddCard}
							isOpenAddCard={isOpenAddCard}
							handleOpenAddCard={handleOpenAddCard}
						/>
					</div>
				</Container>
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
					<span onClick={() => handleArchivedList(listId)}>
						Archived this list
					</span>
					<div className="vertical"></div>
					<span onClick={() => handleDeleteList(listId)}>
						Delete this list
					</span>
				</div>
			</div>
		</div>
	)
}

export default List
