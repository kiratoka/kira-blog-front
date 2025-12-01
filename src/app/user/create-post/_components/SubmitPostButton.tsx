interface SubmitPostButtonProps {
    isPublished: boolean;
    handleSubmit: (e: React.FormEvent) => void;
}

const SubmitPostButton = ({ isPublished, handleSubmit }: SubmitPostButtonProps) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
                {isPublished ? 'Publish Post' : 'Save Draft'}
            </button>
        </div>
    )
}

export default SubmitPostButton