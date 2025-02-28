export interface returnValue {
    date: string;
    time: string;
}

export function date(start: string, end: string):returnValue {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Formatting the date part
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('default', { month: 'long' });
    const startYear = startDate.getFullYear();
    
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('default', { month: 'long' });
    const endYear = endDate.getFullYear();

    let formattedDate: string;
    if (startYear === endYear && startMonth === endMonth && startDay !== endDay) {
        formattedDate = `${startDay} - ${endDay} ${endMonth}, ${startYear}`;
    } else {
        formattedDate = `${startDay} ${startMonth}, ${startYear}`;
    }

    // Formatting the time part
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    const startTime = startDate.toLocaleString('en-US', { weekday: 'long' }) + ` ${startHours % 12 || 12}:${startMinutes < 10 ? '0' + startMinutes : startMinutes}${startHours >= 12 ? 'PM' : 'AM'}`;
    const endTime = `${endHours % 12 || 12}:${endMinutes < 10 ? '0' + endMinutes : endMinutes}${endHours >= 12 ? 'PM' : 'AM'}`;

    const formattedTime = `${startTime} - ${endTime}`;

    return { date: formattedDate, time: formattedTime };
}