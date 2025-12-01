interface ThumbnailUploaderProps {
    thumbnail: File | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileDelete: () => void;
}


import { CloudArrowUpIcon } from "@heroicons/react/20/solid"

const ThumbnailUploader = ({ thumbnail, handleFileChange, handleFileDelete }: ThumbnailUploaderProps) => {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Thumbnail Image
            </label>
            {/* Start: Upload Section */}
            <div className="relative">
                {thumbnail ? (
                    // Start: Preview Thumbnail
                    <div className="flex flex-col items-center justify-center w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <img
                            src={typeof thumbnail === "string" ? thumbnail : URL.createObjectURL(thumbnail)}
                            alt="Thumbnail Preview"
                            className="object-contain max-h-48 rounded mb-3"
                        />
                        {/* Start: Thumbnail Button Row */}
                        <div className="flex gap-2">
                            <label htmlFor="thumbnail" className="inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold cursor-pointer hover:bg-cyan-600 transition-all">
                                Ganti Gambar
                                <input
                                    type="file"
                                    id="thumbnail"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={handleFileDelete}
                                className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
                            >
                                Hapus
                            </button>
                        </div>
                        {/* End: Thumbnail Button Row */}
                    </div>
                    // End: Preview Thumbnail
                ) : (
                    // Start: No Thumbnail Uploaded
                    <>
                        <input
                            type="file"
                            id="thumbnail"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="thumbnail"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-all"
                        >
                            <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-3" />
                            <p className="text-sm font-medium text-gray-600">
                                Click to upload thumbnail
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, GIF up to 5MB
                            </p>
                        </label>
                    </>
                    // End: No Thumbnail Uploaded
                )}
            </div>
            {/* End: Upload Section */}
        </div>
    )
}

export default ThumbnailUploader