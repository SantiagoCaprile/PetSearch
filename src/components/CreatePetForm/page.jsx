"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import Pet from "@/classes/Pet";
import CalendarComponent from "@components/Calendar/page.jsx"

//This is a component that allows the user to create a pet o edit.
// it depends if the pet object is passed as a prop or not.
export default function CreatePetForm({ editPet }) {
    const { data: session } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (editPet) {
            Pet.getPetById(editPet).then((pet) => {
                if (pet) {
                    setValue("name", pet.name);
                    if (pet.breed === "Mestizo") {
                        document.getElementById("mixed").checked = true;
                        document.getElementById("breed").disabled = true;
                        document.getElementById("breed").value = "Mestizo";
                        setValue("breed", "Mestizo");
                    } else {
                        setValue("breed", pet.breed);
                    }
                    setValue("size", pet.size);
                    setValue("sex", pet.sex)
                    setValue("description", pet.description);
                    setValue("specie", pet.specie);
                    setValue("goodWithKids", pet.characteristics.find(c => c.key === "goodWithKids").value);
                    setValue("goodWithDogs", pet.characteristics.find(c => c.key === "goodWithDogs").value);
                    setValue("goodWithCats", pet.characteristics.find(c => c.key === "goodWithCats").value);
                    setValue("neutered", pet.characteristics.find(c => c.key === "neutered").value);
                    setValue("vaccinated", pet.characteristics.find(c => c.key === "vaccinated").value);
                    setDate(new Date(pet.birthDate));
                    setImagePreviews(pet.images);
                    // setImages(pet.images); VER COMO IMPLIEMENTAR ESTO EN EL EDIT
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [editPet]);

    //should optimize the images
    const handleImagesChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            toast.error("No se pueden subir más de 3 imágenes");
            setImagePreviews([]);
            e.target.value = null;
            return;
        }
        const imagePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(imagePreviews);
        const base64Images = await Promise.all(files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const img = new Image();
                    img.src = reader.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 1280;
                        const MAX_HEIGHT = 720;
                        let width = img.width;
                        let height = img.height;
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        const optimizedImage = canvas.toDataURL('image/jpeg', 0.8);
                        resolve(optimizedImage);
                    };
                };
                reader.onerror = error => reject(error);
            });
        }));
        setImages(base64Images);
    };

    const onSubmit = async (data) => {
        document.getElementById("submitButton").disabled = true;
        const pet = {
            images,
            birthDate: date.toISOString(),
            characteristics: [
                {
                    key: "goodWithKids",
                    value: data.goodWithKids,
                },
                {
                    key: "goodWithDogs",
                    value: data.goodWithDogs,
                },
                {
                    key: "goodWithCats",
                    value: data.goodWithCats,
                },
                {
                    key: "neutered",
                    value: data.neutered,
                },
                {
                    key: "vaccinated",
                    value: data.vaccinated,
                },
            ],
            rescuer: session.user._id,
            ...data,
        };
        editPet ? pet._id = editPet : null;
        if (editPet) {
            submitEditPet(pet, session).finally(() => {
                router.push("/mypets");
            });
        } else {
            console.log(pet, session);
            submitCreatePet(pet, session).finally(() => {
                router.push("/mypets");
            });
        }
    };

    const handleMixedChange = (e) => {
        if (e.target.checked) {
            document.getElementById("breed").value = "Mestizo";
            document.getElementById("breed").disabled = true;
            setValue("breed", "Mestizo");
        } else {
            document.getElementById("breed").value = "";
            document.getElementById("breed").disabled = false;
            setValue("breed", "");
        }
    }

    return (
        <div className="md:w-3/5 mx-auto p-6 w-full bg-white md:my-4 md:shadow-sm md:rounded-sm flex flex-col items-center">
            {editPet ? <h1 className="text-4xl mb-4">Editar mascota</h1> : <h1 className="text-4xl mb-4">Crear mascota</h1>}
            <form onSubmit={handleSubmit(onSubmit)} className="pb-5">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg font-semibold">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full md:max-w-lg"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-lg font-semibold">
                        Nacimiento (si se desconoce ingresar fecha aproximada)
                    </label>
                    <CalendarComponent onChange={setDate} date={date} />
                </div>
                <div className="mb-4">
                    <label htmlFor="breed" className="block text-lg font-semibold">
                        Raza
                    </label>
                    <div className="flex justify-around items-center gap-2">
                        <input
                            type="text"
                            id="breed"
                            {...register("breed")}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full md:max-w-lg"
                        />
                        <label htmlFor="mixed">
                            Mestizo:
                        </label>
                        <input
                            type='checkbox'
                            id='mixed'
                            className='cursor-pointer'
                            onChange={handleMixedChange}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="size" className="block text-lg font-semibold">
                        Tamaño
                    </label>
                    <select
                        id="size"
                        {...register("size")}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full md:max-w-lg"
                    >
                        <option value={Pet.SIZES.SMALL}>Pequeño</option>
                        <option value={Pet.SIZES.MEDIUM}>Mediano</option>
                        <option value={Pet.SIZES.LARGE}>Grande</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="text-lg font-semibold">
                        Sexo
                    </label>
                    <div className="flex justify-center gap-2">
                        <label htmlFor="sex-male" className="font-medium">
                            Macho
                        </label>
                        <input
                            type="radio"
                            id="sex-male"
                            value={Pet.SEXS.MALE}
                            name="sex"
                            {...register("sex")}
                        />
                        <label htmlFor="sex-male" className="font-medium">
                            Hembra
                        </label>
                        <input
                            type="radio"
                            id="sex-female"
                            name="sex"
                            value={Pet.SEXS.FEMALE}
                            {...register("sex")}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg font-semibold">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        {...register("description")}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full md:max-w-lg resize-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="specie" className="block text-lg font-semibold">
                        Especie
                    </label>
                    <select
                        id="specie"
                        {...register("specie")}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full md:max-w-lg"
                    >
                        <option value="cat">Gato</option>
                        <option value="dog">Perro</option>
                    </select>
                </div>
                <div className="grid md:grid-cols-2 gap-3 md:max-w-lg mb-4">
                    <label className="block text-lg font-semibold">
                        Caracteristicas
                    </label>
                    <label className="flex flex-1 items-center justify-between">
                        Bueno con niños:
                        <input
                            type="checkbox"
                            name="goodWithKids"
                            {...register("goodWithKids")}
                            className="accent-green-500 cursor-pointer h-4 w-4"
                        />
                    </label>
                    <label className="flex gap-1 items-center justify-between">
                        Bueno con perros:
                        <input
                            type="checkbox"
                            name="goodWithDogs"
                            {...register("goodWithDogs")}
                            className="accent-green-500 cursor-pointer h-4 w-4"
                        />
                    </label>
                    <label className="flex gap-1 items-center justify-between">
                        Bueno con gatos:
                        <input
                            type="checkbox"
                            name="goodWithCats"
                            {...register("goodWithCats")}
                            className="accent-green-500 cursor-pointer h-4 w-4"
                        />
                    </label>
                    <label className="flex gap-1 items-center justify-between">
                        Castrado:
                        <input
                            type="checkbox"
                            name="neutered"
                            {...register("neutered")}
                            className="accent-green-500 cursor-pointer h-4 w-4"
                        />
                    </label>
                    <label className="flex gap-1 items-center justify-between">
                        Vacunado:
                        <input
                            type="checkbox"
                            name="vaccinated"
                            {...register("vaccinated")}
                            className="accent-green-500 cursor-pointer h-4 w-4"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="images" className="block text-lg font-semibold">
                        Imagenes
                    </label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        onChange={handleImagesChange}
                        className="file:mr-4 file:p-8
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-green-200 file:text-green-700
      file:cursor-pointer file:transition file:duration-150 file:ease-in-out file:transform file:hover:scale-105
      hover:file:bg-green-300 md:max-w-lg"
                    />
                </div>
                <div className="image-preview flex gap-1 h-fit mb-2">
                    {imagePreviews.map((image, index) => (
                        <div key={index} className="image-container w-24 md:w-36 overflow-hidden">
                            <img src={image} alt={`Preview ${index}`} className="thumbnail" />
                        </div>
                    ))}
                </div>
                <button
                    id="submitButton"
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    {editPet ? "Guardar Mascota" : "Crear Mascota"}
                </button>
            </form>
        </div>
    );
}

//this will be used to create a pet
async function submitCreatePet(pet, session) {
    const toastId = toast.loading("Creando mascota...");
    try {
        const response = await Pet.createPet(pet, { token: session.jwtApiToken, role: session.user.role });
        if (response) {
            toast.success("Mascota creada exitosamente", { id: toastId });
        } else {
            throw new Error("Failed to create pet");
        }
    } catch (error) {
        toast.error("Error al crear mascota", { id: toastId });
        document.getElementById("submitButton").disabled = false;
    }
}

//this will be used to edit a pet
async function submitEditPet(pet, session) {
    const toastId = toast.loading("Guardando mascota...");
    try {
        const response = await Pet.updatePet(pet._id, pet, { token: session.jwtApiToken, role: session.user.role });
        if (response) {
            toast.success("Mascota editada exitosamente", { id: toastId });
        } else {
            throw new Error("Failed to edit pet");
        }
    } catch (error) {
        toast.error("Error al editar mascota", { id: toastId });
        document.getElementById("submitButton").disabled = false;
    }
}

