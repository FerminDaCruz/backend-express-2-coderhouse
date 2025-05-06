import { useEffect, useState } from "react";

export default function SearchFilters({ onSearch }) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        onSearch({ name: input });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        input === "" && handleSearch();
    }, [input]);

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                value={input}
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
}
