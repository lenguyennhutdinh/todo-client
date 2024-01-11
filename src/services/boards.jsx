import axios from "axios"
const getBoards = async () => {
	try {
		const response = await axios.get("http://localhost:5000/api/boards")
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const getBoardsByUserId = async (userId) => {
	try {
		const response = await axios.get(
			"http://localhost:5000/api/boards/user/" + userId
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const getBoardById = async (boardId) => {
	try {
		const response = await axios.get(
			"http://localhost:5000/api/boards/" + boardId
		)
		return response.data
	} catch (error) {
		console.log(error)
		return {}
	}
}

const createNewBoard = async (newBoard) => {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/boards",
			newBoard
		)
		return response.data
	} catch (error) {
		console.log(error)
		return {}
	}
}

const deleteBoardById = async (boardId) => {
	try {
		const response = await axios.delete(
			"http://localhost:5000/api/boards/" + boardId
		)
		return response.data
	} catch (error) {
		console.log(error)
		return {}
	}
}

const updateBoardNameById = async (board) => {
	try {
		const response = await axios.patch(
			"http://localhost:5000/api/boards/rename/" + board._id,
			board
		)
		return response.data
	} catch (error) {
		console.log(error)
		return {}
	}
}

const updatePositionListsBoardById = async (boardId, positionLists) => {
	try {
		const response = await axios.patch(
			"http://localhost:5000/api/boards/positionLists/" + boardId,
			{ positionLists }
		)
		return response.data
	} catch (error) {
		console.log(error)
		return {}
	}
}

export {
	getBoards,
	getBoardById,
	createNewBoard,
	deleteBoardById,
	updateBoardNameById,
	updatePositionListsBoardById,
	getBoardsByUserId,
}
