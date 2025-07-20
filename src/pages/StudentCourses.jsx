import { useCourses } from "../context/CourseContext.jsx";
import { Link } from "react-router-dom";


export default function StudentCourses() {
    const { courses } = useCourses();

    return (
        <div>
            <h3>Мои курсы</h3>
            {courses.length === 0 ? (
                <p>Нет записанных курсов.</p>
            ) : (
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>
                            <Link to={`/student/courses/${course.id}`}>{course.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
