"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import User from "@/classes/User";
import userImage from "@public/images/userProfile.svg";
import { useSession } from "next-auth/react";
import { Edit, Save, XCircle } from "lucide-react";

export default function UserPublicProfile({ params }) {
    const { data: session } = useSession();
    const { id } = params;
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState(null)

    useEffect(() => {
        const token = session ? session.jwtApiToken : null;
        User.getUserById(id, token)
            .then((res) => {
                setUser(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    async function handleImageChange(e) {
        const files = Array.from(e.target.files);
        const imagePreview = files.map(file => URL.createObjectURL(file));
        setProfilePic(imagePreview[0])
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="md:w-3/5 md:m-auto p-4 md:p-8 bg-white shadow-md rounded-md">
            <div className="flex flex-col lg:flex-row pb-2 items-center justify-center md:justify-evenly">
                {session &&
                    session.user.role === 'user' &&
                    session.user._id == user?._id &&
                    (!editMode ?
                        <button className="w-fit md:self-start self-end" onClick={() => setEditMode(!editMode)}>
                            <Edit size={32} color="green" />
                        </button>
                        :
                        <div className="flex md:flex-col md:self-start self-end gap-2">
                            <button className="w-fit md:self-start self-end" onClick={() => console.log("Guardar Info")}>
                                <Save size={32} color="green" />
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
                                    src={userImage}
                                    alt={"user"}
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
                                        src={profilePic || userImage}
                                        alt={"user"}
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
                    <h1 className="text-3xl mb-2">{user?.name}</h1>
                    <div className="mb-4 flex flex-col h-1/2 gap-y-2 justify-evenly">
                        <p className="text-gray-700 flex gap-2">
                            <strong>Email:</strong>
                            {
                                !editMode ?
                                    <a href={`mailto:${user?.email}`} className="text-blue-500 underline">{user?.email}</a>
                                    :
                                    <input type="email" defaultValue={user?.email} className="border-b border-gray-400 w-full" />
                            }
                        </p>
                        <p className="text-gray-700 flex gap-2">
                            {
                                user.phone || editMode && (
                                    <strong>Teléfono:</strong>
                                )
                            }
                            {
                                !editMode ?
                                    <span>{user.phone}</span>
                                    :
                                    <input type="text" defaultValue={user.contactPhone} className="border-b border-gray-400 w-full" />
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <div className="border-t border-black pt-2 items-center">
                    {user.phone || editMode && (
                        <h2 className="text-lg font-semibold mb-4">Sobre Mi</h2>
                    )}
                    <p className="text-gray-700 text-pretty">
                        {
                            !editMode ?
                                user?.bio
                                : <textarea defaultValue={user?.bio} className="border-b border-gray-400 w-full" maxLength={700} />
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
