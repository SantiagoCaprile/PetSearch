'use client';
import React from "react";
import User from "@/classes/User";
import ConfirmButton from "@/components/ConfirmButton/page";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

//this page component is used to manage users

const roles = ["admin", "user", "rescuer"];

export default function AdminUsersPage() {
    const { data: session } = useSession();
    const [usersOriginal, setUsersOriginal] = useState([]);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [editRole, setEditRole] = useState({
        edit: false,
        id: "",
    });
    useEffect(() => {
        if (!session) return;
        User.adminGetAllUsers(session.jwtApiToken, session.user.role).then((users) => {
            setUsersOriginal(users);
            setUsers(users);
        });
    }, [session]);

    const handleSearchChange = (e) => {
        if (e.target.value === "") {
            setUsers(usersOriginal);
        }
        setSearch(e.target.value);
    };

    const handleSubmitSearch = (e) => {
        if (e.key === "Enter") {
            setUsers(
                usersOriginal.filter((user) =>
                    user.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <div className="flex gap-2 py-2">
                <input
                    type="text"
                    placeholder="Search Users"
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={handleSubmitSearch}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <select className="w-1/4 p-2 border border-gray-300 rounded-md"
                    onChange={(e) => {
                        if (e.target.value === "") {
                            setUsers(usersOriginal);
                        } else {
                            setUsers(
                                usersOriginal.filter((user) => user.role === e.target.value)
                            );
                        }
                    }}
                >
                    <option value="">All Roles</option>
                    {roles.map((role, index) => (
                        <option key={index} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-4">
                {users &&
                    users.map((user, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-2 border border-gray-300 rounded-md"
                        >
                            <div className="flex w-2/3 justify-between">
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </div>
                            {
                                <p className={
                                    user.role === "rescuer" ? "cursor-not-allowed" : "cursor-pointer"
                                } onClick={() => {
                                    if (user.role === "rescuer") return;
                                    setEditRole({
                                        edit: true,
                                        id: user._id,
                                    });
                                }}>
                                    {editRole.edit && editRole.id === user._id ?
                                        <select
                                            value={user.role}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                // User.updateUserRole(user.id, e.target.value).then(() => {
                                                //     User.adminGetAllUsers(session.jwtApiToken).then((users) => {
                                                //         setUsersOriginal(users);
                                                //         setUsers(users);
                                                //     });
                                                // });
                                            }}
                                        >
                                            {roles.map((role, index) => (
                                                <option key={index} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                        : user.role
                                    }
                                </p>
                            }
                            <div className="min-w-[300px]">
                                <ConfirmButton
                                    text="Delete"
                                    onConfirm={() => {
                                        User.deleteUser(user.id).then(() => {
                                            User.getUsers().then((users) => {
                                                setUsers(users);
                                            });
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}