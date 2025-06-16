import { useState } from "react";
import formStyles from "./Form.module.css";
import Input from "./Input";

function PetForm({ handleSubmit, petData, btnText }) {
    const [pet, setPet] = useState(petData || {});
    const [preview, setPreview] = useState([]);

    function onFileChange(e) {
        setPreview(Array.from(e.target.files));
        setPet({ ...pet, images: [...e.target.files] });
    }

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: [e.target.value] });
    }

    function submit(e) {
        e.preventDefault();
        handleSubmit(pet);
    }

    return (
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                          <img
                              src={URL.createObjectURL(image)}
                              alt={pet.name}
                              key={`${pet.name}+${index}`}
                          />
                      ))
                    : pet.images &&
                      pet.images.map((image, index) => (
                          <img
                              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                              alt={pet.name}
                              key={`${pet.name}+${index}`}
                          />
                      ))}
            </div>
            <Input
                text="imagens do Pet"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do Pet"
                type="text"
                name="name"
                placeholder="Digite o nome do Pet"
                handleOnChange={handleChange}
                value={pet.name || ""}
            />
            <Input
                text="Idade do Pet"
                type="number"
                name="age"
                placeholder="Digite idade do Pet"
                handleOnChange={handleChange}
                value={pet.age || ""}
            />
            <Input
                text="Peso do Pet"
                type="number"
                name="weight"
                placeholder="Digite o peso do Pet"
                handleOnChange={handleChange}
                value={pet.weight || ""}
            />
            <Input
                text="Raça do Pet"
                type="text"
                name="breed"
                placeholder="Digite a raça do Pet"
                handleOnChange={handleChange}
                value={pet.breed || ""}
            />
            <Input
                text="Sexo do Pet"
                type="text"
                name="gender"
                placeholder="Digite o sexo do Pet"
                handleOnChange={handleChange}
                value={pet.gender || ""}
            />
            <Input
                text="Porte do Pet"
                type="text"
                name="size"
                placeholder="Digite o porte do Pet"
                handleOnChange={handleChange}
                value={pet.size || ""}
            />
            <Input
                text="Cidade onde está o Pet"
                type="text"
                name="local"
                placeholder="Digite a cidade onde o Pet está"
                handleOnChange={handleChange}
                value={pet.local || ""}
            />
            <input type="submit" value={btnText} />
        </form>
    );
}

export default PetForm;
