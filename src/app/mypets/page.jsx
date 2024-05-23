"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setMyPets,
    setMyPetsLoading,
    setMyPetsError,
} from "../../app/store/reducers/mypetsSlice";
import PetViewer from "@/components/PetViewer/page";
import { useSession } from "next-auth/react";
import Pet from "@/classes/Pet";

export default function MyPets() {
    const dispatch = useDispatch();
    const mypetsSelector = useSelector((state) => state.mypets)
    // Obtener el índice inicial y final de los elementos a mostrar en la página actual
    const { data: session } = useSession();
    useEffect(() => {
        if (!session) return;
        dispatch(setMyPetsLoading());
        Pet.getRescuersPets(session?.user._id)
            .then((data) => {
                dispatch(setMyPets(data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(setMyPetsError());
            });
    }, [dispatch, session?.user._id]);
    return (
        <PetViewer petList={mypetsSelector?.mypets} admitNewPet={true} loading={mypetsSelector.loading} />
    );
}