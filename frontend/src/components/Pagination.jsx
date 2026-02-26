export default function Pagination({ page, totalPages, onPageChange, disabled }) {
  return (
    <div className="pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1 || disabled}
      >
        &laquo; Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages || disabled}
      >
        Next &raquo;
      </button>
    </div>
  );
}
