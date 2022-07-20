import React, { useState } from "react";
import MaterialTable from "material-table";

export const UserTable = (props) => {
  const { columns, data, options, _handlePageChange } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <MaterialTable
      title={"Total User : " + data.length}
      columns={columns}
      // onPageChange={handleChangePage}
            // onRowClick={(e,rowData)=>console.log(rowData)}
      data={data}
      options={options}
    />
  );
};
