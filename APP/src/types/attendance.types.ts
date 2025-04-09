export interface AttendanceType {
    id: number;
    user_id:number;
    name:string;
    img: string; 
    email:string; 
    attendance_time: string; // ISO format (timestamp)
      
}
export interface UserType {
    registration_id:number;
    user_id: number;
    name: string;
    img:string;
    email: string;
}

export interface CreateAttendanceDTO {
    event_id: number;
    user_id:number;
}

export interface UpdateAttendanceDTO {
    id:number;
    event_id: number;
    user_id:number;
}
export interface DeleteAttendanceDTO {
    id:number;
}
export interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    numOFUser: number;
    image: string;
    created_by: number;
    is_deleted: boolean;
}
