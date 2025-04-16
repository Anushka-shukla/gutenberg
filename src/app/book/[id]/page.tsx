"use client"

import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { useParams, useRouter } from "next/navigation";


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

const BooksView = () => {
    const router = useRouter();
    const params = useParams();
    const category = params.category;
    console.log("category:::::", params);


    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    const handleBackBtn = () => {
        router.push('/');
    }

    async function getBooksData() {

        try {
            const res = await fetch(`http://skunkworks.ignitesol.com:8000/books/?mime_type=${encodeURIComponent("image/jpeg")}&topic=${params.id}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
            }
            const jsonData = await res.json();

            console.log(jsonData);
            setBooks(jsonData.results);
            setFilteredBooks(jsonData.results);

        } catch (error) {
            return error;
        }

    }


    useEffect(() => {
        getBooksData();

    })



    const giveBooksList = () => {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 place-items-center gap-2">
                {filteredBooks.map((book) => (
                    <a href={book.formats["text/html"] ?? book.formats["text/pdf"] ?? book.formats["text/plain"]} key={book.id}>
                        <div key={book.id} className="flex flex-col items-start mb-2 p-2 rounded-lg text-center" >

                            <img src={book.formats["image/jpeg"]} alt="book" className="object-cover rounded w-[114px] h-[162px] rounded-[8px] shadow-[0_2px_5px_0_rgba(211,209,238,0.5)]" />

                            <h2 className="text-md font-semibold mt-2 w-[114px] overflow-hidden text-ellipsis text-left" style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}>{book.title}</h2>

                            <p className="text-sm text-gray-600 w-[114px] truncate text-left">
                                {book.authors?.length > 0
                                    ? book.authors.map((author) => author.name).join(', ')
                                    : 'Unknown Author'}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        )
    }






    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-50 bg-white pb-4">
                <div className="flex flex-row pb-10">

                    <div className="fixed left-10 top-3" onClick={handleBackBtn}>
                        <img src="/assets/Back.svg" alt="back" />

                    </div>
                    <div className="text-[30px] text-[#5E56E7] fixed left-20">{params.id}</div>
                </div>

                <SearchBar books={books} setFilteredBooks={setFilteredBooks} />
            </div>

            <div className="flex-1 overflow-y-auto bg-[#F8F7FF] px-4 pb-10">
                {giveBooksList()}
            </div>
        </div>
    )
}


export default BooksView;