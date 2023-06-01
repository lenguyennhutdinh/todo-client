import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useEffect } from "react"
import { auth } from "../../firebase/config"
import { signOut } from "firebase/auth"

const Boards = () => {
	const { userId, setUserId, navigate } = useContext(AuthContext)
	useEffect(() => {
		setUserId(localStorage.getItem("userId"))
		if (!userId) navigate("/login")
	}, [userId, setUserId, navigate])

	const handleLogout = () => {
		// localStorage.clear()
		localStorage.removeItem("firebaseUser")
		sessionStorage.removeItem("firebaseUser")
		signOut(auth).then(() => {
			navigate("/login")
		})
	}

	return (
		<>
			<h1>Home</h1>
			<button onClick={handleLogout}>Sign out</button>
		</>
	)
}

export default Boards
