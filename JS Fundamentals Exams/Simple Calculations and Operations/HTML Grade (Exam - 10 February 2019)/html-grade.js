function solve(examPoints, completedHomework, allHomework) {
    let grade = 0;

    if (examPoints === 400) {
        grade = 6.00;
    } else {
        let totalPoints = examPoints * 90 / 400;

        let bonus = completedHomework / allHomework * 10;
        totalPoints += bonus;

        grade = 3 + 2 * (totalPoints - 100 / 5) / (100 / 2);

        if (grade > 6) {
            grade = 6;
        }

        if (grade < 3) {
            grade = 2;
        }
    }

    console.log(grade.toFixed(2));
}
