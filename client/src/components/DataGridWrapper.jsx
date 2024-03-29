import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

/**
 * 
 * @param {Object} gridConfig - Data grid configuration options
 * @param {Object[]} gridConfig.rows - Rows (data)
 * @param {Object[]} [gridConfig.columns] - Columns (headers)
 * @param {Object} [gridConfig.slots=""] - Custom items to put in slot at the top of data grid.
 * @param {Object} [gridConfig.slotProps=""] - Props for items in slots
 *  
 * @returns 
 */
function DataGridWrapper({ rows, columns, slots=null, slotProps=null}) {
    return (
        <div className='mt-0 m-6 shadow-datagrid'>
            <DataGrid
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25, 100]}
                className='!border-0 max-w-[100%] transition delay-2000 rounded-2xl dark:text-white dark:bg-light-gray'
                rows={rows} columns={columns} sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    }
                }}
                slots={slots}
                slotProps={slotProps} />
        </div>
    )
}

export default DataGridWrapper