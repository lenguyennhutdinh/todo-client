import AddList from "../List/AddList"
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
							list={list}
						/>
					)
			)}
			<AddList />
		</div>
	)
}

export default Lists
