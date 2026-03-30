function pickOne(items, label) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error(`No questions found for ${label}.`);
    }

    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

function pickMany(items, count, label) {
    if (!Array.isArray(items) || items.length < count) {
        const found = Array.isArray(items) ? items.length : 0;
        throw new Error(`Not enough questions for ${label}. Needed ${count}, found ${found}.`);
    }

    const pool = [...items];
    const picks = [];

    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * pool.length);
        picks.push(pool[index]);
        pool.splice(index, 1);
    }

    return picks;
}

module.exports = {
    pickOne,
    pickMany,
};
