import { useState } from "react";

function StudentTaskSubmission({ task, onFileSubmit }) {
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {

            const fakeFileUrl = URL.createObjectURL(file);
            onFileSubmit(task.id, {
                filename: file.name,
                url: fakeFileUrl,
            });
        }
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            {task.submission ? (
                <p>Файл прикреплён: <a href={task.submission.url} target="_blank">{task.submission.filename}</a></p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleChange} accept=".pdf,.docx,.zip" />
                    <button type="submit">Сдать задание</button>
                </form>
            )}
        </div>
    );
}

export default StudentTaskSubmission;
