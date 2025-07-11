import styles from "./PetDetails.module.css";
import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";

function PetDetails() {
    const [pet, setPet] = useState({});
    const { id } = useParams();
    const { setFlashMessage } = useFlashMessage();
    const [token] = useState(localStorage.getItem("token" || ""));

    useEffect(
        (pet) => {
            api.get(`/pets/${id}`).then((response) => {
                setPet(response.data.pet);
            });
        },
        [id],
    );

    async function schedule() {
        if (!pet._id) return;

        let msgType = "success";

        const data = await api
            .patch(
                `/pets/schedule/${pet._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                },
            )
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                msgType = "error";
                return err.response.data;
            });

        setFlashMessage(data.message, msgType);
    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.pet_details_header}>
                        <h1>Detalhes do Pet: {pet.name}</h1>
                        <p>
                            Gostaria de conhecer seu novo amigo? Marque uma
                            visita!
                        </p>
                    </div>
                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img
                                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                                alt={pet.name}
                                key={index}
                            />
                        ))}
                    </div>
                    <p>
                        <span className="bold">Peso:</span> {pet.weight}kg
                    </p>
                    <p>
                        <span className="bold">Idade:</span> {pet.age} Ano(s)
                    </p>
                    <p>
                        <span className="bold">Raça:</span> {pet.breed}
                    </p>
                    <p>
                        <span className="bold">Sexo:</span> {pet.gender}
                    </p>
                    <p>
                        <span className="bold">Porte:</span> {pet.size}
                    </p>
                    <p>
                        <span className="bold">Cidade em que se encontra:</span>{" "}
                        {pet.local}
                    </p>
                    <p>
                        {token ? (
                            <button onClick={schedule}>Marcar visita</button>
                        ) : (
                            <p>
                                Você precisa{" "}
                                <Link to="/register">criar uma conta</Link> para
                                solicitar a visita!
                            </p>
                        )}
                    </p>
                </section>
            )}
        </>
    );
}

export default PetDetails;
