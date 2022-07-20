import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import color from '../../../Feature/Config/color';
import CountryData from "../../../Feature/Config/countries.json";
import TablePaginationActions from './tablePagination';
import SearchBar from 'material-ui-search-bar';
import SortableTHead from './sortableTHead';
import '../../../App.css'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper
} from '@material-ui/core';

const UNDP_userTable = (props) => {
    const { data, _handleSwitch, isDisabled } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataRows, setDataRows] = useState([]);
    const [searched, setSearched] = useState('');
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        const element = document.getElementsByClassName('MuiTypography-root MuiTablePagination-caption MuiTypography-body2 MuiTypography-colorInherit')
        document.getElementsByClassName('MuiInputBase-root MuiTablePagination-input MuiTablePagination-selectRoot')[0].style.marginRight = 0
        element[0].style.display = "none";
        element[1].style.display = "none";
    }, [page])

    const StyledTableCell = withStyles((theme) => ({
        body: {
            fontSize: 14,
            color: color.textColor,
            padding: '8px 13px 8px 13px'
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: "#eee",
            },
        },
    }))(TableRow);

    const createData = (name, email, country, ministry, type, role, active) => {
        return { name, email, country, ministry, type, role, active };
    }

    const countryName = (code) => {
        return CountryData.filter((v) => v.code === code)[0].name;
    };

    useEffect(() => {
        setTableData()
        console.log('table data ', data)
    }, [data])

    const setTableData = () => {
        let rows = [];
        for (const dt of data) {
            const switchPanel = <Switch
                id={dt.user_id}
                checked={dt.active}
                _handleSwitch={_handleSwitch}
                isDisabled={isDisabled}
            />;
            const country = dt.country_id ?
                <div>
                    <img
                        src={"/countryflags/" + dt.country_id.toLowerCase() + ".svg"}
                        alt="country flag"
                        width={20}
                        className="pr-1 pb-1"
                    />
                    {countryName(dt.country_id)}
                </div>
                :
                <div></div>;

            const eachRow = createData(dt.name, dt.email, country, dt.ministry, dt.type, dt.role, switchPanel)
            rows.push(eachRow)
        }
        setDataRows(rows)
    }

    const useStyles = makeStyles({
        table: {
            minWidth: 800,
        },
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const descendingComparator = (a, b, orderBy) => {
        const Acountry = Object.keys(a.country.props).length > 0 ? a.country.props.children[1] : '';
        const Bcountry = Object.keys(b.country.props).length > 0 ? b.country.props.children[1] : '';
        const A = orderBy === 'active' ? a.active.props.checked : orderBy === 'country' ? Acountry : a[orderBy];
        const B = orderBy === 'active' ? b.active.props.checked : orderBy === 'country' ? Bcountry : b[orderBy];
        if (B < A) {
            return -1;
        }
        if (B > A) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const requestSearch = (searchedVal) => {
        if (searchedVal.trim() === '') {
            setTableData();
        } else {
            const filteredRows = dataRows.filter((row) => {
                return row.name.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setDataRows(filteredRows);
        }
    };

    const cancelSearch = () => {
        setSearched("");
        setTableData();
    };

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    SortableTHead.propTypes = {
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    const classes = useStyles();
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataRows.length - page * rowsPerPage);
    return (
        <TableContainer component={Paper}>

                <div className="d-flex justify-content-between">
                    <div className='text-left p-3' style={{ fontSize: 20 }}>
                        Total User : {data.length}
                    </div>
                    <SearchBar
                        className='searchBar mt-2 m-2'
                        colSpan={6}
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                        // style={{ boxShadow: 'none', borderBottom: '1px solid grey', borderRadius: 0,}}
                    />
                </div>
          
            <Table className={classes.table} aria-label="customized table">
                <SortableTHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {dataRows.length > 0 ?
                        <>
                            {(rowsPerPage > 0
                                ? stableSort(dataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), getComparator(order, orderBy))
                                : stableSort(dataRows, getComparator(order, orderBy))
                            ).map((row,k) => (
                                <StyledTableRow key={k}>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{row.country}</StyledTableCell>
                                    <StyledTableCell>{row.ministry}</StyledTableCell>
                                    <StyledTableCell>{row.type}</StyledTableCell>
                                    <StyledTableCell>{row.role}</StyledTableCell>
                                    <StyledTableCell>{row.active}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 41 * emptyRows, }}>
                                    <TableCell colSpan={6} />
                                </TableRow>

                            )}
                        </>
                        :
                        (
                            <TableRow style={{ height: 41 * emptyRows }}>
                                <TableCell colSpan={12} style={{ textAlign: 'center' }} >No records to display</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={
                                [{ label: '5 rows', value: 5 },
                                { label: '10 rows', value: 10 },
                                { label: '20 rows', value: 20 },
                                { label: 'All', value: -1 }]
                            }
                            colSpan={12}
                            count={dataRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default UNDP_userTable;

const Switch = (props) => {
    const { _handleSwitch, id, checked, isDisabled } = props;
    return (
        <div className="custom-control custom-switch">
            <input
                type="checkbox"
                className="custom-control-input"
                id={id}
                onChange={(e) => _handleSwitch(e, checked)}
                checked={checked}
                disabled={isDisabled}
            />
            <label
                className="custom-control-label"
                htmlFor={id}
                style={{ cursor: "pointer" }}
            ></label>
        </div>
    );
};