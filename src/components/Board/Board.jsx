import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useEffect } from "react"
import Header from "../../Common/Header/Header"
import SubHeader from "../../Common/SubHeader/SubHeader"
import Loading from "../Loading.jsx/Loading"
import Lists from "../Lists/Lists"
import { boards } from "../Initial/initialData"
import { StateContext } from "../Context/StateContext"

const Board = () => {
	const { data, userId, setData, setUserId, navigate } =
		useContext(AuthContext)
	const { board, setBoard, lists, setLists } = useContext(StateContext)

	useEffect(() => {
		setUserId(localStorage.getItem("userId"))
		if (!userId) navigate("/login")
		else {
			setData(boards)
			setBoard(boards[0])
			setLists(boards[0].lists)
		}
	}, [setData, setUserId, navigate, userId])

	return (
		<>
			{data ? (
				<>
					<Header />
					<SubHeader board={board} />
					{lists ? <Lists id={board.boardId} /> : <Loading />}
				</>
			) : (
				<Loading />
			)}
		</>
	)
}

export default Board
