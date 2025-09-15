import { useCourses } from "../context/CourseContext.jsx";
import { Link } from "react-router-dom";

export default function TeacherCourses() {
    const { courses } = useCourses();

    // Получаем текущего пользователя из localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Фильтруем курсы, назначенные этому преподавателю
    const teacherCourses = courses.filter(course =>
        currentUser?.courses?.includes(course.id)
    );

    return (
        <div>
            <h3>Мои курсы</h3>
            {teacherCourses.length === 0 ? (
                <p>Нет назначенных курсов.</p>
            ) : (
                <ul>
                    {teacherCourses.map(course => (
                        <li key={course.id}>
                            <Link to={`/teacher/courses/${course.id}`}>{course.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
