import React from 'react'

const DataTable = () => {
    return (
        <table className="data-table">
            <thead>
                <tr>
                    <th className="data-table--header">Código</th>
                    <th className="data-table--header">Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr className="data-table--row">
                    <td className="data-table--body">01384256</td>
                    <td className="data-table--body">Zé das couves</td>
                </tr>
                <tr className="data-table--row">
                    <td className="data-table--body">01384256</td>
                    <td className="data-table--body">Zé das couves</td>
                </tr>
            </tbody>
        </table>
    )
}

export default DataTable
