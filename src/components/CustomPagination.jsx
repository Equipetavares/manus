import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const CustomPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5 
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <nav className="flex items-center justify-center space-x-1" aria-label="Pagination">
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          className="hidden sm:flex"
        >
          Primeira
        </Button>
      )}

      {/* Previous Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Anterior</span>
      </Button>

      {/* First page if not visible */}
      {visiblePages[0] > 1 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            className={cn(
              "hidden sm:flex",
              currentPage === 1 && "bg-primary text-primary-foreground"
            )}
          >
            1
          </Button>
          {showStartEllipsis && (
            <div className="hidden sm:flex items-center px-2">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          )}
        </>
      )}

      {/* Visible page numbers */}
      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={cn(
            "min-w-[40px]",
            currentPage === page && "bg-primary text-primary-foreground"
          )}
        >
          {page}
        </Button>
      ))}

      {/* Last page if not visible */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {showEndEllipsis && (
            <div className="hidden sm:flex items-center px-2">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            className={cn(
              "hidden sm:flex",
              currentPage === totalPages && "bg-primary text-primary-foreground"
            )}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center"
      >
        <span className="hidden sm:inline mr-1">Próxima</span>
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className="hidden sm:flex"
        >
          Última
        </Button>
      )}
    </nav>
  );
};

export default CustomPagination;
