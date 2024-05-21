export default function Table({ row }) {
    return (
        <table className="border-separate border-spacing-2 border border-slate-400">
            <thead className="">
                <tr>
                    <th className="p-2">Rent</th>
                    <th className="p-2">Groceries</th>
                    <th className="p-2">Gas</th>
                    <th className="p-2">Entertainment</th>
                    <th className="p-2">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="">{row.rent}</td>
                    <td>{row.groceries}</td>
                    <td>{row.gas}</td>
                    <td>{row.entertainment}</td>
                    <td>{row.rent + row.groceries + row.gas + row.entertainment}</td>
                </tr>
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