import './styles/App.css';
import {Button, Form} from "react-bootstrap";
import {use, useState} from "react";

function App() {
	const backendUrl = process.env.REACT_APP_BACKEND_URL;
	const [inputValue, setInputValue] = useState('');
	const [email, setEmail] = useState('');
	const [costumes, setCostumes] = useState([]);
	const [loading, setLoading] = useState(false);

	const usedEmails = fetch(backendUrl + '/emails')
		.then(response => response.json())
		.then(data => {
			console.log("Fetched emails:", data);
			return data;
		});

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
		setLoading(true);
		if ((await usedEmails).includes(email)) {
			alert("Gdzie sie kurwa pchasz drugi raz, jak zjebals to pisz do alka to ci pomoze");
			setLoading(false);
			return;
		}
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
		setLoading(false);
		alert("Dzięki za zgłoszenie" + email + ", wyslalos " + costumes.join(", "));
	}

  return (
    <div className="App">
		<Form onSubmit={handleSubmit} className="Form">
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label column="lg">Email</Form.Label>
				<Form.Control
						disabled={loading}
						type="email"
						placeholder="Zapodaj email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
				/>
				<Form.Label column="lg">Dodaj kostium (max 5)</Form.Label>
				<Form.Control
						disabled={loading}
						type="text"
						placeholder="enter zeby potwierdzic"
						onChange={handleChangeState}
						onKeyDown={handleKeyDown}
						value={inputValue}
				/>
				<Form.Label column="sm">{ costumes.join(', ') }</Form.Label>
			</Form.Group>
			<Button variant="primary"
					type="submit"
					disabled={loading}>Wyślij</Button>
			<Button variant="secondary"
					onClick={resetCostumes}
					disabled={loading}>Resetuj kostiumy</Button>
		</Form>
    </div>
  );
}

export default App;
