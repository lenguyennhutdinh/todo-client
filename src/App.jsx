import "./App.css"
import SignUp from "./components/Account/SignUp"
import Login from "./components/Account/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Board from "./components/Board/Board"
import { AuthProvider } from "./components/Context/AuthContext"
import { FormProvider } from "./components/Context/FormContext"
import Notify from "./components/Notify/Notify"

function App() {
	return (
		<Router>
			<AuthProvider>
				<Notify />
				<FormProvider>
					<Routes>
						<Route path="/" element={<Board />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</FormProvider>
			</AuthProvider>
		</Router>
	)
}

export default App
