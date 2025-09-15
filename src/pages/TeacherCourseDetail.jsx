import { useParams } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useState } from "react";

export default function TeacherCourseDetail() {
    const { id } = useParams();
    const { courses, setCourses } = useCourses();
    const course = courses.find(c => c.id === id);

    if (!course) return <p>Курс не найден</p>;

    const { total, attended } = course.attendance || {};
    const attendancePercent =
        total > 0 ? ((attended / total) * 100).toFixed(1) : null;

    const handleGradeChange = (taskId, grade) => {
        const updatedCourses = courses.map(c => {
            if (c.id !== id) return c;
            return {
                ...c,
                tasks: c.tasks.map(t =>
                    t.id === taskId ? { ...t, grade: grade } : t
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

            <h3>Задания студентов:</h3>
            <ul>
                {course.tasks.map(task => (
                    <li key={task.id} style={{ marginBottom: "1rem" }}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>

                        {task.submission ? (
                            <p>
                                Сданный файл:{" "}
                                <a href={task.submission.url} target="_blank" rel="noreferrer">
                                    {task.submission.filename}
                                </a>
                            </p>
                        ) : (
                            <p>Студент ещё не прикрепил файл</p>
                        )}

                        <div>
                            <label>
                                Оценка:{" "}
                                <input
                                    type="number"
                                    value={task.grade ?? ""}
                                    onChange={(e) =>
                                        handleGradeChange(task.id, Number(e.target.value))
                                    }
                                    min="0"
                                    max="10"
                                />
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
