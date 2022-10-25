interface ICustomerDataAccess {
  getCustomerName: (_id: number) => string;
}

class CustomerBusinessLogic {
	customerDataAccess: ICustomerDataAccess

	constructor(_CustomerDataAccess){
		this.customerDataAccess = _CustomerDataAccess;
	}

	getCustomerName(_id: number): string {
		return this.customerDataAccess.getCustomerName(_id);
	}
}

// This is a concrete class
class CustomerDataAccess implements ICustomerDataAccess {
	constructor(){}

	getCustomerName(_id: number): string {
		return "John Doe" // get it from DB in real app
	}
}

// How we might use these classes now
class CustomerService {
	customerBusinessLogic: ICustomerDataAccess

	constructor(_CustomerBusinessLogic) {
		this.customerBusinessLogic = new _CustomerBusinessLogic(new CustomerDataAccess())
	}

	getCustomerName(_id: number): string {
		return this.customerBusinessLogic.getCustomerName(_id);
	}
}

const service = new CustomerService(CustomerBusinessLogic);
console.log(service.getCustomerName(123));

// or 

const CustBizLogic = new CustomerBusinessLogic(new CustomerDataAccess())
console.log(CustBizLogic.getCustomerName(123));

/**
 * Here CustomerBusinessLogic and CustomerDataAccess stay more loosely decoupled. Unfortunately, 
 * some coupling still exist but now it happens in the implementation at the highest module.
 */