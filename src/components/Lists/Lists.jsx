import List from "../List/List"
import "./index.css"

const Lists = ({ lists }) => {
	return (
		<div className="lists">
			{lists.map(
				(list) =>
					list.isArchived || (
						<List
							key={list.listId}
							listId={list.listId}
							listName={list.listName}
							cards={list.cards}
						/>
					)
			)}
		</div>
	)
}

export default Lists
