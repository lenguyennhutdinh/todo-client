import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useEffect } from 'react'
import Header from '../../Common/Header/Header'
import SubHeader from '../../Common/SubHeader/SubHeader'
import Loading from '../Loading.jsx/Loading'
import Lists from '../Lists/Lists'
import { StateContext } from '../Context/StateContext'
import { getBoardsByUserId } from '../../services/boards'

const Board = () => {
	const { data, userId, setData, setUserId, navigate } = useContext(AuthContext)
	const { setBoard, handleInOutElement } = useContext(StateContext)
	useEffect(() => {
		setUserId(localStorage.getItem('userId'))
		if (!userId) navigate('/login')
		else {
			getBoardsByUserId(userId).then((data) => {
				setData(data)
				setBoard(data[0])
			})
			// console.log("<<<< getBoards")
		}
	}, [setUserId, navigate, userId])

	return (
		<div className="app" onClick={handleInOutElement}>
			{data ? (
				<>
					<Header />
					<SubHeader />
					<Lists />
				</>
			) : (
				<Loading />
			)}
		</div>
	)
}

export default Board
