import axios from "axios";
import { useState } from "react";
import Footer from "./components/footer";
import { GlobalStyle, Main } from "./components/global/globalCSS";
import GridPeople from "./components/gridPeople";
import HeaderDiv from "./components/header";
import InputsArea from "./components/inputsArea";

type person = {
	id: string;
	name: string;
	email: string;
	birthday: string;
};

function App() {
	const [peopleData, setPeopleData] = useState<person[]>([]);

	const getPeople = async () => {
		const response = await axios.get(
			"https://simbiose-api-crud.herokuapp.com/pessoas"
		);
		setPeopleData(response.data);
	};

	return (
		<Main>
			<GlobalStyle />
			<HeaderDiv />
			<InputsArea
				getPeople={getPeople}
				setPeopleData={setPeopleData}
				peopleData={peopleData}
			/>
			<GridPeople getPeople={getPeople} peopleData={peopleData} />
			<Footer />
		</Main>
	);
}

export default App;
