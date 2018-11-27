// Yep, it slices, dices and serialices!
Serializer = function () {

	this._nameExclusions = {};
	this._typeExclusions = {};
	// client-side will encode by default unless you set this to false;
	this._encode = true;
	this._strictJson = true;
	this._safeDeserialize = false;

	this._sBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

};

// toss the object into an JS string
Serializer.prototype.serialize = function (o) {

	this._data = [];
	this._serializeNode([o], o, 0);
	this._data = this._data.join("");
	this._data = this._data.replace(/,}/g, "}");
	this._data = this._data.replace(/,]/g, "]");
	this._data = this._data.substr(0, this._data.length-1);

	if (this.allowEncoding()) {

		this._data = this.base64encode(this._data);

	}

	return this._data;

}

// exclude certain named elements from serialization
Serializer.prototype.addNameExclusion = function () {

	var l = arguments.length;

	for (var i=0; i<l; i++) {

		this._nameExclusions[arguments[i]] = true;

	}

}

// remove exclusion of named elements
Serializer.prototype.removeNameExclusion = function () {

	var l = arguments.length;

	for (var i=0; i<l; i++) {

		this._nameExclusions[arguments[i]] = false;

	}

}

// exclude certain data types from serialization
Serializer.prototype.addTypeExclusion = function () {

	var l = arguments.length;

	for (var i=0; i<l; i++) {

		this._typeExclusions[arguments[i].toLowerCase()] = true;

	}

}

// remove exclusion of data types
Serializer.prototype.removeTypeExclusion = function () {

	var l = arguments.length;

	for (var i=0; i<l; i++) {

		this._typeExclusions[arguments[i].toLowerCase()] = false;

	}

}

// getter/setter specifies whether to follow strict Json serialization
Serializer.prototype.requireStrictJson = function (value) {

	if (typeof(value) != "undefined") {

		this._strictJson = value;

	}

	return this._strictJson;

}

// getter/setter specifies whether we need to check for wellformedness before deserializing
Serializer.prototype.requireSafeDeserialize = function (value) {

	if (typeof(value) != "undefined") {

		this._safeDeserialize = value;

	}

	return this._safeDeserialize;

}

// getter/setter specifies if results should be encoded
Serializer.prototype.allowEncoding = function (value) {

	if (typeof(value) != "undefined") {

		this._encode = value;

	}

	return this._encode;

}

Serializer.prototype._unicodeEscape = function (str) {
	var dec = str.charCodeAt(0);
	var hexStr = "\\u";
	var hexVals = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];

	var hexPlace;

	// Loop unrolled for speed
	hexPlace = 4096 // 16^3
	hexStr += hexVals[Math.floor(dec / hexPlace)];
	dec = dec % hexPlace;

	hexPlace = 256  // 16^2
	hexStr += hexVals[Math.floor(dec / hexPlace)];
	dec = dec % hexPlace;

	hexPlace = 16   // 16^1
	hexStr += hexVals[Math.floor(dec / hexPlace)];
	dec = dec % hexPlace;

	hexPlace = 1    // 16^0
	hexStr += hexVals[Math.floor(dec / hexPlace)];
	dec = dec % hexPlace;

	return hexStr;
}

