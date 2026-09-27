import { http, HttpResponse } from "msw";
import { STORAGE_KEY } from "./STORAGE_KEY.ts";
import type { Users } from "../pages/registerPage/users.ts";

export const handlers = [
    http.get('/api/info', () => {
        const rawData = localStorage.getItem(STORAGE_KEY);
        const currentUsers: Users[] = rawData ? JSON.parse(rawData) : [];
        return HttpResponse.json<Users[]>(currentUsers);
    }),
    http.post('/api/info', async ({ request }) => {
        const nextUser = await request.json() as Omit<Users, "id">;
        const rawData = localStorage.getItem(STORAGE_KEY);
        const currentUsers: Users[] = rawData ? JSON.parse(rawData) : [];
        const createItem: Users = {
            id: Date.now(),
            ...nextUser,
        } as Users;
        currentUsers.push(createItem);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUsers));
        return HttpResponse.json<Users>(createItem, { status: 201 });
    })
]