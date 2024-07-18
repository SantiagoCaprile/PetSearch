//tags component
import React, { useState, useEffect } from "react";
import Tag from "@classes/Tag";
import { useSession } from "next-auth/react";
import QRCode from 'qrcode';
import { Circle, QrCode, RefreshCcw } from "lucide-react";
import JSZip from "jszip";
import toast from "react-hot-toast";

//this component will show an indicator of -> active tags/tags number
//also will have a button to create a new tag
//also will have a button to generate the qr code for the tag to be printed
//the qr code will be generated with the following url: https://www.petsearch.com.ar/tag/{tagId}

export default function AdminTagsComponent() {
    const { data: session } = useSession();
    const [tags, setTags] = useState({ registered: 0, unregistered: 0, length: 0, tags: [] });
    const [qrCode, setQrCode] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const data = await Tag.getTagsList();
            setTags(data);
        };
        fetchTags();
    }, []);


    const handleCreateTag = async () => {
        const data = await Tag.createTag(session.accessToken, session.role);
        if (data.error) {
            console.error(data.error);
            return;
        }
        const qrCode = await QRCode.toDataURL(`https://www.petsearch.com.ar/tag/${data.tagId}`);
        setQrCode(qrCode);
    }

    //this function will get the selected tags and download a zip file with the qr codes of the selected tags
    const handleGetBatchOfQR = async () => {
        if (selectedTags.length === 0) {
            return;
        }
        const qrCodes = [];
        for (const tagId of selectedTags) {
            const qrCode = await QRCode.toDataURL(`https://www.petseearch.com.ar/tag/${tagId}`);
            qrCodes.push(qrCode);
        }

        //create a zip file with the qr codes
        const zip = new JSZip();
        for (let i = 0; i < qrCodes.length; i++) {
            const base64Data = qrCodes[i].split(',')[1];
            zip.file(`qr_code_${selectedTags[i]}.png`, base64Data, { base64: true });
        }
        zip.generateAsync({ type: "blob" })
            .then((content) => {
                //downloads de zip file
                const url = window.URL.createObjectURL(content);
                const a = document.createElement("a");
                a.href = url;
                a.download = "qr_codes.zip";
                a.click();
            });
    }

    const triggerRefetch = () => {
        const toastid = toast.loading("Refetching tags...");
        const fetchTags = async () => {
            const data = await Tag.getTagsList();
            setTags(data);
            toast.success("Tags refetched!");
        };
        fetchTags().then(() => {
            toast.dismiss(toastid);
        });
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold">Tags</h2>
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Active Tags</h3>
                    <p>{tags.registered}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Inactive Tags</h3>
                    <p>{tags.unregistered}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Total Tags</h3>
                    <p>{tags.length}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="bg-blue-400 text-white font-semibold rounded-md p-2 hover:bg-slate-600 transition-all duration-200"
                        onClick={handleCreateTag}
                    >
                        Create Tag and generate QR Code
                    </button>

                    <button className="text-center bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-slate-600 transition-all duration-200"
                        onClick={triggerRefetch}
                    >
                        Refrescar
                        <RefreshCcw size={24} className="inline ml-2" />
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">QR Code</h3>
                    <img src={qrCode} />
                </div>
            </div>
            <table className="table-auto text-center w-1/2">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Num</th>
                        <th className="px-4 py-2">Tag ID</th>
                        <th className="px-4 py-2">Registered</th>
                        <th className="px-4 py-2">QR Code</th>
                        <th className="px-4 py-2">Select</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.tags.map((tag, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{index}</td>
                            <td className="border px-4 py-2">{tag._id}</td>
                            <td className="border px-4 py-2">{tag.user ?
                                <div className="flex gap-2 justify-center"><Circle size={24} color="green" fill="green" className="animate-pulse" /> Yes</div> :
                                <div className="flex gap-2 justify-center"><Circle size={24} color="red" /> No</div>
                            }</td>
                            <td className="border px-4 py-2">
                                <button className="bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-slate-600 transition-all duration-200"
                                    onClick={async () => {
                                        const qrCode = await QRCode.toDataURL(`https://www.petsearch.com.ar/tag/${tag._id}`);
                                        setQrCode(qrCode);
                                    }}
                                >
                                    <QrCode size={24} />
                                </button>
                            </td>
                            <td className="border px-4 py-2">
                                <input type="checkbox" name="selectedTags" className="size-6" value={tag._id}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedTags([...selectedTags, tag._id]);
                                        } else {
                                            setSelectedTags(selectedTags.filter((id) => id !== tag._id));
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-slate-600 transition-all duration-200"
                onClick={handleGetBatchOfQR}
            >
                Generate PDF with the QR of the selected tags
            </button>
        </div>
    );
}
