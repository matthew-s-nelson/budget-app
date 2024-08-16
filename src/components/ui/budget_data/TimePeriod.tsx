import React from "react";
import { start } from "repl";

interface TimePeriodProps {
    change: any,
    periods: any,
    periodType: string
}

export default function TimePeriod({ change, periods, periodType }:TimePeriodProps) {
    const formatPeriod = (period: any) => {
        switch (periodType) {
            case 'week': {
                const startDate = new Date(period);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6);
                return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            }
            case 'year': {
                const startDate = new Date(period);
                const endDate = new Date(startDate.getFullYear(), 11, 31);
                return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            }
            case 'month': {
                const startDate = new Date(period);
                const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            }
            default:
                return period;
        }
    };

    return (
        <select name="period-select" onChange={change}>
            <option value="">Select a {periodType}</option>
            {periods.map((period: any, index: number) => (
                <option key={index} value={period}>
                    {formatPeriod(period)}
                </option>
            ))}
        </select>
    );
}