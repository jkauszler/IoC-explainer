/**
 * Starting from our inversion of control example
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
		const dataAccess = DataAccessFactory.getDataAccessObj(); // still tightly coupled to the DataAccess Class, albeit via the factory
		return dataAccess.getCustomerName(_id);
	}
}

// How we might use these classes now
const CBL = new CustomerBusinessLogic();
const customerName = CBL.getCustomerName(123); // John Doe