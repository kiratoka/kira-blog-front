import { EyeSlashIcon, GlobeAltIcon } from "@heroicons/react/20/solid";

interface PublishToggleProps {
    isPublished: boolean;
    handlePublished: () => void;
}



const PublishToggle = ({ isPublished, handlePublished }: PublishToggleProps) => {
    return (
        <div className="bg-cyan-50 rounded-lg p-6 border-2 border-cyan-200">
            <div className="flex items-center justify-between">
                {/* Start: Publish Label & State */}
                <div className="flex items-center gap-3">
                    {isPublished ? (
                        <GlobeAltIcon className="w-6 h-6 text-cyan-600" />
                    ) : (
                        <EyeSlashIcon className="w-6 h-6 text-gray-500" />
                    )}
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {isPublished ? 'Public Post' : 'Draft Post'}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {isPublished
                                ? 'This post will be visible to everyone'
                                : 'Save as draft, publish later'}
                        </p>
                    </div>
                </div>
                {/* End: Publish Label & State */}
                {/* Start: Publish Toggle Button */}
                <button
                    type="button"
                    onClick={handlePublished}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${isPublished ? 'bg-cyan-600' : 'bg-gray-300'
                        }`}
                >
                    <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isPublished ? 'translate-x-9' : 'translate-x-1'
                            }`}
                    />
                </button>
                {/* End: Publish Toggle Button */}
            </div>
        </div>
    )
}

export default PublishToggle