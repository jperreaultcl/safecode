const allusers = [
    {
        id: 123,
        good: false,
        name: "",
    },
    {
        id: 1,
        good: true,
        name: "Stan Watts",
        title: "CTO",
    },
    {
        id: 432,
        good: true,
        name: "Jamie",
        title: "dog walker",
    },
    {
        id: 2,
        good: true,
        name: "George Perreault",
        title: "CAO",
    }
];

const keyLength = {};
let keys = [];

const getKeys = () => {
    const maxLen = 10;
    const keySet = new Set();
    allusers.forEach(u => {
        Object.keys(u).forEach(k => {
            keySet.add(k);
            if (k != 'good' && u[k]) {
                if (!keyLength[k]) { keyLength[k] = 0; }
                const ukstrlen = u[k].toString().length;
                console.log(`looking at key ${k} for user ${u.id} with value ${u[k]} and length ${ukstrlen}`)
                if (ukstrlen > keyLength[k]) {
                    keyLength[k] = ukstrlen >= maxLen ? maxLen : ukstrlen;
                }
            }
        });
    });
    keySet.delete('good');
    keys = [...keySet].sort();
};
getKeys();
console.log('keylength',keyLength);

const print = (u) => {
    console.log(keys.reduce((prev_k, k) => {
        const klen = keyLength[k];
        if (!u[k]) {
            return `${prev_k}|${' '.repeat(klen+1+k.length+1)}`;
        }
        const ukstr = u[k].toString();
        const ukstrlen = u[k].toString().length;
        return `${prev_k}|${k}:${ukstrlen > klen?`${ukstr.substring(0,klen-3)}...`:`${u[k]}${' '.repeat(klen-ukstrlen)}`} `
    },'')+'|');
}

const sortUsers = (a, b) => {
    return a.id - b.id;
}

module.exports = {
    print: print,
    goodusers: allusers.filter(u => u.good).sort(sortUsers),
    allusers: allusers.sort(sortUsers),
    badusers: allusers.filter(u => !u.good).sort(sortUsers)
};