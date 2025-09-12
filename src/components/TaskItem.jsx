import StudentTaskSubmission from "./StudentTaskSubmission";

export default function TaskItem({ task, onFileSubmit }) {
    return (
        <li key={task.id}>
            <StudentTaskSubmission
                task={task}
                onFileSubmit={onFileSubmit}
                canSubmit={task.canSubmit}
            />
        </li>
    );
}
