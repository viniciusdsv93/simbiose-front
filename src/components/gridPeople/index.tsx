import { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./styled";
import Button from "../button";
import UpdateModal from "../updateModal";
import swal from "sweetalert";
import "./swalStyle.css";

type person = {
	id: string;
	name: string;
	email: string;
	birthday: string;
};

type propTypes = {
	getPeople: () => void;
	peopleData: person[];
};

const GridPeople = ({ getPeople, peopleData }: propTypes) => {
	const [update, setUpdate] = useState(false);

	const [dataToUpdate, setDataToUpdate] = useState<person>({
		id: "",
		name: "",
		email: "",
		birthday: "",
	});

	const deletePerson = (id: string) => {
		swal("Tem certeza de que quer excluir?", {
			dangerMode: true,
			buttons: {
				no: {
					text: "Não",
					value: false,
				},
				yes: {
					text: "Sim",
					value: true,
				},
			},
		}).then((value) => {
			if (value) {
				axios
					.delete(`https://simbiose-api-crud.herokuapp.com/pessoa/${id}`)
					.then(() => {
						swal("Pessoa excluída com sucesso do banco de dados");
						getPeople();
					})
					.catch((err) => {
						if (err) {
							swal(
								"Não foi possível deletar a pessoa. Por favor, tente novamente."
							);
						}
					});
			}
		});
	};

	const openUpdateModal = (personData: person) => {
		setUpdate(true);
		setDataToUpdate(personData);
	};

	useEffect(() => {
		getPeople();
	}, []);

	return (
		<S.Grid>
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Email</th>
						<th>Data de Nascimento</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{peopleData.map((person: person) => {
						return (
							<tr key={person.id}>
								<td>{person.name}</td>
								<td>{person.email}</td>
								<td>{person.birthday}</td>
								<td>
									<S.UpdateButton
										onClick={() => openUpdateModal(person)}>
										Alterar
									</S.UpdateButton>
								</td>
								<td>
									<S.DeleteButton
										onClick={() => deletePerson(person.id)}>
										Deletar
									</S.DeleteButton>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Button
				content={"Clique para atualizar"}
				onClickHandler={() => getPeople()}
			/>
			{update ? (
				<UpdateModal
					dataToUpdate={dataToUpdate}
					setUpdate={setUpdate}
					getPeople={getPeople}
				/>
			) : null}
		</S.Grid>
	);
};

export default GridPeople;
