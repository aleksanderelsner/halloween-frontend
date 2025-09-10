import './styles/App.css';
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

function App() {
	const backendUrl = process.env.REACT_APP_BACKEND_URL;
	const [inputValue, setInputValue] = useState('');
	const [email, setEmail] = useState('');
	const [costumes, setCostumes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [usedEmails, setUsedEmails] = useState([]);

	useEffect(() => {
		fetch(backendUrl + '/emails')
				.then(response => response.json())
				.then(data => setUsedEmails(data))
	}, []);

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
		if (usedEmails.includes(email)) {
			alert("Gdzie sie kurwa pchasz drugi raz, jak zjebals to pisz do alka to ci pomoze");
			return;
		}
		if (costumes.length === 0 ) {
			alert("No kurwa wpisz cos w te kostiumy, nie pierdol sie");
			return;
		}
		setLoading(true);
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
		alert("Dzięki za zgłoszenie osobo pijacka: " + email + ", wyslalos " + costumes.join(", "));
	}

  return (
    <div className="App">
		<Form onSubmit={handleSubmit} className="Form">
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<p>Czesc, aby wziac udzial w losowaniu na halloween podaj swoj mail</p>
				<p>Za jakis czas dostaniesz na maila stroj ktory wylosowales</p>
				<p>Widzimy sie 31 pazdziernika :)</p>
				<p> </p>
				<h4>ZEBY ZATWIERDZIC KOSTIUM WCISNIJ ENTER</h4>
				<h6>pojawi sie on wtedy pod polem 'Dodaj kostium'</h6>
				<h6>mozesz kliknac `resetuj kostiumy`</h6>
				<h6>aby wyczyscic wprowadzone kostiumy</h6>
				<h6>Nacisnij `wyslij` zeby dodac kostiumy do losowania</h6>
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
