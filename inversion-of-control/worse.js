/**
 * This is an example of a poor way to structure and organize these modules
 */

// This is a concrete class
class DataAccess {
	constructor(){}

	getCustomerName(_id) {
		return "John Doe" // get it from DB in real app
	}
}

// This is also a concrete class
class CustomerBusinessLogic {
	constructor(_DataAccess){
		this.dataAccess = new _DataAccess(); // Tightly coupled, reference to a concrete class, instantiates and manages an instance object
	}

	getCustomerName(_id) {
		return this.dataAccess.getCustomerName(_id);
	}
}

// How we might use these class in conjunction
const CBL = new CustomerBusinessLogic(DataAccess);
const customerName = CBL.getCustomerName(123); // John Doe

// Smell test fails, two concrete classes depending on another
