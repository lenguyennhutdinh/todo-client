import "./App.css"
import SignUp from "./components/Account/SignUp"
import Login from "./components/Account/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Boards from "./components/Boards/Boards"
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
						<Route path="/" element={<Boards />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
					</Routes>
				</FormProvider>
			</AuthProvider>
		</Router>
	)
}

export default App
