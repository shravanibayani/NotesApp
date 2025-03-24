const Note = ({ note, toggleImportance, deleteNote }) => {
    const label = note.important ? 'Make Not Important' : 'Make Important';

    return (
        <li className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md border border-gray-200 gap-x-4">
            <span className="text-gray-800">{note.content}</span>
            <div className="flex items-center space-x-2">
                <button
                    onClick={deleteNote}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 flex-shrink-0 w-20">
                    Delete
                </button>
                <button
                    onClick={toggleImportance}
                    className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 flex-shrink-0 w-32">
                    {label}
                </button>
            </div>
        </li>
    );
};

export default Note;
