function solve(input) {
    function checkForCompanies(sentence) {
        for (const company of companies) {
            if (!sentence.includes(company)) {
                return false;
            }
        }

        return true;
    }

    function printSentences(sentences) {
        for (let i = 0; i < sentences.length; i++) {
            console.log(`${i + 1}. ${sentences[i]}`);
        }
    }

    const firstElement = input.shift();
    const delimiter = input.shift();
    const companies = firstElement.split(delimiter);

    let validSentences = [];
    let invalidSentences = [];

    for (let sentence of input) {
        sentence = sentence.toLowerCase();
        const isValid = checkForCompanies(sentence);

        if (isValid) {
            validSentences.push(sentence);
        } else {
            invalidSentences.push(sentence);
        }
    }

    if (validSentences.length > 0) {
        console.log('ValidSentences');
        printSentences(validSentences);
    }

    if (validSentences.length > 0 && invalidSentences.length > 0) {
        console.log('='.repeat(30));
    }

    if (invalidSentences.length) {
        console.log('InvalidSentences');
        printSentences(invalidSentences);
    }
}
