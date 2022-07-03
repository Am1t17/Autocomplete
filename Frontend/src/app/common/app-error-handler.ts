import {ErrorHandler} from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any) {
    if(error.status === 0){
      alert('An unexpected error occurred. make sure you are connected');
    }
    alert('An unexpected error occurred.');
  }
}
