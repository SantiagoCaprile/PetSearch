import { Search } from "lucide-react";

export default function RescuersFilters() {

    return (
        <div className="flex flex-col justify-between items-center py-3 md:flex-row gap-2">
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
            <button className="bg-green-500 rounded-xl px-4 py-2 text-white w-1/3 flex items-center justify-center md:w-fit gap-1 hover:bg-green-600">
                <Search color="white" />
                <span className="hidden md:block">Buscar</span>
            </button>
        </div>
    );
}

const styles = {
    input: "md:w-2/5 border-black border-b-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline w-full",
}