export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (currentPage == null || totalPages == null) return null;
    return (
        <div>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                {currentPage - 1}
            </button>
            <button>{currentPage}</button>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                {currentPage + 1}
            </button>
        </div>
    );
}
