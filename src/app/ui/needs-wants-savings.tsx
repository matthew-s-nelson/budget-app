export default function NWSTable( { needs, wants, savings }) {
    return (
        <table>
            <thead>
                <th>Needs</th>
                <th>Wants</th>
                <th>Savings</th>
            </thead>
            <tr>
                <td className="p-3">${needs}</td>
                <td className="p-3">${wants}</td>
                <td className="p-3">${savings}</td>
            </tr>
        </table>
    )
}