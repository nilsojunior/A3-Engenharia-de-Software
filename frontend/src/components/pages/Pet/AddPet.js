import styles from "./AddPet.module.css";
import api from "../../../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import PetForm from "../../form/PetForm";

function AddPet() {
    const [token] = useState(localStorage.getItem("token") || "");
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();
    async function registerPet(pet) {
        let msgType = "success";

        const formData = new FormData();

        Object.keys(pet).forEach((key) => {
            if (key === "images") {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append("images", pet[key][i]);
                }
            } else {
                formData.append(key, pet[key]);
            }
        });

        const data = await api
            .post("pets/create", formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                msgType = "error";
                return err.response?.data || {message: err.message};
            });

        setFlashMessage(data.message, msgType);

        if (msgType !== "error") {
            navigate("/pets/mypets");
        }
    }

    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastrar Pet</h1>
                <p>Após o cadastro o Pet ficará disponível para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
        </section>
    );
}

export default AddPet;
