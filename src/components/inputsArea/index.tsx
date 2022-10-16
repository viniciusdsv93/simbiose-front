import axios from "axios";
import * as S from "./styled";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import swal from "sweetalert";
import Button from "../button";
import { useState } from "react";
import GetByIdModal from "../getByIdModal";

type person = {
	id: string;
	name: string;
	email: string;
	birthday: string;
};

type personData = {
	name: string;
	email: string;
	birthday: string;
};

type propTypes = {
	getPeople: () => void;
	setPeopleData: React.Dispatch<React.SetStateAction<person[]>>;
	peopleData: person[];
};

const newPersonSchema = Yup.object().shape({
	name: Yup.string()
		.required("Por favor, insira um nome.")
		.min(3, "O nome deve conter ao menos 3 caracteres"),
	email: Yup.string()
		.required("Por favor, insira um email.")
		.email("Formato inválido de email"),
	birthday: Yup.date().required("Por favor, insira a data de nascimento"),
});

const InputsArea = ({
	getPeople: getPeople,
	setPeopleData: setPeopleData,
	peopleData: peopleData,
}: propTypes) => {
	const [searchById, setSearchById] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<personData>({
		resolver: yupResolver(newPersonSchema),
	});

	function addZero(number: number) {
		if (number <= 9) return "0" + number;
		else return number;
	}

	const handleInsertNewPerson: SubmitHandler<personData> = async (values) => {
		let date = new Date(values.birthday);

		let formatedBirthday =
			addZero(date.getDate()).toString() +
			"/" +
			addZero(date.getMonth() + 1).toString() +
			"/" +
			date.getFullYear();

		axios
			.post("https://simbiose-api-crud.herokuapp.com/pessoa", {
				name: values.name,
				email: values.email,
				birthday: formatedBirthday,
			})
			.then(() => {
				swal("Dados inseridos com sucesso no banco de dados");
				getPeople();
			})
			.catch((err) => {
				if (err) {
					swal(
						"Não foi possível concluir o cadastro:",
						err.response.data.message
					);
				}
			});
	};

	return (
		<S.InputsField>
			<p>Por favor, insira aqui os dados da pessoa a ser cadastrada:</p>
			<S.Form action="" onSubmit={handleSubmit(handleInsertNewPerson)}>
				<S.InputField>
					<S.InputTitle>Name:</S.InputTitle>
					<S.Input
						placeholder="Digite o nome..."
						type="text"
						maxLength={100}
						id="name"
						{...register("name")}
					/>
				</S.InputField>
				{errors.name && (
					<S.InputErrorMessage>{errors.name.message}</S.InputErrorMessage>
				)}
				<S.InputField>
					<S.InputTitle>Email:</S.InputTitle>
					<S.Input
						placeholder="Digite o email..."
						type="text"
						maxLength={100}
						id="email"
						{...register("email")}
					/>
				</S.InputField>
				{errors.email && (
					<S.InputErrorMessage>{errors.email.message}</S.InputErrorMessage>
				)}
				<S.InputField
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<S.InputTitle>Nascimento:</S.InputTitle>
					<S.Input
						placeholder="Insira a data de nascimento..."
						type="date"
						id="birthday"
						{...register("birthday")}
					/>
				</S.InputField>
				{errors.birthday && (
					<S.InputErrorMessage>
						{"Formato inválido de data"}
					</S.InputErrorMessage>
				)}
				<S.ButtonsField>
					<S.FormSubmit type="submit" value="Inserir nova pessoa" />
					<Button
						content={"Buscar uma pessoa"}
						onClickHandler={() => setSearchById(true)}
					/>
				</S.ButtonsField>
			</S.Form>
			{searchById ? (
				<GetByIdModal
					peopleData={peopleData}
					setSearchById={setSearchById}
					setPeopleData={setPeopleData}
				/>
			) : null}
		</S.InputsField>
	);
};

export default InputsArea;
