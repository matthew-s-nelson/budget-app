export default function NWSTable( { needs, wants, savings }) {
    const total = needs + wants + savings;
    let needsPercentage = 50;
    let wantsPercentage = 30;
    let savingsPercentage = 20;
    if (total > 0) {
        needsPercentage = needs / total * 100;
        wantsPercentage = wants / total * 100;
        savingsPercentage = savings / total * 100;
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
                    <td className="p-3">${needs}</td>
                    <td className="p-3">${wants}</td>
                    <td className="p-3">${savings}</td>
                </tr>
            </tbody>
        </table>
    )
}