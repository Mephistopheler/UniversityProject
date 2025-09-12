import { useState } from "react";
import "../styles/StudentTaskSubmission.css";

function StudentTaskSubmission({ task, onFileSubmit, canSubmit = true }) {
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
        <div className="student-task-submission">
            <h4>{task.title} — {task.grade !== undefined ? `${task.grade} баллов` : "не проверено"}</h4>
            <p>{task.description}</p>

            {task.submission && (
                <p>
                    Файл прикреплён: <a href={task.submission.url} target="_blank">{task.submission.filename}</a>
                </p>
            )}

            {canSubmit && !task.submission && (
                <form onSubmit={handleSubmit} className="task-form">
                    <input type="file" onChange={handleChange} accept=".pdf,.docx,.zip" />
                    <button type="submit">Сдать задание</button>
                </form>
            )}

            {!canSubmit && (
                <p>
                    Прикрепление файла недоступно для этого задания
                </p>
            )}
        </div>
    );
}

export default StudentTaskSubmission;
