import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

const Notify = () => {
	const { alert, handleCloseAlert } = useContext(AuthContext)

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar
				open={alert.isAlert}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert
					onClose={handleCloseAlert}
					variant="filled"
					severity={alert.severity}
					sx={{ width: "100%" }}
				>
					{alert.message}
				</Alert>
			</Snackbar>
		</Stack>
	)
}
export default Notify
