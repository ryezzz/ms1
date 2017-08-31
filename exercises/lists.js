// Two lists of student
// Choose one student from each list
// Remove chosen student from previous list
// add to new group variable
// math.random


var participants= ['Alonso', 'Ellie', 'Rik', 'Steve', 'Julian', 'Flavio', 'Aucher', 'George', 'Isabel', 'Benz', 'Rye', 'Joe'];
// console.log (participant[0]);
var listTwo= [];


// reports
var report = [];
report[0] = 'Werner Herzog. Lo and Behold';
report[1] = 'Kurgan, Laura. Close up at a Distance';
report[2] = 'Steyerl, Hito. A Sea of Data';
report[3] = 'Kate Crawford, Can an Algorithm be Agonistic?';
report[4] = 'Hayles, Katherine N. Unthought, Chapter 5';
report[5] = 'Hayles, Katherine N. Unthought, Chapter 6';
report[6] = 'Selected UNDP RBA reading';

var assignment = [];

for (var i=0; i<participants.length; i++){
    assignment[i] = {
        report: report [i],
        team: []
    }
}

// function that takes a random partcipant, deletes it from array, and returns that random participant, and pushes it into participants 
// splice method
// push method

var rnd = Math.floor(Math.random()*participants.length);
// make sure it's an actual integer - can't use math.random in raw form
// math.floor


for (var key in assignment){
    while ( team.length < 2 )
    assignment[key].team.push(participants[rnd]);
}

// limits on team array length

console.log (assignment);