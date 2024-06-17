"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import Pet from "@/classes/Pet";
import CalendarComponent from "@components/Calendar/page.jsx"
import { X, Upload, RefreshCcw } from "lucide-react";
import { convertBatchImagesToBase64 } from "@/utils/imgFunctions";
import Image from "next/image";

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
    const [imgSaved, setImgSaved] = useState(false);
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
                    setImagePreviews(pet.images); //this is to show the images
                    setImages(pet.images); //this is to transform the images to base64 to save
                    setImgSaved(pet.images);//this is to refresh in case a mistake
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [editPet]);

    //should optimize the images
    const handleImagesChange = async (e) => {
        // if there are already images, should not overwrite them
        // should check if imagePreviews.lenght + files.length > 3
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            toast.error("No se pueden subir más de 3 imágenes");
            setImagePreviews([]);
            e.target.value = null;
            return;
        }

        if (editPet && (imagePreviews.length + files.length > 3)) {
            toast.error("No se pueden subir más de 3 imágenes");
            setImagePreviews(imgSaved);
            e.target.value = null;
            return;
        }

        const imagePreviewUrl = files.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...imagePreviewUrl]);

        const base64Images = await convertBatchImagesToBase64(files);

        //check if the image already exists
        // const newImages = base64Images.filter(image => !wasImageAlreadyUploaded(images, image));
        const newImgs = base64Images.filter((image, index) => {
            if (wasImageAlreadyUploaded(images, image)) {
                // setImagePreviews(imagePreviews.splice(index, 1));
                // setImages(images.splice(index, 1));
                //show a toast with a warning card
                toast.error("Parece haber imagenes duplicadas", { icon: "⚠️" })
                return null;
            }
            return image;
        });

        setImages([...images, ...base64Images]);

        e.target.value = null;
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
            submitEditPet(pet, session)
                .then(() => {
                    router.push("/mypets");
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            submitCreatePet(pet, session)
                .finally(() => {
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
                <div className="mb-4 flex flex-col">
                    <label htmlFor="images" className="text-lg font-semibold">
                        Imagenes
                    </label>
                    <label htmlFor="images" className="text-center p-6 rounded-lg border-0 text-sm font-semibold bg-green-200 text-green-700 cursor-pointer transition duration-150 ease-in-out 
                        transform hover:translate-y-1 hover:shadow-md active:translate-y-2 active:shadow-lg hover:bg-green-300 md:max-w-lg mb-2">
                        <Upload size={24} className="mr-2 inline" />
                        <span>
                            Subir archivos aqui
                        </span>
                    </label>
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        title="Seleccionar imagenes"
                        multiple
                        onChange={handleImagesChange}
                        className="hidden"
                    />
                </div>
                {editPet && imagePreviews.length !== 0 &&
                    < button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
                        onClick={(e) => {
                            e.preventDefault();
                            setImagePreviews(imgSaved);
                            setImages(imgSaved);
                        }}
                    >
                        <RefreshCcw size={20} className="mr-2 inline" />
                        <span>
                            Restaurar Imagenes
                        </span>
                    </button>
                }
                <div className="image-preview flex gap-1 h-fit mb-2">
                    {
                        imagePreviews.map((image, index) => (
                            <ImagePreview
                                key={index}
                                image={image}
                                index={index}
                                handleDelete={(index) => {
                                    const newImages = [...images];
                                    newImages.splice(index, 1);
                                    setImages(newImages);
                                    const newImagePreviews = [...imagePreviews];
                                    newImagePreviews.splice(index, 1);
                                    setImagePreviews(newImagePreviews);
                                }}
                            />
                        ))
                    }
                </div>
                <button
                    id="submitButton"
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out transform hover:scale-105"
                >
                    {editPet ? "Guardar Mascota" : "Crear Mascota"}
                </button>
            </form>
        </div>
    );
}

//this will be used to create a pet
async function submitCreatePet(pet, session) {
    return new Promise(async (resolve, reject) => {
        const toastId = toast.loading("Creando mascota...");
        try {
            const response = await Pet.createPet(pet, { token: session.jwtApiToken, role: session.user.role });
            if (response) {
                toast.success("Mascota creada exitosamente", { id: toastId });
                resolve(response);
            } else {
                throw new Error("Failed to create pet");
            }
        } catch (error) {
            toast.error("Error al crear mascota", { id: toastId });
            document.getElementById("submitButton").disabled = false;
            reject(error);
        }
    });
}

//this will be used to edit a pet
async function submitEditPet(pet, session) {
    return new Promise(async (resolve, reject) => {
        const toastId = toast.loading("Guardando mascota...");
        try {
            const response = await Pet.updatePet(pet._id, pet, { token: session.jwtApiToken, role: session.user.role });
            if (response) {
                toast.success("Mascota editada exitosamente", { id: toastId });
                resolve(response);
            } else {
                throw new Error("Failed to edit pet");
            }
        } catch (error) {
            toast.error("Error al editar mascota", { id: toastId });
            document.getElementById("submitButton").disabled = false;
            reject(error);
        }
    });
}

//this will be a component that will allow the user preview the image and delete it if doesn't like it
function ImagePreview({ image, index, handleDelete }) {
    return (
        <div className="w-24 md:w-36 overflow-hidden relative">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleDelete(index)
                }}
                className="bg-red-500 text-white p-1 rounded-sm absolute top-0 right-0 z-10
                transition duration-150 ease-in-out transform hover:shadow-md active:translate-x-1 active:shadow-lg hover:bg-red-600"
            >
                < X size={20} aria-label="Eliminar" />
                <span className="sr-only">Eliminar</span>
            </button>
            <Image src={image} alt={`Preview ${index}`} className="thumbnail rounded-sm" width={200} height={200} />
        </div >
    );
}

//this will be a function to check if a user is not uploading the same image twice
function wasImageAlreadyUploaded(images, image) {
    return images.some(img => img === image);
}