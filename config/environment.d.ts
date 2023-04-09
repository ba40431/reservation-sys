declare global {
    namespace NodeJS {
    interface ProcessEnv {
				ACCOUNT: string
      	PASSWORD: string
				GA: string
				GA_9PQXQP3QD6: string
				STORE_ID: string
				PEOPLE_COUNT: number
				MEAL_PERIOD: string
				MEAL_DATE: string
				MEAL_TIME: string
				LOGIN_API: string
				SAVE_SEATS_API: string
				SAVE_SAETA_API: string
				BOOKINGS_API: string
				BOOKING_API: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {
		global
	}