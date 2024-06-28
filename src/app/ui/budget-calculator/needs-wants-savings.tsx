import {formatNumWithCommas, twoDecimalPlaces} from '@/app/utils/formatting'

export default function NWSTable( { needs, wants, savings }) {
    const total = needs + wants + savings;
    let needsPercentage = 50;
    let wantsPercentage = 30;
    let savingsPercentage = 20;
    if (total > 0) {
        needsPercentage = Math.round(needs / total * 100);
        wantsPercentage = Math.round(wants / total * 100);
        savingsPercentage = Math.round(savings / total * 100);
    }
    return (
        <table>
            <thead>
                <tr>
                    <th className="p-1">Needs ({needsPercentage}%)</th>
                    <th className="p-1">Wants ({wantsPercentage}%)</th>
                    <th className="p-1">Savings ({savingsPercentage}%)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-3">${formatNumWithCommas(needs)}</td>
                    <td className="p-3">${formatNumWithCommas(wants)}</td>
                    <td className="p-3">${formatNumWithCommas(savings)}</td>
                </tr>
            </tbody>
        </table>
    )
}