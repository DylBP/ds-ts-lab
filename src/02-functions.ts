import { friends } from "./01-basics";
import { colleagues } from "./01-basics";
import { Friend, Colleague, EmailContact } from "./myTypes";

function older(f: Friend) {
    f.age += 1
    return `${f.name} is now ${f.age}`
}

function allOlder(friends: Friend[]) {
    let retVal: string[] = [];

    for (let index = 0; index < friends.length; index++) {
        friends[index].age += 1
        retVal[index] = `${friends[index].name} is now ${friends[index].age}`
    }

    return retVal;
}

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) {
    const result = cs.sort(
        (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
}

function addColleague(
    cs: Colleague[],
    newCName: string,
    newCDept: string,
    newCEmail: string
) {
    let highest: number = highestExtension(cs).contact.extension;

    const newColleague: Colleague = {
        name: newCName,
        department: newCDept,
        contact: {
            email: newCEmail,
            extension: highest + 1
        }
    }

    cs.push(newColleague);
    return cs;
}

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max?: number
): EmailContact[] {
    let end = colleagues.length;
    if (max != undefined) end = max < 2 ? 1 : max;
    const sorted = colleagues.sort(sorter);
    const fullResult = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0, end)
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
// console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

// console.log(sortColleagues(colleagues.current, (a, b) => a.contact.extension - b.contact.extension, 2));
// console.log(sortColleagues(colleagues.current, (a, b) => b.name.length - a.name.length, 2));
// console.log(sortColleagues(colleagues.current, (a, b) => a.name.length - b.name.length));

function findFriends(
    friends: Friend[],
    expression: (friend1: Friend) => boolean
): string[] {
    return friends
        .filter(expression)
        .map((fr) => fr.name);
}

// console.log(findFriends(friends, (friend) => friend.age > 28));

function addInterest(friend: Friend, interest: string): string[] {
    if (friend.interests == undefined) friend.interests = []
    friend.interests.push(interest);
    return friend.interests
}

console.log(addInterest(friends[0], "Jogging"))