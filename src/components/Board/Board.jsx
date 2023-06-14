import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useEffect } from "react"
import Header from "../../Common/Header/Header"
import SubHeader from "../../Common/SubHeader/SubHeader"
import Loading from "../Loading.jsx/Loading"
import Lists from "../Lists/Lists"
import { StateContext } from "../Context/StateContext"
import { getBoards } from "../../services/boards"

const Board = () => {
	const { data, userId, setData, setUserId, navigate } =
		useContext(AuthContext)
	const { board, setBoard } = useContext(StateContext)

	const getBoardsDB = async () => {
		const boardsDB = await getBoards()
		const boardDB = boardsDB[0]
		setData(boardsDB)
		setBoard(boardDB)
	}

	useEffect(() => {
		setUserId(localStorage.getItem("userId"))
		if (!userId) navigate("/login")
		else {
			getBoardsDB()
		}
	}, [setUserId, navigate, userId])

	return (
		<>
			{data ? (
				<>
					<Header />
					<SubHeader />
					<Lists />
				</>
			) : (
				<Loading />
			)}
		</>
	)
}

export default Board
