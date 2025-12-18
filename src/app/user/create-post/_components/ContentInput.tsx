import { MarkdownEditor } from "@/components/MarkdownEditor"

interface ContentInputProps {
    content: string
    onChange: (value: string) => void
}

const ContentInput = ({ content, onChange }: ContentInputProps) => {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
                Content
            </label>
            <MarkdownEditor
                value={content}
                onChange={onChange}
            />
            <p className="text-sm text-gray-500 mt-2">
                {content.length} characters
            </p>
        </div>
    )
}

export default ContentInput