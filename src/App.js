import './styles/App.css';
import { Button } from "react-bootstrap";

function App() {
	const backendUrl = process.env.REACT_APP_BACKEND_URL;
	const callApi = () => fetch(backendUrl + '/costumes')
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error fetching data:', error));
  return (
    <div className="App">
		<Button variant="primary" onClick={callApi}>TEST</Button>
    </div>
  );
}

export default App;
