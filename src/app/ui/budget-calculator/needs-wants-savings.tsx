export default function NWSTable( { needs, wants, savings }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="p-1">Needs</th>
                    <th className="p-1">Wants</th>
                    <th className="p-1">Savings</th>
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