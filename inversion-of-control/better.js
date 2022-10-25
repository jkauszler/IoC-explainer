/**
 * This is an example of a better way to structure and organize these modules
 */

// This is a concrete class
class DataAccess {
	constructor(){}

	getCustomerName(_id) {
		return "John Doe" // get it from DB in real app
	}
}

// This is known as a factory pattern
class DataAccessFactory {
	static getDataAccessObj() {
		return new DataAccess();
	}
}

// This is also a concrete class
class CustomerBusinessLogic {
	constructor(){}

	getCustomerName(_id) {
		const dataAccess = DataAccessFactory.getDataAccessObj();
		return dataAccess.getCustomerName(_id);
	}
}

/**
 * We've now inverted the control of creating a new class from the CustomerBusinessLogic to an 
 * intermediate class (DataAccessFactory). Now if we need to change the database layer (maybe to a different
 * type of DB) we can do so from one file. Updates to one module don't also require updates to another 
 * implementing it.
 */

// How we might use these classes now
const CBL = new CustomerBusinessLogic();
const customerName = CBL.getCustomerName(123); // John Doe
