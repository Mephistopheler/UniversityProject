import { useCourses } from "../context/CourseContext.jsx";
import { Link } from "react-router-dom";

export default function StudentCourses() {
    const { courses } = useCourses();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const studentCourses = courses.filter(course =>
        currentUser?.courses.includes(course.id)
    );

    return (
        <div>
            <h3>Мои курсы</h3>
            {studentCourses.length === 0 ? (
                <p>Нет записанных курсов.</p>
            ) : (
                <ul>
                    {studentCourses.map(course => (
                        <li key={course.id}>
                            <Link to={`/student/courses/${course.id}`}>{course.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
