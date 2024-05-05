"use client";
//import { pets } from "../../utils/petListTest";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setPets,
    setPetsLoading,
    setPetsError,
} from "../../app/store/reducers/petsSlice";
import PetViewer from "@/components/PetViewer/page";

const URLPETS = "http://localhost:4000/pets";

export default function MyPets() {
    const dispatch = useDispatch();
    const petsSelector = useSelector((state) => state.pets);
    // Obtener el índice inicial y final de los elementos a mostrar en la página actual
    useEffect(() => {
        dispatch(setPetsLoading());
        fetch(URLPETS)
            .then((response) => response.json())
            .then((data) => {
                dispatch(setPets(data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(setPetsError());
            });
    }, [dispatch]);

    return (
        <PetViewer petList={petsSelector.pets} admitNewPet={true} />
    );
}