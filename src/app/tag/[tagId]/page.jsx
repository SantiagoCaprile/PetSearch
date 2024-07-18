"use client"
import { useEffect, useState } from "react";
import Tag from "@classes/Tag";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import Image from "next/image";
import { convertImageToBase64 } from "@utils/imgFunctions";
import { Pencil, Unlink } from "lucide-react";
import { formatDateToDDMMYYYY } from "@utils/dateFunctions";


export default function TagPage({ params }) {
    const [confirmNewTag, setConfirmNewTag] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const { tagId } = params;
    const [tagData, setTagData] = useState({});

    if (!tagId) {
        router.push("/not-found");
    }

    useEffect(() => {
        const fetchTag = async () => {
            const data = await Tag.getTagData(tagId);
            if (data.error) {
                console.error(data.error);
                return;
            }
            setTagData(data);
            console.log(data);
        };
        fetchTag();
    }, []);

    const triggerRefetch = () => {
        const fetchTag = async () => {
            const data = await Tag.getTagData(tagId);
            if (data.error) {
                console.error(data.error);
                return;
            }
            setTagData(data);
        };
        fetchTag();
    }

    return (
        <div className="m-auto">
            {(tagData && tagData.name || confirmNewTag)
                ? <TagComponent session={session} tagId={tagId} tagData={tagData} newTag={confirmNewTag} refetch={triggerRefetch} />
                : <div className="grid items-center justify-items-center gap-8">
                    <div className="font-semibold text-pretty text-center">
                        <p>Vamos!! Ya tenes tu tag!</p>
                        <br />
                        {
                            session && session.user &&
                            <div className="">
                                <p className="mb-8">¿Querés registrar tu tag como {session.user.name}?</p>
                                <button onClick={() => setConfirmNewTag(true)}
                                    className="bg-blue-500 text-white font-semibold rounded-md p-4 hover:bg-slate-600 transition-all duration-200"
                                >
                                    Si, registrar tag con mi cuenta
                                </button>
                            </div>
                        }
                        <br />
                        {session && session.user ? "¿O querés registrar tu tag con otra cuenta? Iniciá sesión para registrarlo y volvé a escanearlo" : "Iniciá sesión para registrarlo y volvé a escanearlo"}
                    </div>
                    <button onClick={() => router.push("/login")}
                        className="bg-blue-500 text-white font-semibold rounded-md p-4 hover:bg-slate-600 transition-all duration-200"
                    >
                        Iniciar sesión
                    </button>
                    <p className="font-semibold text-pretty text-center">
                        ¿No tenés cuenta?
                        <br />
                        Registrate
                    </p>
                    <button onClick={() => router.push("/register")}
                        className="bg-blue-700 text-white font-semibold rounded-md p-4 hover:bg-slate-600 transition-all duration-200"
                    >
                        Registrarse
                    </button>
                </div>
            }
        </div>
    );
}

