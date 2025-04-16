"use client";

import { useRouter } from 'next/navigation';

const categories = [{ id: 1, category: "FICTION", icon: <img src="/assets/Fiction.svg" alt='Fiction' className="w-6 h-6" /> },
{
    id: 2, category: "PHILOSOPHY", icon: <img src="/assets/Philosophy.svg" alt='Philosophy' className="w-6 h-6" />
},
{
    id: 3, category: "DRAMA", icon: <img src="/assets/Drama.svg" alt='Drama' className="w-6 h-6" />
},
{
    id: 4, category: "HISTORY", icon: <img src="/assets/History.svg" alt='History' className="w-6 h-6" />
},
{
    id: 5, category: "HUMOUR", icon: <img src="/assets/Humour.svg" alt='Humour' className="w-6 h-6" />
},
{
    id: 6, category: "ADVENTURE", icon: <img src="/assets/Adventure.svg" alt='Adventure' className="w-6 h-6" />
},
{
    id: 7, category: "POLITICS", icon: <img src="/assets/Politics.svg" alt='Politics' className="w-6 h-6" />
}
]

const CategoryList = () => {
    const router = useRouter();

    const handleCategoryClick = (category: string) => {
        const categoryName = category.toLowerCase();
      
        router.push(`/book/${categoryName}`)


    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {categories.map(({ id, category, icon }) => (
                <button
                    onClick={() => handleCategoryClick(category)}

                    key={id}
                    className="flex flex-row items-center justify-between p-4 border rounded-lg shadow hover:shadow-md transition-all border-none shadow-[0_2px_5px_0_rgba(211,209,238,0.5)]"
                >
                    <div className="flex flex-row gap-4">
                        <div className="mb-2">{icon}</div>
                        <h3 className="text-lg font-semibold mb-2 text-left">{category}</h3>
                    </div>
                    <div>
                        <img src="/assets/Next.svg" alt='next' className="w-4 h-4" />
                    </div>
                </button>
            ))}
        </div>
    )
}

export default CategoryList;