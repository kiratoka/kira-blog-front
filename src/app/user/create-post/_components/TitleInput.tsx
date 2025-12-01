interface TitleInputProps {
    title: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TitleInput = ({ title, handleInputChange }: TitleInputProps) => {
    return (
        <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Post Title
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleInputChange}
                placeholder="Enter an engaging title..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
            />
        </div>
    )
}

export default TitleInput