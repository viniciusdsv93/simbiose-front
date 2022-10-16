import * as S from "./styled";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

type updatePersonData = {
	newName: string;
	newEmail: string;
	newBirthday: string;
};

type person = {
	id: string;
	name: string;
	email: string;
	birthday: string;
};

type propTypes = {
	dataToUpdate: person;
	setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
	getPeople: () => void;
};

const updatePersonSchema = Yup.object().shape({
	newName: Yup.string()
		.required("Por favor, insira um nome.")
		.min(3, "O nome deve conter ao menos 3 caracteres"),
	newEmail: Yup.string()
		.required("Por favor, insira um email.")
		.email("Formato inválido de email"),
	newBirthday: Yup.date().required("Por favor, insira a data de nascimento"),
});

const UpdateModal = ({ dataToUpdate, setUpdate, getPeople }: propTypes) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<updatePersonData>({
		resolver: yupResolver(updatePersonSchema),
	});

	function addZero(number: number) {
		if (number <= 9) return "0" + number;
		else return number;
	}

	const handleUpdatePerson: SubmitHandler<updatePersonData> = async (values) => {
		let date = new Date(values.newBirthday);

		let formatedBirthday =
			addZero(date.getDate()).toString() +
			"/" +
			addZero(date.getMonth() + 1).toString() +
			"/" +
			date.getFullYear();

		axios
			.put(`https://simbiose-api-crud.herokuapp.com/pessoa/${dataToUpdate.id}`, {
				name: values.newName,
				email: values.newEmail,
				birthday: formatedBirthday,
			})
			.then(() => {
				swal("Dados alterados com sucesso no banco de dados");
				setUpdate(false);
				getPeople();
			})
			.catch((err) => {
				if (err) {
					swal(
						"Não foi possível concluir a alteração:",
						err?.response?.data?.message
					);
					setUpdate(false);
				}
			});
	};

	return (
		<S.UpdateModal>
			<p>Insira os dados que deseja alterar:</p>
			<S.FormModal action="" onSubmit={handleSubmit(handleUpdatePerson)}>
				<S.InputModal
					defaultValue={dataToUpdate.name}
					placeholder="Digite o novo nome..."
					type="text"
					maxLength={100}
					id="newName"
					{...register("newName")}
				/>
				{errors.newName && (
					<S.InputErrorMessage>{errors.newName.message}</S.InputErrorMessage>
				)}
				<S.InputModal
					defaultValue={dataToUpdate.email}
					placeholder="Digite o novo email..."
					type="text"
					maxLength={100}
					id="newEmail"
					{...register("newEmail")}
				/>
				{errors.newEmail && (
					<S.InputErrorMessage>{errors.newEmail.message}</S.InputErrorMessage>
				)}
				<S.InputModal
					placeholder="Digite a nova data de nascimento..."
					type="date"
					id="newBirthday"
					{...register("newBirthday")}
				/>
				{errors.newBirthday && (
					<S.InputErrorMessage>
						{"Formato inválido de data"}
					</S.InputErrorMessage>
				)}
				<S.FormModalSubmit type="submit" value="Confirmar alteração" />
				<S.CancelButton onClick={() => setUpdate(false)}>
					Cancelar alteração
				</S.CancelButton>
			</S.FormModal>
		</S.UpdateModal>
	);
};

export default UpdateModal;