function TagComponent({ tagId, session, tagData: tag, newTag, refetch }) {
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editMode, setEditMode] = useState(newTag);
    const router = useRouter();

    const onSubmit = async (data) => {
        const tagData = {
            ...data,
            _id: tagId,
            image: image || "",
        };
        const userId = session.user._id;
        const response = await Tag.linkUserToTag(session.jwtApiToken, session.user.role, tagData, userId);
        if (response.error) {
            console.error(response.error);
            return;
        }
        refetch();
        setEditMode(false);
    }

    async function handleImageChange(e) {
        if (!e.target.files[0]) return;
        const file = e.target.files[0];
        const imagePreview = URL.createObjectURL(file);
        setPreview(imagePreview);
        const base64 = await convertImageToBase64(file);
        setImage(base64);
    }

    async function handleUnlink() {
        const response = await Tag.unlinkUserToTag(session.jwtApiToken, session.user.role, tag._id, session.user._id);
        if (response.error) {
            console.error(response.error);
            return;
        }
        window.location.reload();
    }

    return (
        <div className="flex flex-col items-center gap-2 pb-2">
            <form className="grid grid-cols-2 md:grid-cols-2 gap-y-4 gap-x-2 px-2 items-center p-2">
                <label htmlFor="image" className="text-white font-semibold">
                    <div className="w-[150px] h-[150px] bg-slate-500 rounded-md flex justify-center items-center cursor-pointer">
                        {
                            preview ? <Image
                                src={preview || ""}
                                alt={"pet image"}
                                width={200}
                                height={200}
                                className="rounded-lg aspect-square "
                                style={{ objectFit: "cover" }}
                            />
                                :
                                <Upload size={48} />
                        }
                    </div>
                    <input type="file" id="image" className="hidden" {...register("image")} accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                {
                    editMode ?
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold">
                                Nombre
                            </label>
                            <input type="text" {...register("name")}
                                className="rounded-md p-2"
                                defaultValue={tag.name}
                            />
                        </div>
                        :
                        <h2 className="font-bold text-xl">{tag.name}</h2>
                }
                <label htmlFor="specie" className="font-semibold">
                    Especie
                </label>
                {
                    editMode ?
                        <select {...register("specie")}
                            className="rounded-md p-2"
                            defaultValue={tag.specie}
                        >
                            <option value="cat">Gato</option>
                            <option value="dog">Perro</option>
                        </select>
                        :
                        <p>{tag.specie === 'dog' ? "Perro" : "Gato"}</p>
                }
                <label htmlFor="weight" className="font-semibold">
                    Peso (en kg)
                </label>
                {
                    editMode ?
                        <input type="number" {...register("weight")}
                            className="rounded-md p-2"
                            min={0}
                            defaultValue={tag.weight}
                        />
                        :
                        <p>{tag.weight ? tag.weight + " kg" : "No registrado"}</p>
                }
                <label htmlFor="breed" className="font-semibold">
                    Raza
                </label>
                {
                    editMode ?
                        <input type="text" {...register("breed")}
                            className="rounded-md p-2"
                            defaultValue={tag.breed}
                        />
                        :
                        <p>{tag.breed}</p>
                }
                <label htmlFor="birthdate" className="font-semibold">
                    Fecha de nacimiento
                </label>
                {
                    editMode ?
                        <input
                            type="date"
                            {...register("birthDate")}
                            defaultValue={tag.birthDate && new Date(new Date(tag.birthDate).getTime() + new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]}
                            max={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]}
                            className="rounded-md p-2"
                        />
                        :
                        <p>{formatDateToDDMMYYYY(new Date(new Date(tag.birthDate).getTime() + new Date().getTimezoneOffset() * 60000))}</p>
                }
                <label htmlFor="sterilized" className="font-semibold">
                    Esterilizado
                </label>
                {
                    editMode ?
                        <input type="checkbox" {...register("sterilized")}
                            className="size-6 rounded-md p-2"
                            defaultChecked={tag.sterilized}
                        />
                        :
                        <p>{tag.sterilized ? "Si" : "No"}</p>
                }
                <label className="font-semibold">
                    Responsable
                </label>
                <p>{tag.user.name}</p>
                <label htmlFor="ownerPhone" className="font-semibold">
                    Teléfono
                </label>
                {
                    editMode ?
                        <input type="text" {...register("ownerPhone")}
                            className="rounded-md p-2"
                            defaultValue={tag.ownerPhone}
                        />
                        :
                        <p>{tag.ownerPhone}</p>
                }
                <label htmlFor="address" className="font-semibold">
                    Dirección
                </label>
                {
                    editMode ?
                        <input type="text" {...register("address")}
                            className="rounded-md p-2"
                            defaultValue={tag.address}
                        />
                        :
                        <p>{tag.address}</p>
                }

                <label htmlFor="description" className="font-semibold">
                    Descripción
                </label>
                {
                    editMode ?
                        <textarea {...register("description")} maxLength={1000}
                            className="col-span-2 row-span-4 h-24 resize-none rounded-md p-2"
                            defaultValue={tag.description}
                        />
                        :
                        <p className="col-span-2 row-span-4">{tag.description}</p>
                }
            </form>
            {
                editMode &&
                <button
                    className="bg-green-500 text-white font-semibold rounded-md p-4 hover:bg-slate-600 transition-all duration-200
                active:bg-slate-700"
                    onClick={handleSubmit(onSubmit)}
                >
                    Guardar tag
                </button>
            }
            <button
                className="bg-blue-500 text-white font-semibold rounded-full p-4 hover:bg-slate-600 transition-all duration-200"
                onClick={() => setEditMode(!editMode)}
                aria-label={editMode ? "Cancelar edición" : "Editar tag"}
            >
                <Pencil className="inline-block" size={24} />
            </button>
            {
                tag.user &&
                <button
                    className="bg-red-500 text-white font-semibold rounded-full p-4 hover:bg-slate-600 transition-all duration-200"
                    onClick={handleUnlink}
                    aria-label="Desvincular tag"
                >
                    <Unlink className="inline-block" size={24} />
                </button>
            }
        </div>
    );
}
