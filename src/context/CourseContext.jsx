import React, { createContext, useContext, useState, useEffect } from "react";

const CoursesContext = createContext();

export const useCourses = () => useContext(CoursesContext);


const defaultCourses = [
    {
        id: "course1",
        title: "Математика",
        description: "Основы анализа",
        tasks: [
            {
                id: "task1",
                title: "Домашка 1",
                description: "Решите уравнение",
                canSubmit: true,
                submission: null,
            },
            {
                id: "task2",
                title: "Контрольная",
                description: "Графики функций",
                grade: 8,
                canSubmit: true,
                submission: null,
            },
            {
                id: "task3",
                title: "Самостоятельная",
                description: "Тест по главе 1",
                canSubmit: false,
            },
        ],
        attendance: {
            total: 10,
            attended: 7,
        },
    },
    {
        id: "course2",
        title: "Программирование",
        description: "JS, React",
        tasks: [
            {
                id: "task1",
                title: "Создать ToDo App",
                description: "React, JSX, state",
                canSubmit: true,
                submission: null,
            },
            {
                id: "task2",
                title: "Контрольная по массивам",
                description: "Циклы и map",
                grade: 9,
                canSubmit: false,
            },
        ],
        attendance: {
            total: 12,
            attended: 10,
        },
    },
];


const loadCourses = () => {
    try {
        const stored = localStorage.getItem("courses");
        let courses = stored ? JSON.parse(stored) : defaultCourses;

        // 🎯 фильтрация курсов по пользователю
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

        if (currentUser?.role === "student" && currentUser.courses) {
            courses = courses.filter(course => currentUser.courses.includes(course.id));
        }

        return courses;
    } catch (e) {
        console.warn("Ошибка при загрузке курсов:", e);
        return defaultCourses;
    }
};



export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === "student") {
                // показываем только курсы студента
                setCourses(defaultCourses.filter(c => user.courses.includes(c.id)));
            } else if (user.role === "teacher") {
                // учитель видит все курсы
                setCourses(defaultCourses);
            } else {
                setCourses(defaultCourses);
            }
        } else {
            setCourses([]);
        }
    }, []);

    return (
        <CoursesContext.Provider value={{ courses, setCourses }}>
            {children}
        </CoursesContext.Provider>
    );
};
