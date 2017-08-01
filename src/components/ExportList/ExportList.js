import React from 'react'

const ExportList = () => {
    return (
        <ul className="export-list">
            <li>
                <a className="export-list--link" href="#csv">Planilha (csv)</a>
            </li>
            <li>
                <a className="export-list--link" href="#xslx">Planilha (xls)</a>
            </li>
            <li>
                <a className="export-list--link" href="#kml">Google Earth (kml)</a>
            </li>
            <li>
                <a className="export-list--link" href="#shape">Shape File</a>
            </li>
        </ul>
    )
}

export default ExportList
