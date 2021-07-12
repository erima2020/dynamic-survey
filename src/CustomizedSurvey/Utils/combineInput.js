export const combineInput = (list) => {
    if (list.random && list.random.length) {
        list.pages = list.pages.map((page, index) => {
            return perPage(page, list.random[index]);
        });
        return list;
    }
    list.pages[list.pages.length - 1].elements.push({
        type: "random-id",
        text: "survey id",
        name: "surveyId",
        title: "Your survey id is",
    });
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
            // console.log(random*nextSet.length-1);
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
