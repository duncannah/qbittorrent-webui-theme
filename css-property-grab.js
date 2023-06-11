// This is a utility script that will grab all instances of a chosen CSS property
// and output them as a SCSS sheet. Use it (eg. copy-paste) using Developer Tools in your browser of choice.

// You'll need to change the property name to the one you want to grab.
const PROPERTY = "background-color";

// Code follows.

// Grab all stylesheets
const stylesheets = Array.from(document.styleSheets);

// Grab all rules from all stylesheets
const rules = stylesheets
	.map((sheet) => sheet.rules)
	.filter((rule) => rule !== null)
	.map((rule) => Array.from(rule))
	.flat();

// Grab all rules that have the property we're looking for
const propertyRules = rules.filter((rule) => rule.style && !!rule.style[PROPERTY]);

// Create an object with the property value as the key and an array of selectors as the value
const propertyValues = propertyRules.reduce((acc, rule) => {
	const value = rule.style[PROPERTY];
	const selector = rule.selectorText;

	if (!acc[value]) {
		acc[value] = [];
	}

	acc[value].push(selector);

	return acc;
}, {});

// Create a SCSS sheet from the object
const scssSheet = Object.entries(propertyValues)
	.map(([value, selectors]) => {
		const selectorString = selectors.join(", ");

		return `// ${value}\n${selectorString} {\n${PROPERTY}: ${value};\n}`;
	})
	.join("\n\n");

// Output the SCSS sheet to the console
console.log(scssSheet);
