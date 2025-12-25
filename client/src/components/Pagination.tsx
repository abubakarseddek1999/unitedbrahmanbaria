"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const limitOptions = [10, 30, 40, 50];

  return (
    <div className="flex items-center justify-between mt-4 max-w-sm md:max-w-md gap-1 md:gap-2">
      {/* Prev */}
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="dark:bg-gray-800 dark:text-white px-1 md:px-3 py-1 md:py-2"
      >
        <ChevronLeft className=" h-4 w-4" /><span className="text-[12px] md:text-base"> Previous </span>
      </Button>

      {/* Page Info */}
      <span className="text-[12px] text-muted-foreground">
        Page {currentPage} of {totalPages || 1}
      </span>

      {/* Next */}
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="dark:bg-gray-800 dark:text-white px-1 md:px-3 py-1 md:py-2"
      >
        <span className="text-[12px] md:text-base">Next</span> <ChevronRight className=" h-4 w-4" />
      </Button>

      {/* Limit Selector */}
      <Select
        value={limit.toString()}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 shadow-md rounded-md dark:text-white">
          {limitOptions.map((num) => (
            <SelectItem key={num} value={num.toString()} className="hover:bg-gray-600 ">
             <p className="dark:text-white"> {num}</p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
