"use client";
import React from "react";
import { ChevronRight, Search } from "lucide-react";

export default function RescuersPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-md rounded px-8 pb-8 mb-4 max-w-[1000px] w-4/5">
        <h1 className="text-2xl font-bold mb-2">Rescatistas</h1>
        <div className="flex justify-between items-center py-3">
          <input
            type="text"
            placeholder="Buscar por nombre"
            name="Nombre"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Buscar por ciudad"
            name="Ciudad"
            className={styles.input}
          />
          <button className="bg-green-500 rounded-xl px-4 py-2 text-white">
            <Search color="white" />
          </button>
        </div>
        <table className="w-full text-m text-left text-gray-500 dark:text-gray-400">
          <thead className="text-m text-gray-700 p-1 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <th className={styles.th}>Organización</th>
            <th className={styles.th}>Ubicación</th>
            <th className={styles.th}>Contacto</th>
            <th className={styles.th}>Ver Perfil</th>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <tr className={styles.tr}>
              <td className={styles.td}>Pichichos rescuer</td>
              <td className={styles.td}>Park City</td>
              <td className={styles.td}>343-44098123</td>
              <td className={styles.td}>
                <button className={styles.button}>
                  <ChevronRight color="white" />
                </button>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Pichichos rescuer</td>
              <td className={styles.td}>Park City</td>
              <td className={styles.td}>343-44098123</td>
              <td className={styles.td}>
                <button className={styles.button}>
                  <ChevronRight color="white" />
                </button>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Pichichos rescuer</td>
              <td className={styles.td}>Park City</td>
              <td className={styles.td}>343-44098123</td>
              <td className={styles.td}>
                <button className={styles.button}>
                  <ChevronRight color="white" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  th: "py-3 px-5 uppercase",
  td: "w-4 p-4",
  tr: "hover:bg-gray-100",
  button: "flex justify-center w-1/2 bg-green-500 rounded-xl",
  input:
    "w-2/5 border-black border-b-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
};
