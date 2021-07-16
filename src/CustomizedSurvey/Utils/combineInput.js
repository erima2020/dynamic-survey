export const combineInput = (list) => {
    if (list.random && list.random.length) {
        list.pages = list.pages.map((page, index) => {
            return perPage(page, list.random[index]);
        });
    }
    if(list.randomPage && list.randomPage.length){
        list = randomizePage(list, list.randomPage)
    }
    return list;
};

const perPage = (page, random) => {
    const validate = () => {
        if (!random || !random.for || !random.for.length) {
            return {
                validator: true,
                returner: page,
            };
        } else {
            if (
                random.for &&
                random.for.some((e1) => e1 < page.elements.length)
            ) {
                return {
                    validator: true,
                };
            } else {
                return {
                    validator: false,
                    error: "Out of the bound index for random key",
                };
            }
        }
    };
    const validator = validate();
    if (validator.validator) {
        if (validator.returner) {
            return validator.returner;
        } else {
            return withHard(page, random);
        }
    } else {
        throw new Error(validator.error);
    }
};


const withHard = (page, random) => {
    const newPage = [];
    const preSet = [].concat([...random.for]);
    const nextSet = [].concat([...random.for]);
    for (let i = 0; i < page.elements.length; i++) {
        const question = page.elements[i];

        if (preSet.includes(i)) {
            const random = Math.floor(Math.random() * nextSet.length);
            const randomElement = nextSet[random];

            const presetIndex = preSet.indexOf(i);
            const nextsetIndex = nextSet.indexOf(randomElement);

            preSet.splice(presetIndex, 1);
            nextSet.splice(nextsetIndex, 1);

            newPage.push(page.elements[randomElement]);
        } else {
            newPage.push(question);
        }
    }
    return { ...page, elements: newPage };
};

const randomizePage = (list, random) => {
    const newPage = [];
    const preSet = [].concat([...random]);
    const nextSet = [].concat([...random]);
    for (let i = 0; i < list.pages.length; i++) {
        const page = list.pages[i];
        if (preSet.includes(i)) {
            const random = Math.floor(Math.random() * nextSet.length);
            const randomElement = nextSet[random];

            const presetIndex = preSet.indexOf(i);
            const nextsetIndex = nextSet.indexOf(randomElement);

            preSet.splice(presetIndex, 1);
            nextSet.splice(nextsetIndex, 1);

            newPage.push(list.pages[randomElement]);
        } else {
            newPage.push(page);
        }
    }
    return { ...list, pages: newPage };
};
