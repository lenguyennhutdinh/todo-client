import axios from "axios"
const getCards = async () => {
	try {
		const response = await axios.get("http://localhost:5000/api/cards")
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const getCardsByListId = async (id) => {
	try {
		const response = await axios.get(
			"http://localhost:5000/api/cards/" + id
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const getCardById = async (id) => {
	try {
		const response = await axios.get(
			"http://localhost:5000/api/cards/card/" + id
		)
		return response.data
	} catch (error) {
		console.log(error)
		return {}
	}
}

const createNewCard = async (newCard) => {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/cards",
			newCard
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const deleteCardById = async (cardId) => {
	try {
		const response = await axios.delete(
			"http://localhost:5000/api/cards/" + cardId
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const archivedCardById = async (cardId) => {
	try {
		const response = await axios.put(
			"http://localhost:5000/api/cards/archived/" + cardId
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

const renameCardById = async (cardId, newCardName) => {
	try {
		const response = await axios.put(
			"http://localhost:5000/api/cards/rename/" + cardId,
			{ newCardName }
		)
		return response.data
	} catch (error) {
		console.log(error)
		return []
	}
}

export {
	getCards,
	getCardById,
	getCardsByListId,
	createNewCard,
	deleteCardById,
	archivedCardById,
	renameCardById,
}
