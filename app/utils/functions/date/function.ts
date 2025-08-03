export const renderDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const newDate = new Date(year, month - 1, day);
    return newDate.toLocaleString('es-ES', {
        month: 'long',
        day: '2-digit',
    });
}

export const renderHour = (hour: string) => {
    const [hh, mm, ss] = hour.split(":").map(Number);
    let h = hh % 12 || 12; 
    const ampm = hh < 12 ? "AM" : "PM";
    return `${h}:${mm.toString().padStart(2, "0")} ${ampm}`;
}