// Lagrange Interpolation Function
function lagrangeInterpolation(points) {
    const n = points.length;
    let constantTerm = 0;

    for (let i = 0; i < n; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        // Compute the Lagrange basis polynomial L_i(x) at x = 0
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (-points[j].x) / (xi - points[j].x);
            }
        }

        // Add contribution of this term to the final constant term
        constantTerm += yi * li;
    }

    return Math.round(constantTerm);
}

// Helper function to decode y-values from different bases
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Main function to solve the problem
function findSecretPolynomialConstant(inputJSON) {
    const keys = inputJSON.keys;
    const n = keys.n;
    const k = keys.k;

    let points = [];

    // Parse and decode each point from the input JSON
    for (let i = 1; i <= n; i++) {
        let point = inputJSON[i.toString()]; // Access the points dynamically using the index as a string
        if (point) {
            let base = parseInt(point.base);  // Access the 'base' value
            let value = point.value;          // Access the 'value' value

            // x is the index (i), y is the decoded value
            let x = i;
            let y = decodeValue(base, value);

            points.push({ x, y });
        }
    }

    // Apply Lagrange Interpolation to find the constant term (secret 'c')
    const secretConstant = lagrangeInterpolation(points);

    return secretConstant;
}

// Test Cases
const testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

const testCase2 = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};

// Running test cases
console.log("Secret for Test Case 1:", findSecretPolynomialConstant(testCase1)); // Example Output
console.log("Secret for Test Case 2:", findSecretPolynomialConstant(testCase2)); // Example Output
