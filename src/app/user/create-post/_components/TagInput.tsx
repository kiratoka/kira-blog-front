
import { Tag } from "@/lib/types/modelTypes";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { TagIcon } from "lucide-react";



interface TagInputProps {
    tags: Tag[];
    tagInput: string;
    handleTagInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddTag: () => void;
    handleDeleteTag: (tagId: string) => void;
}

const TagInput = ({ tags, tagInput, handleTagInput, handleAddTag, handleDeleteTag }: TagInputProps) => {
    return (
        <div>
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                <TagIcon className="w-4 h-4 inline mr-1" />
                Tags
            </label>
            {/* Start: Tags Field Section */}
            <div className="space-y-3">
                {/* Start: Tag Input Row */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        id="tags"
                        value={tagInput}
                        onChange={handleTagInput}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTag();
                            }
                        }}
                        name="tags"
                        placeholder="Add a tag and press Enter..."
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all"
                    >
                        Add
                    </button>
                </div>
                {/* End: Tag Input Row */}

                {/* Start: Tag List */}
                <div className="flex flex-wrap gap-2">
                    {tags && tags.map((tag) =>
                        <span key={tag.id} className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full border-2 border-cyan-200 font-medium">
                            <TagIcon className="w-4 h-4" />
                            {tag.name}
                            <button
                                type="button"
                                onClick={() => handleDeleteTag(tag.id)}
                                className="hover:bg-cyan-200 rounded-full p-1 transition-colors"
                            >
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </span>
                    )}
                </div>
                {/* End: Tag List */}

                {/* Start: Tag Helper Text */}
                <p className="text-sm text-gray-500">
                    Add tags to help people discover your post
                </p>
                {/* End: Tag Helper Text */}
            </div>
            {/* End: Tags Field Section */}
        </div>
    )
}

export default TagInput