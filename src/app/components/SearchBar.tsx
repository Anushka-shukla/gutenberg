import { useState } from "react";

type Format = {
    [key: string]: string,
}

interface Author {
    name: string,
    birth_year: Date,
    death_year: Date

}
interface Book {
    authors: Author[],
    //  @ts-ignore @ts-expect-error
    bookshelves: any[],
    copyright: boolean,
    download_count: number,
    formats: Format,
    id: number,
    //  @ts-ignore @ts-expect-error
    language: any[],
    media_type: string,
     //  @ts-ignore @ts-expect-error
    subjects: any[],
    title: string,
    //  @ts-ignore @ts-expect-error
    translators: any[]

}

type SearchBarProps = {
    books: Book[];
    setFilteredBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};


const SearchBar: React.FC<SearchBarProps> = ({ books, setFilteredBooks }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        var value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = books.filter((book: Book) => {
            const titleMatch = book.title.toLowerCase().includes(value);
            const authorMatch = book.authors?.some((author) =>
                author.name.toLowerCase().includes(value)
            );
            return titleMatch || authorMatch;
        });
        setFilteredBooks(filtered)

    }

    const handleCancelBtn = () => {
        if (searchTerm) {
            setSearchTerm("");
            setFilteredBooks(books);
        }
    }

    return (
        <div className={`flex flex-row items-center justify-between border rounded-xl  bg-[#F0F0F6] pr-4 pl-4 h-10 text-[12px] m-10 
        ${isFocused ? "border-[#5E56E7] ring-1 ring-purple-300" : "border-none"} transition-all duration-200`}
            onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
        >

            <div className="flex flex-row justify-between items-center">
                <div className="flex mr-2">
                    <img src="/assets/Search.svg" alt="clear" />
                </div>

                <div className="w-full">
                    <input placeholder="Search" type="text" value={searchTerm} onChange={handleSearch}

                        className="outline-none border border-none w-full"
                    />
                </div>
            </div>
            {searchTerm && <div onClick={handleCancelBtn}> <img src="/assets/Cancel.svg" alt="search" /></div>}
        </div>
    )
}

export default SearchBar;