interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Show up to 3 page numbers: current, one before, one after
  const pages = [];
  if (currentPage > 1) pages.push(currentPage - 1);
  pages.push(currentPage);
  if (currentPage < totalPages) pages.push(currentPage + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className="px-2 py-1 rounded hover:bg-gray-200"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pages[0] > 1 && <span>...</span>}
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-gray-100 font-bold" : "hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {pages[pages.length - 1] < totalPages && <span>...</span>}
      <button
        className="px-2 py-1 rounded hover:bg-gray-200"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
