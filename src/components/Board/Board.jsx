import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useEffect } from "react"
import Header from "../../Common/Header/Header"
import SubHeader from "../../Common/SubHeader/SubHeader"
import Loading from "../Loading.jsx/Loading"
import Lists from "../Lists/Lists"
import { boards } from "../Initial/initialData"

const Board = () => {
	const { data, userId, setData, setUserId, navigate } =
		useContext(AuthContext)

	useEffect(() => {
		setUserId(localStorage.getItem("userId"))
		if (!userId) navigate("/login")
		else {
			setData(boards)
		}
	}, [setData, setUserId, navigate, userId])

	return (
		<>
			{data ? (
				<>
					<Header />
					<SubHeader board={data[0]} />
					<Lists id={data[0].boardId} lists={data[0].lists} />
				</>
			) : (
				<Loading />
			)}
		</>
	)
}

export default Board
