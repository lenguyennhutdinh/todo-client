import "./App.css"
import SignUp from "./components/Account/SignUp"
import Login from "./components/Account/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Board from "./components/Board/Board"
import { AuthProvider } from "./components/Context/AuthContext"
import { FormProvider } from "./components/Context/FormContext"
import Notify from "./components/Notify/Notify"
import StateProvider from "./components/Context/StateContext"

function App() {
	return (
		<Router>
			<AuthProvider>
				<Notify />
				<FormProvider>
					<StateProvider>
						<Routes>
							<Route path="/" element={<Board />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/login" element={<Login />} />
						</Routes>
					</StateProvider>
				</FormProvider>
			</AuthProvider>
		</Router>
	)
}

export default App
