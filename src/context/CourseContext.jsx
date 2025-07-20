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
        if (stored) {
            const parsed = JSON.parse(stored);
            return parsed.map(course => ({
                ...course,
                tasks: course.tasks.map(task => ({
                    ...task,
                    canSubmit: !!task.canSubmit,
                })),
            }));
        }
    } catch (e) {
        console.warn("Ошибка при загрузке курсов из localStorage:", e);
    }

    return defaultCourses;
};

export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState(loadCourses);


    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses]);

    return (
        <CoursesContext.Provider value={{ courses, setCourses }}>
            {children}
        </CoursesContext.Provider>
    );
};
