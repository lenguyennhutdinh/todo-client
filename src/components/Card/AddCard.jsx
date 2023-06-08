import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef } from "react"

const AddCard = ({ list, onClose, onChange }) => {
    const ref = useRef(list.isOpenAddCard)
    useEffect(() =>{
        if (list.isOpenAddCard) {
            ref.current.focus()
        }
    }, [list.isOpenAddCard])

	return (
		<div style={{ display: list.isOpenAddCard ? "block" : "none" }}>
			<textarea
				rows={4}
				placeholder="Enter a title for this card..."
				value={list.newCard.name}
                ref={ref}
				onChange={onChange}
			></textarea>
			<div className="row">
				<button className="btn-add-card">Add card</button>
				<a href="#!" onClick={onClose}>
					<FontAwesomeIcon icon={faXmark} />
				</a>
			</div>
		</div>
	)
}

export default AddCard
