export default function Table() {
    return (
        <table className="border-separate border-spacing-2 border border-slate-400">
            <thead className="">
                <tr>
                    <th>Rent</th>
                    <th>Groceries</th>
                    <th>Gas</th>
                    <th>Entertainment</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>$20</td>
                    <td>$35</td>
                    <td>$23</td>
                    <td>$23</td>
                    <td>$26</td>
                </tr>
            </tbody>
        </table>
    )
}