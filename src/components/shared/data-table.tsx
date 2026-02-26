"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, Filter, Check } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface ColumnDef<T> {
    header: string
    accessorKey?: keyof T
    cell?: (item: T) => React.ReactNode
}

export interface FilterOption {
    label: string
    value: string
}

export interface FilterDef<T> {
    column: keyof T
    label: string
    options: FilterOption[]
}

interface DataTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    searchKey?: keyof T | string // Column to filter by search text
    searchPlaceholder?: string
    filters?: FilterDef<T>[] // Array of filter definitions
    itemsPerPage?: number
    emptyMessage?: React.ReactNode
}

export function DataTable<T>({
    data,
    columns,
    searchKey,
    searchPlaceholder = "ابحث هنا...",
    filters = [],
    itemsPerPage = 20,
    emptyMessage = "لا توجد بيانات",
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
    const [currentPage, setCurrentPage] = useState(1)

    // Handle filter toggle
    const toggleFilter = (column: string, value: string) => {
        setActiveFilters((prev) => {
            const columnFilters = prev[column] || []
            const newFilters = columnFilters.includes(value)
                ? columnFilters.filter((v) => v !== value)
                : [...columnFilters, value]

            return {
                ...prev,
                [column]: newFilters,
            }
        })
        setCurrentPage(1) // Reset page on filter change
    }

    // Filter data based on search query and active filters
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Search filter
            if (searchQuery && searchKey) {
                const searchValue = String((item as any)[searchKey] || "").toLowerCase()
                if (!searchValue.includes(searchQuery.toLowerCase())) {
                    return false
                }
            }

            // Dropdown filters
            for (const filter of filters) {
                const columnKey = String(filter.column)
                const selectedOptions = activeFilters[columnKey] || []

                if (selectedOptions.length > 0) {
                    const itemValue = String((item as any)[columnKey] || "")
                    if (!selectedOptions.includes(itemValue)) {
                        return false
                    }
                }
            }

            return true
        })
    }, [data, searchQuery, searchKey, filters, activeFilters])

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    // Ensure currentPage is valid if data length changes
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages)
        } else if (totalPages === 0) {
            setCurrentPage(1)
        }
    }, [totalPages, currentPage])

    const paginatedData = useMemo(() => {
        const startIndex = (Math.max(1, currentPage) - 1) * itemsPerPage
        return filteredData.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredData, currentPage, itemsPerPage])

    return (
        <div className="space-y-4 p-4">
            {/* Toolbar (Search & Filters) */}
            {(searchKey || filters.length > 0) && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {searchKey && (
                        <div className="relative w-full sm:max-w-xs">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="pr-9 w-full bg-background"
                            />
                        </div>
                    )}

                    {filters.length > 0 && (
                        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar justify-end">
                            {filters.map((filter) => {
                                const columnKey = String(filter.column)
                                const selectedOptions = activeFilters[columnKey] || []
                                const activeCount = selectedOptions.length

                                return (
                                    <DropdownMenu key={columnKey} dir="rtl">
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="h-10 shrink-0 border-dashed border-border/80 hover:border-primary/50 bg-background hover:bg-primary/5 transition-all duration-300 rounded-xl px-4 flex items-center gap-2.5 font-medium shadow-sm group">
                                                {activeCount > 0 && (
                                                    <>
                                                        <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-primary-foreground bg-primary rounded-md shadow-sm">
                                                            {activeCount}
                                                        </span>
                                                        <span className="w-[1px] h-4 bg-border/60" />
                                                    </>
                                                )}
                                                <span className="text-foreground group-hover:text-primary transition-colors">{filter.label}</span>
                                                <Filter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[240px] p-2 rounded-[14px] shadow-xl border border-border/40 bg-background/95 backdrop-blur-md">
                                            <div className="flex items-center justify-start gap-2 px-3 py-2">
                                                <Filter className="w-4 h-4 text-primary" />
                                                <DropdownMenuLabel className="p-0 text-sm font-bold text-foreground/80">
                                                    تصفية حسب {filter.label}
                                                </DropdownMenuLabel>
                                            </div>
                                            <DropdownMenuSeparator className="my-1.5 bg-border/40 mx-2" />
                                            <div className="flex flex-col gap-1 px-1">
                                                {filter.options.map((option) => {
                                                    const isChecked = selectedOptions.includes(option.value)
                                                    return (
                                                        <DropdownMenuItem
                                                            key={option.value}
                                                            onSelect={(e) => {
                                                                e.preventDefault()
                                                                toggleFilter(columnKey, option.value)
                                                            }}
                                                            className={`flex items-center justify-between w-full px-2 py-2.5 cursor-pointer rounded-lg transition-all duration-200 outline-none group ${isChecked ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/60"}`}
                                                        >
                                                            <div className={`flex items-center justify-center w-5 h-5 ml-3 rounded-[6px] border transition-all duration-200 shadow-sm shrink-0 ${isChecked ? "bg-primary border-primary text-primary-foreground scale-100" : "bg-background border-border/80 group-hover:border-primary/50 scale-95 group-hover:scale-100"}`}>
                                                                {isChecked && <Check strokeWidth={3} className="w-3.5 h-3.5" />}
                                                            </div>
                                                            <span className={`text-sm flex-1 text-right transition-colors ${isChecked ? "font-bold text-primary" : "text-muted-foreground font-medium group-hover:text-foreground"}`}>
                                                                {option.label}
                                                            </span>
                                                        </DropdownMenuItem>
                                                    )
                                                })}
                                            </div>
                                            {activeCount > 0 && (
                                                <>
                                                    <DropdownMenuSeparator className="my-1.5 bg-border/40 mx-2" />
                                                    <div className="px-1 pb-1 pt-0.5">
                                                        <Button
                                                            variant="ghost"
                                                            className="w-full h-9 text-xs font-bold text-destructive bg-destructive/5 hover:bg-destructive/10 hover:text-destructive justify-center transition-all rounded-lg flex items-center gap-2"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setActiveFilters(prev => ({ ...prev, [columnKey]: [] }))
                                                                setCurrentPage(1)
                                                            }}
                                                        >
                                                            مسح التصفية
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="rounded-[24px] border bg-card overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent border-b-border">
                            {columns.map((column, index) => (
                                <TableHead key={index} className="font-semibold text-foreground py-4 px-6 text-right whitespace-nowrap">
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, rowIndex) => (
                                <TableRow key={rowIndex} className="transition-colors hover:bg-muted/50 border-b-border group">
                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex} className="py-4 px-6 font-medium text-muted-foreground text-right border-0 group-last:border-b-0">
                                            {column.cell
                                                ? column.cell(item)
                                                : column.accessorKey
                                                    ? String((item as any)[column.accessorKey] || "-")
                                                    : "-"}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-40 text-center text-muted-foreground">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {filteredData.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div className="text-sm text-muted-foreground">
                        عرض {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} إلى {Math.min(currentPage * itemsPerPage, filteredData.length)} من أصل {filteredData.length} سجل
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-9 h-9 bg-background"
                        >
                            <ChevronRight className="w-4 h-4" /> {/* Right arrow for previous in RTL */}
                        </Button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className="w-9 h-9"
                                        >
                                            {page}
                                        </Button>
                                    )
                                } else if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                ) {
                                    return <span key={page} className="text-muted-foreground px-1">...</span>
                                }
                                return null
                            })}
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-9 h-9 bg-background"
                        >
                            <ChevronLeft className="w-4 h-4" /> {/* Left arrow for next in RTL */}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
