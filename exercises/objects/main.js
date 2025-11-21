const user = {
    name: "Jos",
    age: 5,
}

function ageUser(user) {
    user.age += 1;
}
const userCopy = user;

console.log(user.age, userCopy.age);
ageUser(userCopy);
console.log(user.age, userCopy.age);

