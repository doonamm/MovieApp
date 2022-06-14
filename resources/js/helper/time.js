function getNameS(value, name, isShorten){
    if(isShorten){
        return name.slice(0, 1);
    }
    return value === 1 ? name : name + 's';
}

function calcDelta(milli, onceTime, timeName, isShorten){
    const deltaTime = milli / onceTime;
    if(deltaTime >= 1){
        const value = Math.ceil(deltaTime);
        const name = getNameS(value, timeName, isShorten);

        return [name, value];
    }
    return false
}

export function getDeltaTimeToNow(date, isShorten = false){
    const time = new Date(date);
    const deltaMilliseconds = Date.now() - time.getTime();

    const onceSecond = 1000;
    const onceMinute = onceSecond * 60;
    const onceHour = onceMinute * 60;
    const onceDay = onceHour * 24;
    const onceYear =  onceDay * 365;

    const deltaYear = calcDelta(deltaMilliseconds, onceYear, 'year', isShorten);
    if(deltaYear !== false)
        return deltaYear;

    const deltaMonth = calcDelta(deltaMilliseconds, onceYear / 12, 'month', isShorten);
    if(deltaMonth !== false)
        return deltaMonth;

    const deltaWeek = calcDelta(deltaMilliseconds, onceDay * 7, 'week', isShorten);
    if(deltaWeek !== false)
        return deltaWeek;
    
        const deltaDay = calcDelta(deltaMilliseconds, onceDay, 'day', isShorten);
    if(deltaDay !== false)
        return deltaDay;

    const deltaHour = calcDelta(deltaMilliseconds, onceHour, 'hour', isShorten);
    if(deltaHour !== false)
        return deltaHour;

    const deltaMinute = calcDelta(deltaMilliseconds, onceMinute, 'minute', isShorten);
    if(deltaMinute !== false)
        return deltaMinute;
    
    const deltaSecond = calcDelta(deltaMilliseconds, onceSecond, 'second', isShorten);
    if(deltaSecond !== false)
        return deltaSecond;
}