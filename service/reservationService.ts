
class PrivateReservationService {
  message: string
    
  constructor() {
    this.message = 'I am an instance'
  }


}


export class ReservationService {
  private static instance: PrivateReservationService

  constructor() {
    throw new Error('Use ReservationService.getInstance()')
  }

  public static getInstance() {

    if (!this.instance) {
      this.instance = new PrivateReservationService()
    }

    return this.instance
  }
}