/**
 * This is an example of an interface (hence the 'I' in the name).
 * JS doesn't have a native concept of an interface (or abstract classes) but Typescript does
 * so we'll use that here instead.
 * 
 * An interface is a structure that acts like a contract in your application, or the syntax 
 * for classes to follow.
 * 
 * We don't use it to create anything. Instead a class that implements an interface must have all fields 
 * and methods.
 */
interface ICustomerDataAccess {
  getCustomerName: (_id: number) => string;
}

// This is a concrete class
class CustomerDataAccess implements ICustomerDataAccess {
	constructor(){}

	getCustomerName(_id: number): string {
		return "John Doe" // get it from DB in real app
	}
}

// This is known as a factory pattern
class DataAccessFactory {
	static getCustomerDataAccessObj(): ICustomerDataAccess {
		return new CustomerDataAccess(); // !! NOTE: still tightly coupled here !!
		/**
		 * If we ever created a new implementation of ICustomerDataAccess, we would then need to update
		 * the source of CustomerBusinessLogic as well
		 */
	}
}

// This is also a concrete class
class CustomerBusinessLogic {
	customerDataAccess: ICustomerDataAccess;

	constructor(){
		this.customerDataAccess = DataAccessFactory.getCustomerDataAccessObj();
	}

	getCustomerName(_id: number): string {
		return this.customerDataAccess.getCustomerName(_id);
  }
}

/**
 * Now both of our concrete classes, our high-level CustomerBusinessLogic class and our low-level
 * CustomerDataAccess class, are dependent on an abstraction [or interface]: ICustomerDataAccess.
 * 
 * Additionally, the abstraction (ICustomerDataAccess) does not depend on details (CustomerDataAccess), 
 * but the details depend on the abstraction. 
 * 
 * In the future, if we needed to change our data access layer we have a blueprint (interface) to map against.
 * As long as the interface is fulfilled we can swap from db to db with relative ease.
 */

// // How we might use these classes now
const CBL = new CustomerBusinessLogic();
const customerName = CBL.getCustomerName(123); // John Doe
