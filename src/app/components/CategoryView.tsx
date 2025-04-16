import CategoryList from "./CategoryList";


const CategoryView = () => {
    return (
        <div className="bg-[#F8F7FF] min-h-screen p-8">
           
            <div className="text-left flex flex-col h-64 bg-[url('/assets/Pattern.svg')] bg-center">
              
                <div className="mt-20 text-[#5E56E7] text-3xl font-semibold">Gutenberg Project</div>
                
                <div>A social cataloging website that allows you to freely search its database of books, annotations,
                    and reviews.
                </div>
            </div>
            
            <div>
                <CategoryList />
            </div>


        </div>
    )

}

export default CategoryView;