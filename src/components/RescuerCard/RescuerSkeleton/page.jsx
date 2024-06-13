import React from 'react';

export default function RescuerCardSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-200 rounded-lg shadow-lg p-4 m-4 w-[300px] animate-pulse">
            <div className="rounded-full h-24 w-24 bg-gray-300"></div>
            <h2 className="text-xl font-bold mt-4 bg-gray-300 h-6 w-40"></h2>
            <p className="text-gray-500 text-sm bg-gray-300 h-4 w-24 mt-2"></p>
            <p className="text-gray-500 text-sm bg-gray-300 h-4 w-24 mt-2"></p>
        </div>
    );
}