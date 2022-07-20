
import React from 'react'
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import color from '../../../Feature/Config/color';

const SortableTHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const headCells = [
        { id: 'name', numeric: false, label: 'Name',width: "11%"  },
        { id: 'email', numeric: false, label: 'e-mail',width: "16%"  },
        { id: 'country', numeric: false, label: 'Country',width: "12%" },
        { id: 'ministry', numeric: false, label: 'Ministry',width: "30%" },
        { id: 'type', numeric: false, label: 'Account Type',width: "15%" },
        { id: 'role', numeric: false, label: 'Role',width: "8%" },
        { id: 'active', numeric: true, label: 'Active', width: "8%" }
    ];

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{
                            backgroundColor: color.primaryColor,
                            color: "#ffffff",
                            fontWeight: "bold",
                            padding: '8px 13px 8px 13px',
                            width: headCell.width
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default SortableTHead;