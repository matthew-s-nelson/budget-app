import React from "react";

export default function TimePeriod({ change, periods, periodType }) {
    const formatPeriod = (period) => {
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
            default:
                return period;
        }
    };

    return (
        <select name="period-select" onChange={change}>
            <option value="">Select a {periodType}</option>
            {periods.map((period, index) => (
                <option key={index} value={period}>
                    {formatPeriod(period)}
                </option>
            ))}
        </select>
    );
}