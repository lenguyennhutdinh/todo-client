import axios from "axios"
const getLists = async () => {
	try {
		const response = await axios.get("http://localhost:5000/api/lists")
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const getListsByBoardId = async (id) => {
	try {
		const response = await axios.get(
			"http://localhost:5000/api/lists/" + id
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const getListById = async (id) => {
	try {
		const response = await axios.get(
			"http://localhost:5000/api/lists/list/" + id
		)
		return response.data
	} catch (error) {
		console.log(error)
		return {}
	}
}

const createNewList = async (newList) => {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/lists",
			newList
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const deleteListById = async (listId) => {
	try {
		const response = await axios.delete(
			"http://localhost:5000/api/lists/" + listId
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const archivedListById = async (listId) => {
	try {
		const response = await axios.put(
			"http://localhost:5000/api/lists/archived/" + listId
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const renameListById = async (listId, newListName) => {
	try {
		const response = await axios.put(
			"http://localhost:5000/api/lists/rename/" + listId,
			{ newListName }
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

export {
	getLists,
	getListById,
	getListsByBoardId,
	createNewList,
	deleteListById,
	archivedListById,
	renameListById,
}
