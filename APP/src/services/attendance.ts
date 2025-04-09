import axios from "axios";
import { AttendanceType, CreateAttendanceDTO, UpdateAttendanceDTO, UserType } from "../types/attendance.types";
import { api } from "./apiinterceptors";


export const getRegistrationUserByEventId = async (eventId: number): Promise<UserType[]> => {
    const res = await api.get(`/attendance/${eventId}/registration`);
    return res.data;
};

export const getAllAttendancesByEventId = async (eventId: number): Promise<AttendanceType[]> => {
    const res = await api.get(`/attendance/event/${eventId}/users`);
    return res.data;
};

// 3. Create a new attendance
export const createAttendance = async (payload: CreateAttendanceDTO): Promise<AttendanceType> => {
    const res = await api.post('/attendance/',payload);
    return res.data;
};
// 5. Delete attendance
export const deleteAttendance = async (id: number): Promise<{ message: string }> => {
    const res = await api.delete(`/attendance/${id}`);
    return res.data;
};



// 2. Get attendance by ID
export const getAttendanceById = async (id: number): Promise<AttendanceType> => {
    const res = await api.get(`/attendance/${id}`);
    return res.data;
};

// 1. Get all attendances
export const getAllAttendances = async (): Promise<AttendanceType[]> => {
    const res = await api.get('/attendance/');
    return res.data;
};

// 4. Update attendance by ID
export const updateAttendance = async (id: number, payload: UpdateAttendanceDTO): Promise<{ message: string }> => {
    const res = await api.put(`/attendance/${id}`, payload);
    return res.data;
};


// 6. Get related event by attendance ID
export const getEventByAttendanceId = async (id: number): Promise<Event> => {
    const res = await api.get(`/attendance/${id}/event`);
    return res.data;
};

// 7. Get related user by attendance ID
export const getUserByAttendanceId = async (id: number): Promise<UserType> => {
    const res = await api.get(`/attendance/${id}/user`);
    return res.data;
};


