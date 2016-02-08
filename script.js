var data = {};

["adjectives", "verbs", "animals"].map(function (list){
	var l = document.getElementById(list).innerHTML.split("\n");
	data[list] = l.map(function (s){ return s.trim(); }).slice(1, l.length-1);
});

function getRandom (items){
	return items[Math.floor(Math.random()*items.length)];
}

function isVowel(char){ return "aeiou".indexOf(char) != -1; }

function isConsonant(char){ return !isVowel(char); }

function fromLast(word, i){ return word[word.length - 1 - i]; }

function progressive(verb){

	switch (verb){
		case "bar":
		case "mar":
		case "star":
		case "stir":
		case "deter": return verb + "ring"
		case "develop": return verb + "ing"
		default: {

			var last = fromLast(verb, 0);
			var last2 = fromLast(verb, 1);
			if (last == "e" && last2 == "i"){
				verb = verb.slice(0, verb.length-2) + "y"
			} else if (last == "e" && last2 != "e"){
				verb = verb.slice(0, verb.length-1);
			} else if (isConsonant(last) && isVowel(last2) && isConsonant(fromLast(verb, 2))){
				if (
					(["r", "w", "x", "y"].indexOf(last) == -1) &&
					!((last2 == "e" || last2 == "o") && last == "n")
				){
					verb += last;
				}
			}

			return verb + "ing";

		}
	}

}

function go(){
	
	var modifierSrc = getRandom(["adjectives", "verbs"]);
	var modifier = getRandom(data[modifierSrc]);
	if (modifierSrc == "verbs"){
		modifier = progressive(modifier);
	}
	var animal = getRandom(data.animals);

	document.getElementById("name").innerHTML = modifier + " " + animal;

}

go();
