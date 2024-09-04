import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export function CsvViewer({ data }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {data[0].map((header, index) => (
                        <TableCell key={index}>{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
