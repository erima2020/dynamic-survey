import { decrementList, incrementList } from "./incrementList";

export const combineInput = (list) => {
  if (list.random && list.random.length) {
    list.pages = list.pages.map((page, index) => {
      return perPage(page, list.random[index]);
    });
  }
  if (list.randomPage && list.randomPage.length) {
    list = randomizePage(list, list.randomPage);
  }
  return list;
};

const perPage = (page, random) => {
  const validate = () => {
    if (
        !random || 
        !random.for || 
        !random.for.length ||
        random.for.some((e1) => e1 < 1) // since the index is starting from 1
    ) {
      return {
        validator: true,
        returner: page,
      };
    } else {
      if (
          random.for && 
          random.for.every((e1) => e1 < page.elements.length + 1)
        ) { // since the index would be starting from 1
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
  const newRandomList = decrementList(random.for)
  const preSet = [].concat([...newRandomList]);
  const nextSet = [].concat([...newRandomList]);
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

const randomizePage = (list, prevRandom) => {
  const random = decrementList(prevRandom);

  const newPage = [];
  const order = [];
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

      order.push(randomElement);
    } else {
      newPage.push(page);
      order.push(i);
    }
  }
  return { ...list, pages: newPage, order: incrementList(order) };
};
