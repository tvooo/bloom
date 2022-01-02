import useSWR from "swr";
import type { List, ListId } from "model/list";
import { useCallback } from "react";
import { Task } from "model/task";

// export const baseUrl = 'http://localhost:3001';
export const baseUrl = ``;

export const makeHeaders = (auth?: boolean, payload?: any) => {
    const headers: HeadersInit = {};
    if (payload) {
        headers["Content-Type"] = "application/json";
        headers["Content-Length"] = `${JSON.stringify(payload).length}`;
    }
    if (auth) {
        const token = localStorage.getItem('token');
        headers["Authorization"] = `Token ${token}`;
    }

    return new Headers(headers);
}

export const fetcher = (url: string) => fetch(url, { headers: makeHeaders(true) }).then((res) => res.json());

export const useTasks = () => {
    const { data, error, mutate } = useSWR(
        `${baseUrl}/api/tasks`,
        fetcher
    );
    const addTask = useCallback(async (task: Partial<Task>) => {
        mutate(async (todos: Task[]) => {
            await fetch(`${baseUrl}/api/tasks`, {
                method: "POST",
                body: JSON.stringify(task),
                headers: makeHeaders(true, task),
            });
            return [...todos, task]
        });
    }, []);
    const updateTask = useCallback(async (task: Task) => {
        mutate(async (todos: Task[]) => {
            await fetch(`${baseUrl}/api/tasks/${task.id}`, {
                method: "PATCH",
                body: JSON.stringify(task),
                headers: makeHeaders(true, task),
            });
            const newTodos = [...todos];
            const index = todos.findIndex(t => t.id === task.id);
            newTodos[index] = task;
            return newTodos;
            // return [...todos.filter(), task]
        });
    }, []);

    return {
        tasks: data || [],
        addTask,
        updateTask,
    };
}

export const useLists = () => {
    const { data, error, mutate } = useSWR(
        `${baseUrl}/api/lists`,
        fetcher
    );
    const updateList = useCallback(async (list) => {
        mutate(async (lists: List[]) => {
            await fetch(`${baseUrl}/api/lists/${list.id}`, {
                method: "PATCH",
                body: JSON.stringify(list),
                headers: makeHeaders(true, list),
            });
            const newLists = [...lists];
            const index = lists.findIndex(t => t.id === list.id);
            newLists[index] = list;
            return newLists;
            // return [...todos.filter(), task]
        });
    }, []);

    return { lists: data || [], updateList };
}

export const useList = (listId?: ListId) => {
    if (!listId) { return null; }
    const { data, error } = useSWR(
        `${baseUrl}/api/lists/${listId}`,
        fetcher
    );

    return data || null;
}

export const useLogin = () => {
    const doLogin = useCallback(async (username, password) => {
        const payload = { user: { username, password } };

        return fetch(`${baseUrl}/api/users/login`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: makeHeaders(false, payload),
        });
    }, []);

    return doLogin;
}

export const useSignup = () => {
    const doLogin = useCallback(async (username, password) => {
        const payload = { user: { username, password } };

        return fetch(`${baseUrl}/api/users`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: makeHeaders(false, payload),
        });
    }, []);

    return doLogin;
}