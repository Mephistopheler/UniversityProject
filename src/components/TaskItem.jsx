import StudentTaskSubmission from "./StudentTaskSubmission";

export default function TaskItem({ task, onFileSubmit }) {
    return (
        <li key={task.id} style={{ marginBottom: "1rem" }}>
            <div>
                <strong>{task.title}</strong> — {task.grade !== undefined ? `${task.grade} баллов` : "не проверено"}
            </div>

            {task.submission && (
                <div>
                    <em>
                        Файл:{" "}
                        <a href={task.submission.url} download={task.submission.filename}>
                            {task.submission.filename}
                        </a>
                    </em>
                </div>
            )}

            {task.canSubmit === true ? (
                <StudentTaskSubmission task={task} onFileSubmit={onFileSubmit} />
            ) : (
                <p style={{ fontStyle: "italic", color: "#999" }}>
                    Прикрепление файла недоступно для этого задания
                </p>
            )}
        </li>
    );
}
