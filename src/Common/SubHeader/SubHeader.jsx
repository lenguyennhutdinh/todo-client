import { useState, useRef, useEffect, useContext } from "react"
import "./index.css"
import {
	faBolt,
	faChevronDown,
	faEllipsis,
	faFilter,
	faRocket,
	faStar,
	faTable,
	faUser,
	faUserPlus,
	faUsers,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/config"
import { AuthContext } from "../../components/Context/AuthContext"

const SubHeader = ({ board }) => {
	const { setData, navigate } = useContext(AuthContext)

	const [isRenameBoard, setIsRenameBoard] = useState(false)

	const inputRef = useRef(null) // Create a ref for the input field

	const handleChange = (e) => {
		const { value } = e.target
		setData((prevBoards) =>
			prevBoards.map((board) => {
				if (board.boardId === prevBoards[0].boardId) {
					return {
						...board,
						boardName: value,
					}
				}
				return board
			})
		)
	}

	const handleEnter = (e) => {
		if (e.keyCode === 13) {
			console.log("enter")
			e.target.blur()
		}
	}

	const handleOpenRenameBoard = () => {
		setIsRenameBoard(true)
	}

	const handleCloseRenameBoard = () => {
		setIsRenameBoard(false)
	}

	const handleLogout = () => {
		localStorage.clear()
		signOut(auth).then(() => {
			navigate("/login")
		})
	}

	useEffect(() => {
		if (isRenameBoard) {
			inputRef.current.focus()
		}
	}, [isRenameBoard])

	return (
		<div className="sub-header">
			<div className="left">
				<div className="title-wrap" onClick={handleOpenRenameBoard}>
					<input
						ref={inputRef}
						className="rename-board"
						style={{
							display: isRenameBoard ? "block" : "none",
							color: "black",
							width: "fit-content",
							padding: "0 12px",
							outline: "2px solid blue",
							border: "none",
							borderRadius: "3px",
						}}
						onChange={handleChange}
						onBlur={handleCloseRenameBoard}
						onKeyUp={handleEnter}
						value={board.boardName}
					/>
					<h2
						style={{
							display: isRenameBoard ? "none" : "block",
						}}
						className="title"
					>
						{board.boardName}
					</h2>
				</div>
				<FontAwesomeIcon icon={faStar} />
				<div className="item workspace">
					<FontAwesomeIcon icon={faUsers} />
					<span>Workspaces visible</span>
				</div>
				<div className="item board">
					<FontAwesomeIcon icon={faTable} />
					<span>Boards</span>
				</div>
				<FontAwesomeIcon icon={faChevronDown} />
			</div>

			<div className="right">
				<div className="item power-up">
					<FontAwesomeIcon icon={faRocket} />
					<span>Power-Ups</span>
				</div>
				<div className="item automation">
					<FontAwesomeIcon icon={faBolt} />
					<span>Automation</span>
				</div>
				<div className="item filter">
					<FontAwesomeIcon icon={faFilter} />
					<span>Filter</span>
				</div>
				<div className="horizontal"></div>
				<FontAwesomeIcon icon={faUser} />
				<div className="item share">
					<FontAwesomeIcon icon={faUserPlus} />
					<span>Share</span>
				</div>
				<button className="btn-logout" onClick={handleLogout}>
					Log out
				</button>
			</div>
		</div>
	)
}

export default SubHeader
