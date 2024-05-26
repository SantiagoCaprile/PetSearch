import Image from "next/image";
import Link from "next/link";

export default function RescuerCard({ rescuer }) {
    if (!rescuer) {
        return null;
    }

    return (
        <Link href={`/rescuers/${rescuer.user._id}`}>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4 m-4 w-[300px] hover:translate-y-1 transition-all cursor-pointer"
            >
                <Image
                    src={rescuer.image ? rescuer.image : "/images/rescuerProfile.svg"}
                    alt="rescuer"
                    loading="lazy"
                    className="rounded-full h-24 w-24"
                    width={150}
                    height={150}
                />
                <h2 className="text-xl font-bold mt-4">{rescuer.user.name}</h2>
                <p className="text-gray-500 text-sm">{rescuer.city}</p>
                <p className="text-gray-500 text-sm">{rescuer.contactPhone}</p>
            </div>
        </Link>
    );
}

