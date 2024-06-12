export default function PetSkeleton() {
    return (
        <div className="group relative animate-pulse">
            <div className="min-h-5 aspect-video overflow-hidden min-w-72 md:min-w-0 md:w-full rounded-md bg-gray-200 lg:aspect-none group-hover:scale-105 transition-all lg:h-52 shadow-sm">
                <div className="w-full h-full bg-gray-300"></div>
            </div>
        </div>
    );
}
