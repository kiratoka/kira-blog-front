interface ContentInputProps {
    content: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentInput = ({ content, handleInputChange }: ContentInputProps) => {
    return (
        <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Content
            </label>
            <textarea
                id="content"
                name="content"
                value={content}
                onChange={handleInputChange}
                rows={10}
                placeholder="Write your content here..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
                {content.length} characters
            </p>
        </div>
    )
}

export default ContentInput