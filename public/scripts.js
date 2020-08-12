const currrentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currrentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for(let currrentPage = 1; currrentPage <= totalPages; currrentPage++){
        const firstAndLastPage = currrentPage == 1 || currrentPage == totalPages
        const pagesAfterSelectedPage = currrentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currrentPage >= selectedPage - 2

        if(firstAndLastPage|| pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if (oldPage && currrentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currrentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currrentPage)
        }
    }
    return pages
}

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    
    let elements = ""
    
    for(let page of pages) {
        if(String(page).includes("...")) {
            elements += `<span href="?page=${page}">${page}</span>`
        } else {
            if(filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}