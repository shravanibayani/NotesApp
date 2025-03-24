const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'Make Not Important' : 'Make Important';

    return (
        <li className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md border border-gray-200">
            <span className="text-gray-800">{note.content}</span>
            <button 
                onClick={toggleImportance} 
                className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
                {label}
            </button>
        </li>
    );
};

export default Note;