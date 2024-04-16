import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';


import '../App.css'
import Box from '@mui/material/Box';

function Inventory() {

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100000,
        editable: true,
    });

    return (
        <>
            <h1>Inventory</h1>
            <p>
                email : fdc@fdc.com

            </p>
            <Box sx={{ height: 520, width: '90%' }}>
                <DataGridPro
                    {...data}
                    loading={data.rows.length === 0}
                    rowHeight={38}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    )
}

export default Inventory
