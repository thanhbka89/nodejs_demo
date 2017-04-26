const people = [
    {
        name: 'James Nguyen',
        age: 18,
        gender: 'female'
    },
    {
        name: 'Knox Overstreet',
        age: 28,
        gender: 'male'
    },
    {
        name: 'thanhnm',
        age: 28,
        gender: 'male'
    },
];

export function findPerson(name) {
    for (let i = 0; i < people.length; i++) {
        if (people[i].name == name) {
            return people[i];
        }
    }
}

const anything = [1, 2, 3, 4, 5];
export default people;
