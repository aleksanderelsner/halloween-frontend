import './styles/App.css';
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

function App() {
	const backendUrl = process.env.REACT_APP_BACKEND_URL;
	const [inputValue, setInputValue] = useState('');
	const [email, setEmail] = useState('');
	const [costumes, setCostumes] = useState([]);

	const handleChangeState = (event) => {
		const value = event.target.value;
		if (costumes.length > 4) {
			alert("kurwa nie przesadzaj z tymi kostiumami, 5 ci starczy łapciuchu");
			return;
		}
		setInputValue(value);
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && inputValue.trim() !== '') {
			event.preventDefault();
			setCostumes([...costumes, inputValue.trim()]);
			setInputValue('');
		}
	}

	const resetCostumes = () => {
		setCostumes([]);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("calling api");
		const resp = await fetch(backendUrl + '/costumes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, costumes }),
		})
		console.log(resp);
		setInputValue('');
		setCostumes([]);
		setEmail('');
	}

  return (
    <div className="App">
		<Form onSubmit={handleSubmit} className="Form">
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label column="lg">Email</Form.Label>
				<Form.Control
						type="email"
						placeholder="Zapodaj email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
				/>
				<Form.Label column="lg">Dodaj kostium</Form.Label>
				<Form.Control
						type="text"
						placeholder="Kostiumy"
						onChange={handleChangeState}
						onKeyDown={handleKeyDown}
						value={inputValue}
				/>
				<Form.Label column="sm">{ costumes.join(', ') }</Form.Label>
			</Form.Group>
			<Button variant="primary"
					type="submit">Wyślij</Button>
			<Button variant="secondary" onClick={resetCostumes}>Resetuj</Button>
		</Form>
    </div>
  );
}

export default App;
