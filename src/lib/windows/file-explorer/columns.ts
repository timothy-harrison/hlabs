import { renderComponent } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableCheckbox from "./DataTableCheckbox.svelte";
import DataTableExpand from "./DataTableExpand.svelte";

type FileNode = {
    id: string,
    name: string,
    type: string,
    size: string,
    modified: string,
    subRows?: FileNode[]
};

export const columns: ColumnDef<FileNode>[] = [
    {
        accessorKey: "id",
        header: ({ table, column }) => {
            renderComponent(DataTableCheckbox, {
                checked: table.getIsAllPageRowsSelected(),
                indeterminate:
                    table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
                onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
                "aria-label": "Select all",
            });
        },
        cell: ({ row, table }) => {
            if (row.original.type == "Folder") {
                return renderComponent(DataTableCheckbox, {
                    checked: row.getIsSelected(),
                    onCheckedChange: (value) => row.toggleSelected(!!value), "aria-label": "Select Row"
                })
            } else {
                return renderComponent(DataTableExpand, {
                    expanded: row.getIsExpanded(),
                    onclick: () => {
                        if (row.getCanExpand()) {
                            row.toggleExpanded(!row.getIsExpanded());
                        }
                    }
                })
            }
        }
    },
    {
        accessorKey: "name",
        header: ""
    }
];