export const createARandomArray = (list) => {
    if(list.random && list.random.length){
        list.pages = list.pages.map((page, index) => {
            return perPage(page, list.random[index])
        })
        return list;
    }
    return list;
}

const perPage = (page, random) => {
    if(!random) return page;
    if(random.soft){
        return page;
    }
    else {
        // input : [1, 2, 3, 6] 
        // all : [0, 1, 2, 3, 4, 5, 6]
        // output: [0, 6, 3, 1, 4, 5, 2]
        const newPage = [];
        const preSet = [].concat([...random.for]);
        const nextSet = [].concat([...random.for]);
        console.log('===', {
            nextSet,
            preSet,
            newPage,
            page
        })
        for (let i = 0; i < page.elements.length; i++) {
            const question = page.elements[i];
            
            if(preSet.includes(i)){
                const randomElement = nextSet[Math.floor(Math.random() * nextSet.length)]
                
                const presetIndex = preSet.indexOf(i);
                const nextsetIndex = nextSet.indexOf(randomElement);

                preSet.splice(presetIndex, 1);
                nextSet.splice(nextsetIndex, 1);
                
                newPage.push(page.elements[randomElement])
                console.log({
                    i,
                    randomElement,
                    preSet,
                    newPage,
                })
            } else {
                newPage.push(question);
            }
        }
        return { ...page, elements: newPage,  };
    }
}