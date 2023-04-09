// request
interface UserConfig {
    account: string
    password: string
    ga: string
    ga_9PQXQP3QD6: string
}

interface RestaurantConfig {
	storeId: string 
	peopleCount: number 
	mealPeriod: string 
	mealDate: string 
	mealTime: string 
}

interface Config extends UserConfig, RestaurantConfig {}

// response
interface Login {
	act: string 
	pwd: string 
}

interface CustomerLoginResp {
	address: string 
	area: string 
	birthDay: string 
	birthMonth: string 
	birthYear: string 
	city: string 
	email: string 
	gender: string 
	memberShip: string 
	name: string 
	phoneNumber: string 
	token: string 
}

interface Result{
    // success
    _ACT: string
    _P: string
    customerLoginResp: CustomerLoginResp
    
    // Save Seats
    expirationTime: string

    // booking
    bookingId: string
    bookingState: string
    brandName: string
    expireTime: string
    mealDate: string
    mealPeriod: string
    mealTime: string
    paymentState: string
    storeName: string
    
    // error
    msg: string
}

interface Response {
	// success
	message: string
	result: Result
	statusCode: number 
	timestamp: string

	// error
	path: string
}

interface SaveSeatsResponse {
	// success
	message: string
	result: string
	statusCode: number
	timestamp: string
}

interface SaveSeats {
	storeId: string 
	peopleCount: number
	mealPeriod: string 
	mealSeq: number 
	mealDate: string 
	mealTime: string 
	zked: any
}

interface ChargeList {
    seq: number;
    count: number;
    }

interface Booking {
	storeId: string 
	mealDate: string 
	mealPurpose: string 
	mealSeq: number   
	mealTime: string
	mealPeriod: string 
	special: number   
	childSeat: number    
	adult: number  
	child: number   
	chargeList: ChargeList[]
	storeCode: string 
	redirectType: string 
	domain: string 
	pathFir: string 
	pathSec: string 
	yuuu: string
}

export {
    UserConfig,
    RestaurantConfig,
    Config,
    Login,
    Response,
    SaveSeatsResponse,
    SaveSeats,
    Booking
}