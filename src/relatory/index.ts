import { IClockIn } from "../models/IClockIn";
import { IUser } from "../models/IUser";

export interface cellProps {
    value: string | number,
    width?: number,
    fontSize?: number,
    align?: 'center' | 'right' | 'left',
    color?: string
    fontWeight?: 'bold' | undefined;
    backgroundColor?: string;
    topBorderColor?: string;
    bottomBorderColor?: string;
}
const doPersonalRelatory = (user: IUser, clockins: IClockIn[], endDate: Date) => {
    debugger;
    const numberOfDays = endDate.getDate();
    let maxNumberOfShifts = 0;

    const data: cellProps[][] = [];
    const totalByday: string[] = [];

    for (let i = 1; i <= numberOfDays; i++) {
        let totalMilliseconds = 0;
        let numberOfShifts = 0;
        let lastClockInDate: Date | undefined;
        let lastClockWasIn: boolean | undefined;
        const line: cellProps[] = [{
            value: i.toString(),
            align: 'center',
            fontWeight: 'bold'
        }];
        
        clockins.filter(clockIn => new Date(clockIn.date).getDate() === i).forEach(clockIn => {
            if (!clockIn.isIn && !lastClockInDate) {
                line.push({value: ''});
                numberOfShifts++;
            }
            const clockInDate = new Date(clockIn.date);
            clockInDate.setSeconds(0, 0);
            numberOfShifts++;

            if(!clockIn.isIn && !lastClockInDate) {
                totalMilliseconds += clockInDate.getTime();
            } else if(!clockIn.isIn && lastClockInDate) {
                totalMilliseconds += clockInDate.getTime() - lastClockInDate.getTime();
            }

            line.push({value: `${clockInDate.getHours()}h${clockInDate.getMinutes()}`})
            lastClockInDate = clockInDate;
            lastClockWasIn = clockIn.isIn;
        });

        if (numberOfShifts > maxNumberOfShifts) {
            maxNumberOfShifts = numberOfShifts;
        }

        if (lastClockWasIn && lastClockInDate) {
            const midnight = new Date(lastClockInDate.getFullYear(), lastClockInDate.getMonth(), i, 23, 59, 59, 9999);
            totalMilliseconds += midnight.getTime() - lastClockInDate.getTime();
        }

        if (lastClockInDate) {
            debugger;
            const hours = Math.floor(totalMilliseconds / 3600000);
            const minutes = (totalMilliseconds % 3600000)/60000;
            totalByday.push(`${hours}h${minutes}`);
        } else {
            totalByday.push('');
        }
        data.push(line)
    }

    totalByday.forEach((total, i) => {
        for(let k = data[i].length; k <= maxNumberOfShifts; k++) {
            data[i].push({value: ''});
        }
        data[i].push({
            value: total,
            fontWeight: 'bold',
            align: 'center'
            });
    });

    const header: cellProps[] = [
        {
            value: '',
            fontWeight: 'bold',
            backgroundColor: "#aaaaaa"
        },{
            value: user.name,
            fontWeight: 'bold',
            backgroundColor: "#aaaaaa"
        }];

    for (let j = 1; j <= maxNumberOfShifts; j++) {
        header.push({
            value: "",
            fontWeight: 'bold',
            backgroundColor: "#aaaaaa"
        })
    }
    const inAndOut: cellProps[] = [{
        value: `${endDate.getMonth() + 1}/${endDate.getFullYear()}`,
        fontWeight: 'bold',
        backgroundColor: "#aaaaaa",
        align: 'center'
    }];

    for (let j = 1; j <= maxNumberOfShifts; j++) {
        inAndOut.push({
            value: j%2 === 0 ? "Saída" : "Entrada",
            fontWeight: 'bold',
            backgroundColor: "#aaaaaa"
        })
    }

    inAndOut.push({
        value: "Total",
        fontWeight: 'bold',
        backgroundColor: "#aaaaaa",
        align: 'center'
    });

    return [header, inAndOut, ...data];
}

export default doPersonalRelatory;