// serialize each member of the object
Serializer.prototype._serializeNode = function (o, startObj, depth, parentType) {

	var t, f, d1, d2;

	// loop through all of the members
	for (var i in o) {

		if (o[i] === null) {
			t = "null";
		} else {
			t = typeof(o[i]);
		}


		f = t == "object" ? true : false;
		t = t == "object" && typeof(o[i].length) != "undefined" && o[i].constructor == Array ? "array" : t;

		if (!this._typeExclusions[t] && !this._nameExclusions[i] && !(this._strictJson && t == "function")) {

			switch (t) {

				case "string" :

					d1 = "\"";
					d2 = "\"";
					break;

				case "object" :

					d1 = "{";
					d2 = "}";
					break;

				case "array" :

					d1 = "[";
					d2 = "]";
					break;

				default :

					d1 = "";
					d2 = "";
					break;

			 }

			// build the JS string for this node
			if (isFinite(i) && !(parentType && parentType == "object")) {

				this._data.push(d1);

			} else {

				var n = typeof(i) == "string" ? "\"" + i + "\"" : i;
				this._data.push(n + ":" + d1);

			}

			if (f) {

				if (depth == 0 || o[i] !== startObj) {

					this._serializeNode(o[i],null,null,t);

				}

			} else {

				if (t == "string") {

				// Replace all non-printable, non-ASCII, ", and \ characters with their unicode encoding
					this._data.push(o[i].replace(/[^ -~]|[\"\\]/g, this._unicodeEscape));

				} else if (t == "undefined" || t == "null") {

					this._data.push(this._strictJson ? "null" : t);

				} else {

					this._data.push(o[i]);

				}
			}

			this._data.push(d2 + ",");

		}

	}
}

Serializer.prototype.deserialize = function (o) {

	try {

		if (this.hasEncodingLeader(o)) {

			o = this.base64decode(o);

		}

		// eval("var x = " + o);
		if (this._safeDeserialize) {
			return this.safeDeserialize(o);
		} else {
			return this.unsafeDeserialize(o);
		}

	} catch(e) {

		if (typeof(dbg) == "function") {

			dbg("Serializer.deserialize() error", "", "red");
			dbgObject(e);
			dbg("Serializer Source", o);

		}

		var x = "";

	}

	return x;

}
Serializer.prototype.safeDeserialize = function (o) {
	try {
		var p = new jsonParser();
		p.parse(o);
		eval("var x = " + o);
	} catch(e) {
		var x = null;
	}
	return x;
}
Serializer.prototype.unsafeDeserialize = function (o) {
	try {
		eval("var x = " + o);
	} catch(e) {
		var x = null;
	}
	return x;
}

Serializer.prototype.hasEncodingLeader = function (s) {

	return s.indexOf("B64ENC") == 0 ? true : false;

}

Serializer.prototype.stripLeader = function (s) {

	return s.substr(6, s.length);

}

Serializer.prototype.prependLeader = function (s) {

	return "B64ENC" + s;

}

// ripped from /includes/asplib/Base64
Serializer.prototype.base64decode = function (sIn) {

	var i;
	var iBits;
	var sOut = [];

	if (this.hasEncodingLeader(sIn)) {

		sIn = this.stripLeader(sIn);

	} else {

		return sIn;

	}

	sIn = sIn.replace(/=/g, "");

	for(i = 0; i < sIn.length; i += 4) {

		iBits = (this._sBase64.indexOf(sIn.charAt(i)) << 18) |
			(this._sBase64.indexOf(sIn.charAt(i + 1)) << 12) |
			((this._sBase64.indexOf(sIn.charAt(i + 2)) & 0xff) << 6) |
			(this._sBase64.indexOf(sIn.charAt(i + 3)) & 0xff);

		/* Removing the below += results in a 90% speed improvement on large objects/long strings */
		/*sOut += String.fromCharCode(iBits >> 16 & 0xff);
		sOut += (i > sIn.length - 3) ? "" : String.fromCharCode(iBits >> 8 & 0xff);
		sOut += (i > sIn.length - 4) ? "" : String.fromCharCode(iBits & 0xff);*/

		sOut.push(String.fromCharCode(iBits >> 16 & 0xff));
		sOut.push((i > sIn.length - 3) ? "" : String.fromCharCode(iBits >> 8 & 0xff));
		sOut.push((i > sIn.length - 4) ? "" : String.fromCharCode(iBits & 0xff));

	}

	return sOut.join("");

}

// ripped from /includes/asplib/Base64
Serializer.prototype.base64encode = function (sIn) {

	var i;
	var iBits;
	var sOut = [];

	for(i = 0; i < sIn.length; i += 3) {

		iBits = (sIn.charCodeAt(i) << 16) +
			((sIn.charCodeAt(i + 1) & 0xff) << 8) +
			(sIn.charCodeAt(i + 2) & 0xff);

		/* Removing the below += results in a 90% speed improvement on large objects/long strings */
		/*sOut += this._sBase64.charAt(iBits >> 18 & 0x3f);
		sOut += this._sBase64.charAt(iBits >> 12 & 0x3f);
		sOut += (i > sIn.length - 2) ? "=" : this._sBase64.charAt(iBits >> 6 & 0x3f);
		sOut += (i > sIn.length - 3) ? "=" : this._sBase64.charAt(iBits & 0x3f);*/

		sOut.push(this._sBase64.charAt(iBits >> 18 & 0x3f));
		sOut.push(this._sBase64.charAt(iBits >> 12 & 0x3f));
		sOut.push((i > sIn.length - 2) ? "=" : this._sBase64.charAt(iBits >> 6 & 0x3f));
		sOut.push((i > sIn.length - 3) ? "=" : this._sBase64.charAt(iBits & 0x3f));

	}

	sOut = this.prependLeader(sOut.join(""));

	return sOut;

}


// This is a validating JSON recursive descent parser.  It does not actually
// build a data structure; it merely tests the input string for validity
// according to the JSON grammar.  This greatly simplifies the parser, and also
// allows a few otherwise impossible performance tweaks.  For a description of
// the JSON grammer, see http:// json.org.  For a description of Recursive
// Descent parsers, how they work, and how to write one, see
// http://www.antlr.org/book/byhand.pdf

// The purpose of this parser is to ensure that calling eval() on a serialized
// string will not have any potentially nasty side effects.  This is an
// important safety measure when you don't know who has been serializing the
// strings you are about to deserialize...


function jsonParser () {
	this.lexer = null;
	this.tokens = [ ];
}

jsonParser.prototype.parse = function (str) {
	this.lexer = new jsonLexer(str);

	return this._json();
}

// not really necessary, since JSON seems to be parsable with an LL(1) grammar,
// but defining this now makes it far easier to extend in the future.
jsonParser.prototype.lookAhead = function (k) {
	while (this.tokens.length <= k) {
		this.tokens.push(this.lexer.nextToken());
	}
	return this.tokens[k].type;
}

// Remove a token from the token stream.  Since we are only parsing and not
// actually doing anything with the parsed string, we can merely remove the
// token from the stream here, and not worry about building a syntax tree.
jsonParser.prototype.consume = function (type) {
	if (this.tokens.length == 0) {
		this.tokens.push(this.lexer.nextToken());
	}

	if (this.tokens[0].type == type) {
		this.tokens.shift();
	} else {
		throw { message: 'JSON: invalid token encountered validating string; Expected '+type+', got '+this.tokens[0].type };
	}
}

// A JSON serialized string consists of exactly one value.
jsonParser.prototype._json = function () {
	this._value();
	this.consume('_EOF');
}

// A value can be one of
//   an object
//   an array
//   a string
//   a number
//   true, false, or null
jsonParser.prototype._value = function () {
	switch(this.lookAhead(0)) {
		case '_OBJ_OPEN':
			this._object();
			break;
		case '_ARR_OPEN':
			this._array();
			break;
		case '_DIGITS':
		case '_NEG':
			this._number();
			break;
		case '_STRING':
			this.consume('_STRING');
			break;
		case '_TRUE':
			this.consume('_TRUE');
			break;
		case '_FALSE':
			this.consume('_FALSE');
			break;
		case '_NULL':
			this.consume('_NULL');
			break;
	}
}

// An object consists of an open brace, zero or more comma separated
// string/value pairs, and a close brace
jsonParser.prototype._object = function () {
	this.consume('_OBJ_OPEN');
	if (this.lookAhead(0) != '_OBJ_CLOSE') {
		this._member();
	}
	while (this.lookAhead(0) != '_OBJ_CLOSE') {
		this.consume('_SEP');
		this._member();
	}
	this.consume('_OBJ_CLOSE');
}

jsonParser.prototype._member = function () {
	this.consume('_STRING');
	this.consume('_ASSIGN');
	this._value();
}

// An array consists of an open bracket, zero or more comma separated values,
// and a close bracket
jsonParser.prototype._array = function () {
	this.consume('_ARR_OPEN');
	if (this.lookAhead(0) != '_ARR_CLOSE') {
		this._value();
	}
	while (this.lookAhead(0) != '_ARR_CLOSE') {
		this.consume('_SEP');
		this._value();
	}
	this.consume('_ARR_CLOSE');
}

// A number consists of an optional leading '-', any number of digits, followed
// by an optional fractional component and an optional exponential component.
jsonParser.prototype._number = function () {
	if (this.lookAhead(0) == '_NEG') {
		this.consume('_NEG');
	}

	this.consume('_DIGITS');

	if (this.lookAhead(0) == '_DOT') {
		this.consume('_DOT');
		this.consume('_DIGITS');
	}

	if (this.lookAhead(0) == '_EXP') {
		this.consume('_EXP');
		if (this.lookAhead(0) == '_POS') {
			this.consume('_POS');
		} else if (this.lookAhead(0) == '_NEG') {
			this.consume('_NEG');
		}
		this.consume('_DIGITS');
	}
}

function jsonLexer (input) {
	// since we only care about validity and not the actual value, we can
	// easily reduce these multi-character tokens down to one character now
	// resulting in a significant gain in overall efficiency.
	input = input.replace(/"([^"\\]|\\"|\\)*"/g, 'S');
	input = input.replace(/[0-9]+/g, '0');

	this.input = input;
}

// Tokens represented by a single character
jsonLexer.prototype.charTokens = {
								'{': '_OBJ_OPEN',
								'}': '_OBJ_CLOSE',
								'[': '_ARR_OPEN',
								']': '_ARR_CLOSE',
								':': '_ASSIGN',
								',': '_SEP',
								'.': '_DOT',
								'-': '_NEG',
								'+': '_POS',
								'e': '_EXP',
								'E': '_EXP',
								'S': '_STRING',
								'0': '_DIGITS'
							};
// Other Tokens that are scanned for:
// 									 '_TRUE',
// 									 '_FALSE',
// 									 '_NULL',

jsonLexer.prototype.nextToken = function () {
	if (this.input.length == 0) {
		return new jsonToken("_EOF", null);
	}

	var first = this.input.substr(0,1);
	if (this.charTokens[first]) {
		this.input = this.input.substr(1);
		return new jsonToken(this.charTokens[first], first);
	}

	switch (first) {
		case 't':
		case 'T':
			if (this.input.substr(0,4).toLowerCase() == 'true') {
				this.input = this.input.substr(4);
				return new jsonToken('_TRUE', true);
			}
			break;

		case 'f':
		case 'F':
			if (this.input.substr(0,5).toLowerCase() == 'false') {
				this.input = this.input.substr(5);
				return new jsonToken('_FALSE', true);
			}
			break;

		case 'n':
			if (this.input.substr(0,4) == 'null') {
				this.input = this.input.substr(4);
				return new jsonToken('_NULL', true);
			}
			break;
	}

	throw { message: 'JSON: Unexpected character ('+first+') encountered validating string' };
}

// Simple representation of a lexer token
function jsonToken (type, value) {
	this.type = type;
	this.value = value;
}
