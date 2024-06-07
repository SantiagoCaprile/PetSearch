"use client"
import Image from "next/image";
import rescuerImage from "@public/images/rescuerProfile.svg";
import { useEffect, useState } from "react";
import Rescuer from "@/classes/Rescuer";
import { useSession } from "next-auth/react";
import { Edit, Save, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { convertImageToBase64 } from "@/utils/imgFunctions";
import { toast } from "react-hot-toast"

export default function RescuerPublicProfile({ params }) {
    const { data: session } = useSession();
    const { id } = params;
    const [rescuer, setRescuer] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState(null)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        Rescuer.getRescuerById(id)
            .then((res) => {
                setRescuer(res.rescuer);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    async function handleImageChange(e) {
        const files = Array.from(e.target.files);
        const imagePreview = files.map(file => URL.createObjectURL(file));
        setProfilePic(imagePreview[0])
        const base64 = await convertImageToBase64(files[0]);
        setValue("profilePic", base64);
    }

    async function onSubmit(data) {
        const toastId = toast.loading("Guardando cambios...");
        data = {
            socialMediasLinks: {
                instagram: data.instagram,
                facebook: data.facebook
            },
            ...data
        }
        document.getElementById("saveButton").disabled = true;
        const response = await Rescuer.updateRescuer(id, data);
        if (response) {
            const updatedRescuer = await Rescuer.getRescuerById(id)
            setRescuer(updatedRescuer.rescuer);
            setEditMode(false);
            toast.success("Cambios guardados", { id: toastId });
        } else {
            toast.error("Error al guardar los cambios", { id: toastId });
        }
        document.getElementById("saveButton").disabled = false;
    }

    if (!rescuer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="md:w-3/5 md:m-auto p-4 md:p-8 bg-white shadow-md rounded-md">
            <div className="flex flex-col lg:flex-row pb-2 items-center justify-center md:justify-evenly">
                {session &&
                    session.user._id == rescuer.user?._id &&
                    (!editMode ?
                        <button className="w-fit md:self-start self-end" onClick={() => setEditMode(!editMode)}>
                            <Edit size={32} color="green" />
                        </button>
                        :
                        <div className="flex md:flex-col md:self-start self-end gap-2">
                            <button className="w-fit md:self-start self-end" onClick={handleSubmit(onSubmit)}>
                                <Save size={32} color="green" id="saveButton" />
                            </button>
                            <button className="w-fit md:self-start self-end" onClick={() => setEditMode(!editMode)}>
                                <XCircle size={32} color="red" />
                            </button>
                        </div>)
                }
                <div className="mb-6 flex justify-center p-4 h-[200px] w-[200px] bg-slate-200 rounded-md md:mb-6">
                    <div className="flex justify-center min-h-full min-w-full rounded-md mb-6">
                        {
                            !editMode ?
                                <Image
                                    src={rescuer?.user?.profilePic || rescuerImage}
                                    alt={"rescuer"}
                                    width={300}
                                    height={300}
                                    className="rounded-lg min-h-full"
                                    style={{ objectFit: "cover" }}
                                />
                                :
                                <label className="cursor-pointer">
                                    <input type="file" className="hidden"
                                        id="images"
                                        onChange={handleImageChange}
                                    />
                                    <Image
                                        src={profilePic || rescuerImage}
                                        alt={"rescuer"}
                                        width={300}
                                        height={300}
                                        className="rounded-lg min-h-full animate-pulse"
                                        style={{ objectFit: "cover" }}
                                    />
                                </label>
                        }
                    </div>
                </div>
                <div className="w-full md:w-1/2 mb-6 md:pl-6 flex flex-col">
                    <h1 className="text-3xl mb-2">{rescuer.user?.name}</h1>
                    <div className="mb-4 flex flex-col h-1/2 gap-y-2 justify-evenly">
                        <p className="text-gray-700 flex gap-2">
                            <strong>Email:</strong>
                            {
                                //maybe we shouldn't show the email in the profile
                                //but for now we will leave it
                                !editMode ?
                                    <a href={`mailto:${rescuer.user?.email}`} className="text-blue-500 underline">{rescuer.user?.email}</a>
                                    :
                                    <input type="email" defaultValue={rescuer.user?.email} className="border-b border-gray-400 w-full" />
                            }
                        </p>
                        <p className="text-gray-700 flex gap-2">
                            Instagram:
                            {
                                !editMode ?
                                    <span className="text-blue-500">{rescuer.socialMediasLinks?.instagram}</span>
                                    :
                                    <input type="text"
                                        defaultValue={rescuer.socialMediasLinks?.instagram}
                                        className="border-b border-gray-400 w-full"
                                        {...register("instagram")}
                                    />
                            }
                        </p>
                        <p className="text-gray-700 flex gap-2">
                            Facebook:
                            {
                                !editMode ?
                                    <span className="text-blue-500">{rescuer.socialMediasLinks?.facebook}</span>
                                    :
                                    <input type="text"
                                        defaultValue={rescuer.socialMediasLinks?.facebook}
                                        className="border-b border-gray-400 w-full"
                                        {...register("facebook")}
                                    />
                            }
                        </p>
                        <p className="text-gray-700 flex gap-2">
                            Ciudad:
                            {
                                !editMode ?
                                    <span>{rescuer.city}</span>
                                    :
                                    <input type="text"
                                        defaultValue={rescuer.city}
                                        className="border-b border-gray-400 w-full"
                                        {...register("city")}
                                    />
                            }
                        </p>
                        <p className="text-gray-700 flex gap-2">
                            Teléfono:
                            {
                                !editMode ?
                                    <span>{rescuer.contactPhone}</span>
                                    :
                                    <input type="text"
                                        defaultValue={rescuer.contactPhone}
                                        className="border-b border-gray-400 w-full"
                                        {...register("contactPhone")}
                                    />
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <div className="border-t border-black pt-2 items-center">
                    <h2 className="text-lg font-semibold mb-4">Biografía</h2>
                    <p className="text-gray-700 text-pretty">
                        {
                            !editMode ?
                                <span>{rescuer?.bio?.split("\n").map((line, index) => {
                                    return <span key={index}>{line}<br /></span>
                                })}</span>
                                : <textarea
                                    defaultValue={rescuer?.bio}
                                    className="border-b border-gray-400 w-full"
                                    maxLength={700}
                                    {...register("bio")}
                                />
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
