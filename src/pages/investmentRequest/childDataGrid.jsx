// ChildDataGrid.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const ChildDataGrid = ({ rows, columns }) => {
  return (
    <div style={{ marginLeft: 20 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        autoHeight
        hideFooter
      />
    </div>
  );
};

export default ChildDataGrid;
