import * as S from "./styled";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";

type person = {
	id: string;
	name: string;
	email: string;
	birthday: string;
};

type propTypes = {
	peopleData: person[];
	setSearchById: React.Dispatch<React.SetStateAction<boolean>>;
	setPeopleData: React.Dispatch<React.SetStateAction<person[]>>;
};

const GetByIdModal = ({ peopleData, setSearchById, setPeopleData }: propTypes) => {
	const [emailTarget, setEmailTarget] = useState("");

	const handleSearchById = (emailTarget: string) => {
		let person = peopleData.find((element) => element.email === emailTarget.trim());

		axios
			.get(`https://simbiose-api-crud.herokuapp.com/pessoa/${person?.id}`)
			.then((result) => {
				swal("Pessoa localizada");
				let resultArray: person[] = [result.data];
				setPeopleData(resultArray);
				setSearchById(false);
			})
			.catch((err) => {
				if (err) {
					swal(
						`Não foi encontrada nenhuma pessoa cadastrada com o email: ${emailTarget}`
					);
					setSearchById(false);
				}
			});
	};

	return (
		<S.GetByIdModal>
			<p>Insira o email da pessoa que deseja buscar:</p>

			<S.InputModal
				value={emailTarget}
				onChange={(e) => setEmailTarget(e.target.value)}
				placeholder="Digite o email a ser buscado..."
				type="text"
				maxLength={100}
			/>
			<S.SearchButton onClick={() => handleSearchById(emailTarget)}>
				Buscar pessoa
			</S.SearchButton>
			<S.CancelButton onClick={() => setSearchById(false)}>
				Cancelar busca
			</S.CancelButton>
		</S.GetByIdModal>
	);
};

export default GetByIdModal;
