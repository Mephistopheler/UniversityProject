import { useParams } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useEffect } from "react";
import TaskItem from "../components/TaskItem.jsx";

export default function CourseDetail() {
    const { id } = useParams();
    const { courses, setCourses } = useCourses();

    useEffect(() => {
        const stored = localStorage.getItem('courses');
        if (stored) {
            let parsed = JSON.parse(stored);

            parsed = parsed.map(course => ({
                ...course,
                tasks: course.tasks.map(task => ({
                    ...task,
                    canSubmit: task.canSubmit === true
                }))
            }));

            setCourses(parsed);
        }
    }, [setCourses]);


    const course = courses.find(c => c.id === id);

    if (!course) return <p>Курс не найден</p>;

    const gradedTasks = course.tasks?.filter(task => typeof task.grade === 'number') || [];

    const average = gradedTasks.length > 0
        ? (gradedTasks.reduce((sum, t) => sum + t.grade, 0) / gradedTasks.length).toFixed(1)
        : null;

    const { total, attended } = course.attendance || {};
    const attendancePercent =
        total > 0 ? ((attended / total) * 100).toFixed(1) : null;

    const handleFileSubmit = (taskId, fileData) => {
        const updatedCourses = courses.map(c => {
            if (c.id !== id) return c;
            return {
                ...c,
                tasks: c.tasks.map(t =>
                    t.id === taskId ? { ...t, submission: fileData } : t
                )
            };
        });

        setCourses(updatedCourses);
        localStorage.setItem("courses", JSON.stringify(updatedCourses));
    };

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>

            {attendancePercent && (
                <p><strong>Посещаемость:</strong> {attended} из {total} занятий ({attendancePercent}%)</p>
            )}

            <h3>Задания и оценки:</h3>
            <ul>
                {(course.tasks || []).map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onFileSubmit={handleFileSubmit}
                    />
                ))}
            </ul>

            {average && (
                <p><strong>Средняя оценка:</strong> {average}</p>
            )}
        </div>
    );
}
